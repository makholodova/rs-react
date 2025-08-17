import { type FC } from 'react';
import { FallbackProps } from '@/types/components';
import BaseButton from '@/components/ui/BaseButton/BaseButton.tsx';
import styles from 'Fallback.module.css';

const Fallback: FC<FallbackProps> = ({ onReload }) => {
  return (
    <div className={styles['fallback']}>
      <h2 className={styles['fallback__message']}>
        Sorry. Something went wrong...
        <br />
        Please, reload the page
      </h2>
      <BaseButton onClick={onReload} className={styles['fallback__button']}>
        Reset
      </BaseButton>
    </div>
  );
};

export default Fallback;
