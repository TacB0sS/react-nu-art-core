import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {css} from 'emotion'

const inputFieldContainer = css`
  align-items: center;
  label: input-field-container;
`;

const inputFieldLabel = css`
  margin-right: 10px;
  label: input-field-label;
`;

const input = css`
  padding-left: 30px;
  padding-right: 30px;
  padding-top: 10px;
  padding-bottom: 10px;
  margin-top: 10px;
  margin-bottom: 10px;
  border-radius: 40px !important;
  box-shadow: 0 0 0 1px rgba(41, 41, 41, 0.2) inset;
  font-size: 18px;
  color: #242424;
  border: none;
`;

class InputTextField
  extends Component {
  constructor(props) {
    super(props);

    this.onValueChanged = this.onValueChanged.bind(this);

    this.state = {
      error: null,
      value: props.value || ""
    };
  }

  onValueChanged(evt) {
    let value = evt.target.value;
    this.props.onInputValueChanged && this.props.onInputValueChanged(value, this.props.id);
    this.setState(() => {
      return {value: value}
    });
  }

  validateValue() {
    if (!this.props.validateValue)
      return true;
    let value = this.state.value + "";

    if (!this.props.validateValue)
      return true;

    let errorMessage = this.props.validateValue(value);

    this.setState(() => {
      return {error: errorMessage}
    });
    return !errorMessage;

  }

  onFocusLost() {
    if (!this.props.onFocusLost)
      return;

    this.props.onFocusLost(this.state.value, this.props.id);
  }

  render() {
    return (
      <div className={inputFieldContainer}>
        <div className={inputFieldLabel}>{this.props.label}</div>

        <input
          value={this.props.value}
          className={this.props.style || input}
          onChange={this.onValueChanged}
          id={this.props.id}
          label={this.props.label}
          type={this.props.type}
          placeholder={this.props.placeholder}
          onKeyPress={this.props.onKeyPress}
          autoComplete={this.props.autoComplete}
          onBlur={() => {
            if (this.validateValue())
              this.onFocusLost();
          }}
        />

        <div className={this.state.error ? "form-error-message-on" : "form-error-message-off"}>
          {this.state.error}</div>
      </div>
    );
  }
}

InputTextField.propTypes = {
  label: PropTypes.string,
  value: PropTypes.any,
  onInputValueChanged: PropTypes.func,
  validateValue: PropTypes.func,
  onFocusLost: PropTypes.func,
};

export default InputTextField;
