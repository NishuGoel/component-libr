---
id: 'addon-gallery'
title: 'Addon Gallery'
---

This is a list of available addons for Storybook.

## Addons maintained by storybook team.

### [a11y](https://github.com/storybookjs/storybook/tree/master/addons/a11y)

With a11y you can test compliance of your stories with web accessibility standards.

### [Actions](https://github.com/storybookjs/storybook/tree/master/addons/actions)

With actions, you can inspect events related to your components. This is pretty neat when you are manually testing your components.

Also, you can think of this as a way to document events in your components.

### [Links](https://github.com/storybookjs/storybook/tree/master/addons/links)

With links you can link stories together. With that, you can build demos and prototypes directly from your UI components.

### [Knobs](https://github.com/storybookjs/storybook/tree/master/addons/knobs)

Knobs allow you to edit React props dynamically using the Storybook UI.
You can also use Knobs as dynamic variables inside your stories.

### [Notes](https://github.com/storybookjs/storybook/tree/master/addons/notes)

With this addon, you can write notes for each story in your component. This is pretty useful when you are working with a team.

### [Info](https://github.com/storybookjs/storybook/tree/master/addons/info)

If you are using Storybook as a style guide, then this addon will help you to build a nice-looking style guide with docs, automatic sample source code with a PropType explorer.

### [Options](https://github.com/storybookjs/storybook/tree/master/addons/options)

The Storybook webapp UI can be customised with this addon. It can be used to change the header, show/hide various UI elements and to enable full-screen mode by default.

### [Storyshots](https://github.com/storybookjs/storybook/tree/master/addons/storyshots)

Storyshots is a way to automatically jest-snapshot all your stories. [More info here](/testing/structural-testing/).

### [Console](https://github.com/storybookjs/storybook-addon-console)

Redirects console output (logs, errors, warnings) into Action Logger Panel. `withConsole` decorator notifies from what stories logs are coming.

### [Backgrounds](https://github.com/storybookjs/storybook/tree/master/addons/backgrounds)

With this addon, you can switch between background colors and background images for your preview components. It is really helpful for styleguides.

### [Viewport](https://github.com/storybookjs/storybook/tree/master/addons/viewport)

Viewport allows your stories to be displayed in different sizes and layouts in [Storybook](https://storybook.js.org). This helps build responsive components inside of Storybook.

### [Google Analytics](https://github.com/storybookjs/storybook/tree/master/addons/google-analytics)

Support google analytics in [Storybook](https://storybook.js.org)

### [Storysource](https://github.com/storybookjs/storybook/tree/master/addons/storysource)

Show story source in the addon panel.

## Community Addons

You need to install these addons directly from NPM in order to use them.

### [Readme](https://github.com/tuchk4/storybook-readme)

With this addon, you can add docs in markdown format for each story.
It's very useful because most projects and components already have README.md files.
Now it is easy to add them into your Storybook.

### [Story-router](https://github.com/gvaldambrini/storybook-router)

A [decorator](/addons/introduction) that allows you to use your routing-aware components in your stories.

### [Host](https://github.com/philcockfield/storybook-host)

A [decorator](/addons/introduction) with powerful display options for hosting, sizing and framing your components.

### [Specs](https://github.com/mthuret/storybook-addon-specifications)

This is a very special addon where it'll allow you to write test specs directly inside your stories.
You can even run these tests inside a CI box.

### [Chapters](https://github.com/yangshun/react-storybook-addon-chapters)

With this addon, you can showcase multiple components (or varying component states) within 1 story.
Break your stories down into smaller categories (chapters) and subcategories (sections) for more organizational goodness.

### [Props Combinations](https://github.com/evgenykochetkov/react-storybook-addon-props-combinations)

Given possible values for each prop, renders your component with all combinations of prop values.
Useful for finding edge cases or just seeing all component states at once.

### [Material-UI](https://github.com/sm-react/storybook-addon-material-ui)

Wraps your story into MuiThemeProvider.
It allows you to add your custom themes, switch between them, make changes in the visual editor and download as JSON file

### [i18n tools](https://github.com/joscha/storybook-addon-i18n-tools)

With this addon, you can test your storybooks with a different text-direction.
It is very useful if you are working on components that have to work both in LTR as well as in RTL languages.

### [JSX preview](https://github.com/Kilix/storybook-addon-jsx)

This addon shows a preview of the JSX code for each story.
It allows you to configure the display and copy the code with a single click.

### [Intl](https://github.com/truffls/storybook-addon-intl)

With this addon you will have an additional panel at the bottom which provides you buttons to switch the locale and directly see the result in the preview.

### [Versions](https://github.com/buildit/storybook-addon-versions)

This addon lets you navigate different versions of static Storybook builds. As such you can see how a component has changed over time.

### [Apollo](https://github.com/abhiaiyer91/apollo-storybook-decorator)

Wrap your stories with the Apollo client for mocking GraphQL queries/mutations.

### [Screenshot](https://github.com/tsuyoshiwada/storybook-chrome-screenshot)

Save the screenshot image of your stories. via [Puppeteer](https://github.com/GoogleChrome/puppeteer).

### [Styles](https://github.com/Sambego/storybook-styles)

Add ability to customize styles in the story preview area

### [Figma](https://github.com/hharnisc/storybook-addon-figma)

Embed [Figma](https://figma.com) designs in a storybook panel.

### [State](https://github.com/Sambego/storybook-state)	

Manage state inside a story using a store. Update components when this state changes.	

### [State](https://github.com/dump247/storybook-state/)

Manage state inside a story. Update components when this state changes.
Wrap the story in a function call to setup state management. The story can modify
state properties with the provided store. The addon provides a panel to view and
reset state.

### [State](https://github.com/adierkens/storybook-addon-state)	

Store/retrieve arbitrary data. Similar to knobs this doesn't add any additional React wrappers to the story, so any other addons used (prop-types, jsx) aren't effected. Has a React hooks like API.

### [story2sketch](https://github.com/chrisvxd/story2sketch)

Convert stories into Sketch 💎 symbols.

### [styled components theme](https://github.com/echoulen/storybook-addon-styled-component-theme)

styled components theme selection.

### [AngularJS](https://github.com/titonobre/storybook-addon-angularjs)

Create stories with AngularJS(1.x) components.

### [JSS theme](https://github.com/vertexbz/storybook-addon-jss-theme)

JSS theme selection.

### [React live edit](https://github.com/vertexbz/storybook-addon-react-live-edit)

Provides live react story editing and preview.

### [copy-code-block](https://www.npmjs.com/package/@pickra/copy-code-block)

Display code and copy it to the clipboard. It also has options to customize colors and syntax highlighting for any language. There is similar functionality via [@storybook/addon-info](https://www.npmjs.com/package/@storybook/addon-info) but addon-info doesn't currently work when using [@storybook/html](https://www.npmjs.com/package/@storybook/html).

### [storybook-addon-react-docgen](https://github.com/hipstersmoothie/storybook-addon-react-docgen/)

Display react docgen info. This addon is a drop in replacement for the [@storybook/addon-info](https://www.npmjs.com/package/@storybook/addon-info)'s prop table functionality. Rather than rendering with the component it renders in the addons panel. Works with typescript too!

### [storybook-dark-mode](https://github.com/hipstersmoothie/storybook-dark-mode)

Let your users toggle between a dark and light mode.




