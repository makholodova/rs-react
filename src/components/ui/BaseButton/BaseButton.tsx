import { type ButtonHTMLAttributes, Component, type ReactNode } from 'react';
import './BaseButton.css';

interface BaseButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
}

export default class BaseButton extends Component<BaseButtonProps> {
  render() {
    const { type = 'button', children, className = '', ...rest } = this.props;
    return (
      <button type={type} className={`base-button ${className}`} {...rest}>
        {children}
      </button>
    );
  }
}
