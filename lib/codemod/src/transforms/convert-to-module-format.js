import prettier from 'prettier';
import camelCase from 'lodash/camelCase';
import { logger } from '@storybook/node-logger';

/**
 * Convert a legacy story file to module format
 *
 * For example:
 *
 * ```
 * input { Button } from './Button';
 * storiesOf('Button', module).add('story', () => <Button label="The Button" />);
 * ```
 *
 * Becomes:
 *
 * ```
 * input { Button } from './Button';
 * export default {
 *   title: 'Button'
 * }
 * export const story = () => <Button label="The Button" />;
 *
 * NOTES: only support chained storiesOf() calls
 */
export default function transformer(file, api, options) {
  const j = api.jscodeshift;
  const root = j(file.source);

  function convertToModuleExports(path) {
    const base = j(path);

    const statements = [];
    const extraExports = [];

    // .addDecorator
    const decorators = [];
    base
      .find(j.CallExpression)
      .filter(
        call => call.node.callee.property && call.node.callee.property.name === 'addDecorator'
      )
      .forEach(add => {
        const decorator = add.node.arguments[0];
        decorators.push(decorator);
      });
    if (decorators.length > 0) {
      decorators.reverse();
      extraExports.push(
        j.property('init', j.identifier('decorators'), j.arrayExpression(decorators))
      );
    }

    // .addParameters
    const parameters = [];
    base
      .find(j.CallExpression)
      .filter(
        call => call.node.callee.property && call.node.callee.property.name === 'addParameters'
      )
      .forEach(add => {
        // jscodeshift gives us the find results in reverse, but these args come in
        // order, so we double reverse here. ugh.
        const params = [...add.node.arguments[0].properties];
        params.reverse();
        params.forEach(prop => parameters.push(prop));
      });
    if (parameters.length > 0) {
      parameters.reverse();
      extraExports.push(
        j.property('init', j.identifier('parameters'), j.objectExpression(parameters))
      );
    }

    // storiesOf(...)
    base
      .find(j.CallExpression)
      .filter(call => call.node.callee.name === 'storiesOf')
      .filter(call => call.node.arguments.length > 0 && call.node.arguments[0].type === 'Literal')
      .forEach(storiesOf => {
        const title = storiesOf.node.arguments[0].value;
        statements.push(
          j.exportDefaultDeclaration(
            j.objectExpression([
              j.property('init', j.identifier('title'), j.literal(title)),
              ...extraExports,
            ])
          )
        );
      });

    // .add(...)
    const adds = [];
    base
      .find(j.CallExpression)
      .filter(add => add.node.callee.property && add.node.callee.property.name === 'add')
      .filter(add => add.node.arguments.length >= 2 && add.node.arguments[0].type === 'Literal')
      .forEach(add => adds.push(add));

    adds.reverse();
    adds.push(path);

    adds.forEach(add => {
      let key = add.node.arguments[0].value;
      let name = null;
      if (/\s/.exec(key)) {
        name = key;
        key = camelCase(key);
      } else if (key === 'default') {
        name = key;
        key = 'defaultStory';
      }
      const val = add.node.arguments[1];
      statements.push(
        j.exportDeclaration(
          false,
          j.variableDeclaration('const', [j.variableDeclarator(j.identifier(key), val)])
        )
      );

      const storyAnnotations = [];

      if (name) {
        storyAnnotations.push(j.property('init', j.identifier('name'), j.literal(name)));
      }

      if (add.node.arguments.length > 2) {
        const storyParams = add.node.arguments[2];
        storyAnnotations.push(j.property('init', j.identifier('parameters'), storyParams));
      }

      if (storyAnnotations.length > 0) {
        statements.push(
          j.assignmentStatement(
            '=',
            j.memberExpression(j.identifier(key), j.identifier('story')),
            j.objectExpression(storyAnnotations)
          )
        );
      }
    });

    statements.reverse();
    statements.forEach(s => path.parent.insertAfter(s));
    base.remove();
  }

  // Save the original storiesOf
  const initialStoriesOf = root
    .find(j.CallExpression)
    .filter(call => call.node.callee.name === 'storiesOf');

  const defaultExports = root.find(j.ExportDefaultDeclaration);
  // If there's already a default export
  if (defaultExports.size() > 0) {
    if (initialStoriesOf.size() > 0) {
      logger.warn(
        `Found ${initialStoriesOf.size()} 'storiesOf' calls but existing default export, SKIPPING: '${
          file.path
        }'`
      );
    }
    return root.toSource();
  }

  // each top-level add expression corresponds to the last "add" of the chain.
  // replace it with the entire export statements
  root
    .find(j.CallExpression)
    .filter(add => add.node.callee.property && add.node.callee.property.name === 'add')
    .filter(add => add.node.arguments.length >= 2 && add.node.arguments[0].type === 'Literal')
    .filter(add => add.parentPath.node.type === 'ExpressionStatement')
    .forEach(convertToModuleExports);

  // remove storiesOf import
  root
    .find(j.ImportSpecifier)
    .filter(
      spec =>
        spec.node.imported.name === 'storiesOf' &&
        spec.parent.node.source.value.startsWith('@storybook/')
    )
    .forEach(spec => {
      const toRemove = spec.parent.node.specifiers.length > 1 ? spec : spec.parent;
      j(toRemove).remove();
    });

  const source = root.toSource({ trailingComma: true, quote: 'single', tabWidth: 2 });
  if (initialStoriesOf.size() > 1) {
    logger.warn(
      `Found ${initialStoriesOf.size()} 'storiesOf' calls, PLEASE FIX BY HAND: '${file.path}'`
    );
    return source;
  }

  return prettier.format(source, {
    parser: options.parser || 'babel',
    // FIXME: storybook defaults
    printWidth: 100,
    tabWidth: 2,
    bracketSpacing: true,
    trailingComma: 'es5',
    singleQuote: true,
  });
}
