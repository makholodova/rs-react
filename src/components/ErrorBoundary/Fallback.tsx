import { Component, type ReactNode } from 'react';
import type { FallbackProps } from 'types/components.ts';
import BaseButton from 'components/ui/BaseButton/BaseButton.tsx';
import './Fallback.css';

export default class Fallback extends Component<FallbackProps> {
  render(): ReactNode {
    const { onReload } = this.props;
    return (
      <div className="fallback">
        <h2 className="fallback__message">
          Sorry. Something went wrong...
          <br />
          Please, reload the page
        </h2>
        <BaseButton onClick={onReload} className="fallback__button">
          Reset
        </BaseButton>
      </div>
    );
  }
}
