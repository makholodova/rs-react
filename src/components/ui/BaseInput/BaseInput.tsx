import { type ChangeEvent, Component } from 'react';
import type { BaseInputProps } from 'types/ui.ts';
import './BaseInput.css';

export default class BaseInput extends Component<BaseInputProps> {
  handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { onChange } = this.props;
    if (onChange) {
      onChange(e);
    }
  };

  render() {
    const { value, placeholder = '', type = 'text', ...rest } = this.props;
    return (
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={this.handleInput}
        className={`base-input`}
        {...rest}
      />
    );
  }
}
