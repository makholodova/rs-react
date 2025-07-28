import { type FC } from 'react';
import type { BaseButtonProps } from 'types/ui.ts';
import './BaseButton.css';

const BaseButton: FC<BaseButtonProps> = ({
  type = 'button',
  children,
  className = '',
  ...rest
}) => {
  return (
    <button type={type} className={`base-button ${className}`} {...rest}>
      {children}
    </button>
  );
};
export default BaseButton;
