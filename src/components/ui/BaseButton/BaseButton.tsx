import { type FC } from 'react';
import { BaseButtonProps } from '@/types/ui';
import styles from './BaseButton.module.css';

const BaseButton: FC<BaseButtonProps> = ({
  type = 'button',
  variant = 'primary',
  children,
  className = '',
  ...rest
}) => {
  return (
    <button
      type={type}
      className={[
        styles['base-button'],
        styles[`variant-${variant}`],
        className,
      ]
        .join(' ')
        .trim()}
      {...rest}
    >
      {children}
    </button>
  );
};
export default BaseButton;
