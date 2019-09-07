import React, { Component, ChangeEvent } from 'react';
import PropTypes from 'prop-types';
import deepEqual from 'fast-deep-equal';
import { polyfill } from 'react-lifecycles-compat';
import { Form } from '@storybook/components';

export interface ObjectTypeKnob<T> {
  name: string;
  value: T;
}

interface ObjectTypeProps<T> {
  knob: ObjectTypeKnob<T>;
  onChange: (value: T) => T;
}

interface ObjectTypeState<T> {
  value: string;
  failed: boolean;
  json?: T;
}

class ObjectType<T> extends Component<ObjectTypeProps<T>> {
  static propTypes = {
    knob: PropTypes.shape({
      name: PropTypes.string,
      value: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    }).isRequired,
    onChange: PropTypes.func.isRequired,
  };

  static serialize: { <T>(object: T): string } = object => JSON.stringify(object);

  static deserialize: { <T>(value: string): T } = value => (value ? JSON.parse(value) : {});

  static getDerivedStateFromProps<T>(
    props: ObjectTypeProps<T>,
    state: ObjectTypeState<T>
  ): ObjectTypeState<T> {
    if (!deepEqual(props.knob.value, state.json)) {
      try {
        return {
          value: JSON.stringify(props.knob.value, null, 2),
          failed: false,
          json: props.knob.value,
        };
      } catch (e) {
        return { value: 'Object cannot be stringified', failed: true };
      }
    }
    return null;
  }

  state: ObjectTypeState<T> = {
    value: '',
    failed: false,
    json: {} as any,
  };

  handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    const { json: stateJson } = this.state;
    const { knob, onChange } = this.props;

    try {
      const json = JSON.parse(value.trim());
      this.setState({
        value,
        json,
        failed: false,
      });
      if (deepEqual(knob.value, stateJson)) {
        onChange(json);
      }
    } catch (err) {
      this.setState({
        value,
        failed: true,
      });
    }
  };

  render() {
    const { value, failed } = this.state;
    const { knob } = this.props;

    return (
      <Form.Textarea
        name={knob.name}
        valid={failed ? 'error' : null}
        value={value}
        onChange={this.handleChange}
        size="flex"
      />
    );
  }
}

polyfill(ObjectType);

export default ObjectType;
