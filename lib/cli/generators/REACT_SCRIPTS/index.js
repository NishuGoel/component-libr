import fse from 'fs-extra';
import path from 'path';
import fs from 'fs';
import semver from 'semver';
import {
  getVersions,
  getPackageJson,
  writePackageJson,
  getBabelDependencies,
  installDependencies,
} from '../../lib/helpers';

export default async npmOptions => {
  const [storybookVersion, actionsVersion, linksVersion, addonsVersion] = await getVersions(
    npmOptions,
    '@storybook/react',
    '@storybook/addon-actions',
    '@storybook/addon-links',
    '@storybook/addons'
  );

  fse.copySync(path.resolve(__dirname, 'template/'), '.', { overwrite: true });

  const packageJson = getPackageJson();

  packageJson.dependencies = packageJson.dependencies || {};
  packageJson.devDependencies = packageJson.devDependencies || {};

  packageJson.scripts.storybook = 'start-storybook -p 9009';
  packageJson.scripts['build-storybook'] = 'build-storybook';

  if (fs.existsSync(path.resolve('./public'))) {
    // has a public folder and add support to it.
    packageJson.scripts.storybook += ' -s public';
    packageJson.scripts['build-storybook'] += ' -s public';
  }

  writePackageJson(packageJson);

  // When working with `create-react-app@>=2.0.0`, we know `babel-loader` is installed.
  let babelDependencies = [];
  const reactScriptsDep =
    packageJson.dependencies['react-scripts'] || packageJson.devDependencies['react-scripts'];

  if (reactScriptsDep && semver.gtr('2.0.0', reactScriptsDep)) {
    babelDependencies = await getBabelDependencies(npmOptions, packageJson);
  }

  installDependencies(npmOptions, [
    `@storybook/react@${storybookVersion}`,
    `@storybook/addon-actions@${actionsVersion}`,
    `@storybook/addon-links@${linksVersion}`,
    `@storybook/addons@${addonsVersion}`,
    ...babelDependencies,
  ]);
};
