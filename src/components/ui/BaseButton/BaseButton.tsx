import { Component } from 'react';
import type { BaseButtonProps } from 'types/ui.ts';
import './BaseButton.css';

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
