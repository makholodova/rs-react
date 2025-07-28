import type { FC } from 'react';
import BaseButton from 'components/ui/BaseButton/BaseButton.tsx';
import './Pagination.css';

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
    <div className="pagination-controls">
      <BaseButton
        className="button button-prev"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        &lt;
      </BaseButton>
      <span className="pagination-label">{currentPage}</span>
      <BaseButton
        className="button button-next"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={isNextDisabled}
      >
        &gt;
      </BaseButton>
    </div>
  );
};

export default Pagination;
