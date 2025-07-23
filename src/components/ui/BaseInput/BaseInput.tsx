import { type ChangeEvent, type FC } from 'react';
import type { BaseInputProps } from 'types/ui.ts';
import './BaseInput.css';

const BaseInput: FC<BaseInputProps> = ({
  value,
  onChange,
  placeholder = '',
  type = 'text',
  ...rest
}) => {
  const handleInput = (e: ChangeEvent<HTMLInputElement>): void => {
    if (onChange) {
      onChange(e);
    }
  };
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={handleInput}
      className={`base-input`}
      {...rest}
    />
  );
};

export default BaseInput;
