import { type FC } from 'react';
import BaseButton from 'components/ui/BaseButton/BaseButton.tsx';

import type { RootState } from '../../store/store.ts';
import './Flyout.css';
import { clearSelection } from '../../store/selectedItemsSlice.ts';
import FloppyDiskIcon from '../../assets/floppy_disk.svg?react';
import formatCharactersToCSV from '../../units/formatCharactersToCSV.ts';
import { useAppDispatch, useAppSelector } from '../../store/hooks.ts';

const Flyout: FC = () => {
  const selectedItems = useAppSelector(
    (state: RootState) => state.selectedItems.items
  );
  const dispatch = useAppDispatch();

  const isFlyoutVisible = Boolean(selectedItems.length);

  const handleUnselectAll = (): void => {
    dispatch(clearSelection());
  };

  const handleDownload = (): void => {
    if (!selectedItems.length) return;
  };

  const getUrl = (): string => {
    const csvData = formatCharactersToCSV(selectedItems);
    const blob = new Blob(['\uFEFF', ...csvData], { type: 'text/csv' });
    return URL.createObjectURL(blob);
  };
  if (isFlyoutVisible) {
    return (
      <div className="flyout">
        <div className="flyout__content">
          <p className="flyout__title">
            Selected cards: <span>{selectedItems.length} </span>
          </p>
          <div className="flyout__buttons">
            <BaseButton onClick={handleUnselectAll}>Unselect all</BaseButton>

            <a href={getUrl()} download={`${selectedItems.length}_items.csv`}>
              <BaseButton onClick={handleDownload}>
                <FloppyDiskIcon className="download__icon" />
              </BaseButton>
            </a>
          </div>
        </div>
      </div>
    );
  } else return null;
};

export default Flyout;
