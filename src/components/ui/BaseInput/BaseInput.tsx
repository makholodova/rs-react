import './BaseInput.css';
import { type ChangeEvent, Component, type InputHTMLAttributes } from 'react';

interface BaseInputProps extends InputHTMLAttributes<HTMLInputElement> {
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

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
