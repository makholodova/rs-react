import { type ChangeEvent, Component, type ReactNode } from 'react';
import type { BaseInputProps } from 'types/ui.ts';
import './BaseInput.css';

export default class BaseInput extends Component<BaseInputProps> {
  handleInput = (e: ChangeEvent<HTMLInputElement>): void => {
    const { onChange } = this.props;
    if (onChange) {
      onChange(e);
    }
  };

  render(): ReactNode {
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
