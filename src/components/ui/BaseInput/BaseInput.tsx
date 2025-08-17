import { type ChangeEvent, type FC } from 'react';
import { BaseInputProps } from '@/types/ui';
import styles from './BaseInput.module.css';

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
      className={styles['base-input']}
      {...rest}
    />
  );
};

export default BaseInput;
