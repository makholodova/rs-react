'use client';
import { type FC, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { clearSelection } from '@/store/selectedItemsSlice';
import type { RootState } from '@/store/store';
import BaseButton from '@/components/ui/BaseButton/BaseButton';
import FloppyDiskIcon from '@/assets/floppy_disk.svg';
import styles from './Flyout.module.css';
import { useTranslations } from 'next-intl';

const Flyout: FC = () => {
  const t = useTranslations('Flyout');
  const selectedItems = useAppSelector(
    (state: RootState) => state.selectedItems.items
  );
  const dispatch = useAppDispatch();

  const isFlyoutVisible = Boolean(selectedItems.length);

  const handleUnselectAll = (): void => {
    dispatch(clearSelection());
  };

  const selectedItemsJson = useMemo(
    () => JSON.stringify(selectedItems),
    [selectedItems]
  );

  if (isFlyoutVisible) {
    return (
      <div className={styles['flyout']}>
        <div className={styles['flyout__content']}>
          <p className={styles['flyout__title']}>
            {t('title')}: <span>{selectedItems.length} </span>
          </p>
          <div className={styles['flyout__buttons']}>
            <BaseButton onClick={handleUnselectAll}>
              {t('button.unselect')}
            </BaseButton>

            <form action="/api/actions" method="POST" target="_blank">
              <input type="hidden" name="items" value={selectedItemsJson} />
              <BaseButton
                type="submit"
                data-testid="download-link"
                aria-label="Download CSV"
              >
                <FloppyDiskIcon className={styles['download__icon']} />
              </BaseButton>
            </form>
          </div>
        </div>
      </div>
    );
  } else return null;
};

export default Flyout;
