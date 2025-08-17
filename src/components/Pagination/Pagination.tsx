import type { FC } from 'react';

import styles from './Pagination.module.css';
import BaseButton from '@/components/ui/BaseButton/BaseButton.tsx';

export interface PaginationProps {
  currentPage: number;
  onPageChange: (newPage: number) => void;
  isNextDisabled?: boolean;
}

const Pagination: FC<PaginationProps> = ({
  currentPage,
  onPageChange,
  isNextDisabled,
}) => {
  return (
    <div className={styles['pagination-controls']}>
      <BaseButton
        className={styles['button button-prev']}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        &lt;
      </BaseButton>
      <span className={styles['pagination-label']}>{currentPage}</span>
      <BaseButton
        className={styles['button button-next']}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={isNextDisabled}
      >
        &gt;
      </BaseButton>
    </div>
  );
};

export default Pagination;
