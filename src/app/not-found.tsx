import { FC } from 'react';
import styles from './NotFound.module.css';
import { getLocale, getTranslations } from 'next-intl/server';
import Link from 'next/link';

const NotFound: FC = async () => {
  const locale = await getLocale();
  const t = await getTranslations('NotFound');
  return (
    <div data-testid="not-found-page" className={styles['container-not-found']}>
      <h2>{t('title')}</h2>
      <p className={styles['not-found-text']}>{t('text')}</p>
      <Link className={styles['not-found-link']} href={`/${locale}`}>
        {t('home')}
      </Link>
    </div>
  );
};
export default NotFound;
