import type { FC } from 'react';
import styles from './CircleLoader.module.css';

const CircleLoader: FC = () => {
  return (
    <div className={styles['circle-loader']} data-testid="circle-loader"></div>
  );
};

export default CircleLoader;
