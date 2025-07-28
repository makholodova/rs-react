import { type FC } from 'react';
import type { FallbackProps } from 'types/components.ts';
import BaseButton from 'components/ui/BaseButton/BaseButton.tsx';
import './Fallback.css';

const Fallback: FC<FallbackProps> = ({ onReload }) => {
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
};

export default Fallback;
