import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import {
  withKnobs,
  text,
  number,
  boolean,
  color,
  select,
  radios,
  array,
  date,
  button,
  object,
  files,
  optionsKnob as options,
} from '@storybook/addon-knobs';

const ItemLoader = ({ isLoading, items }) => {
  if (isLoading) {
    return <p>Loading data</p>;
  }
  if (!items.length) {
    return <p>No items loaded</p>;
  }
  return (
    <ul>
      {items.map(i => (
        <li key={i}>{i}</li>
      ))}
    </ul>
  );
};

ItemLoader.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  items: PropTypes.arrayOf(PropTypes.string).isRequired,
};
let injectedItems = [];
let injectedIsLoading = false;

export default {
  title: 'Addons|Knobs.withKnobs',
  decorators: [withKnobs],

  parameters: {
    component: withKnobs,
  },
};

export const tweaksStaticValues = () => {
  const name = text('Name', 'Storyteller');
  const age = number('Age', 70, { range: true, min: 0, max: 90, step: 5 });
  const fruits = {
    Apple: 'apple',
    Banana: 'banana',
    Cherry: 'cherry',
  };
  const fruit = select('Fruit', fruits, 'apple');

  const otherFruits = {
    Kiwi: 'kiwi',
    Guava: 'guava',
    Watermelon: 'watermelon',
  };
  const otherFruit = radios('Other Fruit', otherFruits, 'watermelon');
  const dollars = number('Dollars', 12.5, { min: 0, max: 100, step: 0.01 });
  const years = number('Years in NY', 9);

  const backgroundColor = color('background', '#dedede');
  const items = array('Items', ['Laptop', 'Book', 'Whiskey']);
  const otherStyles = object('Styles', {
    border: '2px dashed silver',
    borderRadius: 10,
    padding: '10px',
  });
  const nice = boolean('Nice', true);
  const images = files('Happy Picture', 'image/*', [
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QA/4ePzL8AAAAHdElNRQfiARwMCyEWcOFPAAAAP0lEQVQoz8WQMQoAIAwDL/7/z3GwghSp4KDZyiUpBMCYUgd8rehtH16/l3XewgU2KAzapjXBbNFaPS6lDMlKB6OiDv3iAH1OAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDE4LTAxLTI4VDEyOjExOjMzLTA3OjAwlAHQBgAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxOC0wMS0yOFQxMjoxMTozMy0wNzowMOVcaLoAAAAASUVORK5CYII=',
  ]);

  // NOTE: the default value must not change - e.g., do not do date('Label', new Date()) or date('Label')
  const defaultBirthday = new Date('Jan 20 2017 GMT+0');
  const birthday = date('Birthday', defaultBirthday);

  const intro = `My name is ${name}, I'm ${age} years old, and my favorite fruit is ${fruit}. I also enjoy ${otherFruit}.`;
  const style = { backgroundColor, ...otherStyles };
  const salutation = nice ? 'Nice to meet you!' : 'Leave me alone!';
  const dateOptions = { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' };

  return (
    <div style={style}>
      <p>{intro}</p>
      <p>My birthday is: {new Date(birthday).toLocaleDateString('en-US', dateOptions)}</p>
      <p>I live in NY for {years} years.</p>
      <p>My wallet contains: ${dollars.toFixed(2)}</p>
      <p>In my backpack, I have:</p>
      <ul>
        {items.map(item => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <p>{salutation}</p>
      <p>
        When I am happy I look like this: <img src={images[0]} alt="happy" />
      </p>
    </div>
  );
};
tweaksStaticValues.story = {
  name: 'tweaks static values',
};

export const tweaksStaticValuesOrganizedInGroups = () => {
  const GROUP_IDS = {
    DISPLAY: 'Display',
    GENERAL: 'General',
    FAVORITES: 'Favorites',
  };

  const fruits = {
    Apple: 'apple',
    Banana: 'banana',
    Cherry: 'cherry',
  };

  const otherFruits = {
    Kiwi: 'kiwi',
    Guava: 'guava',
    Watermelon: 'watermelon',
  };

  // NOTE: the default value must not change - e.g., do not do date('Label', new Date()) or date('Label')
  const defaultBirthday = new Date('Jan 20 2017 GMT+0');

  // Ungrouped
  const ungrouped = text('Ungrouped', 'Mumble');

  // General
  const name = text('Name', 'Storyteller', GROUP_IDS.GENERAL);
  const age = number('Age', 70, { range: true, min: 0, max: 90, step: 5 }, GROUP_IDS.GENERAL);
  const birthday = date('Birthday', defaultBirthday, GROUP_IDS.GENERAL);
  const dollars = number(
    'Account Balance',
    12.5,
    { min: 0, max: 100, step: 0.01 },
    GROUP_IDS.GENERAL
  );
  const years = number('Years in NY', 9, {}, GROUP_IDS.GENERAL);

  // Favorites
  const nice = boolean('Nice', true, GROUP_IDS.FAVORITES);
  const fruit = select('Fruit', fruits, 'apple', GROUP_IDS.FAVORITES);
  const otherFruit = radios('Other Fruit', otherFruits, 'watermelon', GROUP_IDS.FAVORITES);
  const items = array('Items', ['Laptop', 'Book', 'Whiskey'], ',', GROUP_IDS.FAVORITES);

  // Display
  const backgroundColor = color('Color', 'rgba(126, 211, 33, 0.22)', GROUP_IDS.DISPLAY);
  const otherStyles = object(
    'Styles',
    {
      border: '2px dashed silver',
      borderRadius: 10,
      padding: '10px',
    },
    GROUP_IDS.DISPLAY
  );

  const style = { backgroundColor, ...otherStyles };

  const salutation = nice ? 'Nice to meet you!' : 'Leave me alone!';
  const dateOptions = { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' };

  return (
    <div style={style}>
      <h1>General Information</h1>
      <p>Name: {name}</p>
      <p>Age: {age}</p>
      <p>Birthday: {new Date(birthday).toLocaleDateString('en-US', dateOptions)}</p>
      <p>Account Balance: {dollars}</p>
      <p>Years in NY: {years}</p>
      <hr />
      <h1>Favorites</h1>
      <p>Catchphrase: {salutation}</p>
      <p>Fruit: {fruit}</p>
      <p>Other Fruit: {otherFruit}</p>
      <p>Items:</p>
      <ul>
        {items.map(item => (
          <li key={`${item}`}>{item}</li>
        ))}
      </ul>
      <p>When I'm by myself, I say: "{ungrouped}"</p>
    </div>
  );
};
tweaksStaticValuesOrganizedInGroups.story = {
  name: 'tweaks static values organized in groups',
};

export const dynamicKnobs = () => {
  const showOptional = select('Show optional', ['yes', 'no'], 'yes');
  return (
    <Fragment>
      <div>{text('compulsory', 'I must be here')}</div>
      {showOptional === 'yes' ? <div>{text('optional', 'I can disappear')}</div> : null}
    </Fragment>
  );
};
dynamicKnobs.story = {
  name: 'dynamic knobs',
};

export const complexSelect = () => {
  const m = select(
    'complex',
    {
      number: 1,
      string: 'string',
      object: {},
      array: [1, 2, 3],
      function: () => {},
    },
    'string'
  );
  const value = m.toString();
  const type = Array.isArray(m) ? 'array' : typeof m;
  return (
    <pre>
      the type of {JSON.stringify(value, null, 2)} = {type}
    </pre>
  );
};
complexSelect.story = {
  name: 'complex select',
};

export const optionsKnob = () => {
  const valuesRadio = {
    Monday: 'Monday',
    Tuesday: 'Tuesday',
    Wednesday: 'Wednesday',
  };
  const optionRadio = options('Radio', valuesRadio, 'Tuesday', { display: 'radio' });

  const valuesInlineRadio = {
    Saturday: 'Saturday',
    Sunday: 'Sunday',
  };
  const optionInlineRadio = options('Inline Radio', valuesInlineRadio, 'Saturday', {
    display: 'inline-radio',
  });

  const valuesSelect = {
    January: 'January',
    February: 'February',
    March: 'March',
  };
  const optionSelect = options('Select', valuesSelect, 'January', { display: 'select' });

  const valuesMultiSelect = {
    Apple: 'apple',
    Banana: 'banana',
    Cherry: 'cherry',
  };
  const optionsMultiSelect = options('Multi Select', valuesMultiSelect, ['apple'], {
    display: 'multi-select',
  });

  const valuesCheck = {
    Corn: 'corn',
    Carrot: 'carrot',
    Cucumber: 'cucumber',
  };
  const optionsCheck = options('Check', valuesCheck, ['carrot'], { display: 'check' });

  const valuesInlineCheck = {
    Milk: 'milk',
    Cheese: 'cheese',
    Butter: 'butter',
  };
  const optionsInlineCheck = options('Inline Check', valuesInlineCheck, ['milk'], {
    display: 'inline-check',
  });

  return (
    <div>
      <p>Weekday: {optionRadio}</p>
      <p>Weekend: {optionInlineRadio}</p>
      <p>Month: {optionSelect}</p>
      <p>Fruit:</p>
      <ul>
        {optionsMultiSelect.map(item => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <p>Vegetables:</p>
      <ul>
        {optionsCheck.map(item => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <p>Dairy:</p>
      <ul>
        {optionsInlineCheck.map(item => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export const triggersActionsViaButton = () => {
  button('Toggle item list state', () => {
    if (!injectedIsLoading && injectedItems.length === 0) {
      injectedIsLoading = true;
    } else if (injectedIsLoading && injectedItems.length === 0) {
      injectedIsLoading = false;
      injectedItems = ['pencil', 'pen', 'eraser'];
    } else if (injectedItems.length > 0) {
      injectedItems = [];
    }
  });
  return (
    <Fragment>
      <p>Hit the knob button and it will toggle the items list into multiple states.</p>
      <ItemLoader isLoading={injectedIsLoading} items={injectedItems} />
    </Fragment>
  );
};
triggersActionsViaButton.story = {
  name: 'triggers actions via button',
};

export const xssSafety = () => (
  <div
    // eslint-disable-next-line react/no-danger
    dangerouslySetInnerHTML={{
      __html: text('Rendered string', '<img src="x" onerror="alert(\'XSS Attack\')" >'),
    }}
  />
);
xssSafety.story = {
  name: 'XSS safety',
};

export const acceptsStoryParameters = () => <div>{text('Rendered string', '<h1>Hello</h1>')}</div>;
acceptsStoryParameters.story = {
  name: 'accepts story parameters',

  parameters: {
    knobs: { escapeHTML: false },
  },
};
