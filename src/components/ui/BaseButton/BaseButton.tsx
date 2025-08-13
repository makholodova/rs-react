import { type FC } from 'react';
import { BaseButtonProps } from '@/types/ui';
import styles from './BaseButton.module.css';

const BaseButton: FC<BaseButtonProps> = ({
  type = 'button',
  children,
  className = '',
  ...rest
}) => {
  return (
    <button
      type={type}
      className={` ${styles['base-button']} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
};
export default BaseButton;
