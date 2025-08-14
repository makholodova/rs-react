'use client';
import { type FC } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { clearSelection } from '@/store/selectedItemsSlice';
import type { RootState } from '@/store/store';
import BaseButton from '@/components/ui/BaseButton/BaseButton';
import FloppyDiskIcon from '@/assets/floppy_disk.svg';
import formatCharactersToCSV from '@/units/formatCharactersToCSV';
import styles from './Flyout.module.css';

const Flyout: FC = () => {
  const selectedItems = useAppSelector(
    (state: RootState) => state.selectedItems.items
  );
  const dispatch = useAppDispatch();

  const isFlyoutVisible = Boolean(selectedItems.length);

  const handleUnselectAll = (): void => {
    dispatch(clearSelection());
  };

  const getUrl = (): string => {
    const csvData = formatCharactersToCSV(selectedItems);
    const blob = new Blob(['\uFEFF', ...csvData], { type: 'text/csv' });
    return URL.createObjectURL(blob);
  };
  if (isFlyoutVisible) {
    return (
      <div className={styles['flyout']}>
        <div className={styles['flyout__content']}>
          <p className={styles['flyout__title']}>
            Selected cards: <span>{selectedItems.length} </span>
          </p>
          <div className={styles['flyout__buttons']}>
            <BaseButton onClick={handleUnselectAll}>Unselect all</BaseButton>

            <a
              data-testid="download-link"
              href={getUrl()}
              download={`${selectedItems.length}_items.csv`}
            >
              <BaseButton>
                <FloppyDiskIcon className={styles['download__icon']} />
              </BaseButton>
            </a>
          </div>
        </div>
      </div>
    );
  } else return null;
};

export default Flyout;
