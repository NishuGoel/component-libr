import React from 'react';
import PropTypes from 'prop-types';
import Grid from '../Grid';
import './style.css';

const Examples = ({ items }) => (
  <div className="examples">
    <div className="heading">
      <h1>Storybook Examples</h1>
      <a
        className="edit-link"
        href="https://github.com/storybookjs/storybook/blob/master/docs/src/pages/examples/_examples.yml"
        target="_blank"
        rel="noopener noreferrer"
      >
        Edit this list
      </a>
    </div>
    <Grid columnWidth={350} items={items} />
  </div>
);
Examples.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  items: PropTypes.array,
};
Examples.defaultProps = {
  items: [],
};

export { Examples as default };
