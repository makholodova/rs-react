'use client';

import { useLocale } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { Link, usePathname } from '@/i18n/navigation.ts';
import Image from 'next/image';
import styles from './LanguageSwitcher.module.css';

export default function LanguageSwitcher() {
  const active = useLocale();
  const pathname = usePathname();
  const search = useSearchParams();

  const qs = search?.toString();
  const hrefWithQuery = qs ? `${pathname}?${qs}` : pathname;

  return (
    <div className={styles['wrapper']}>
      <Link
        href={hrefWithQuery}
        locale="en"
        prefetch={false}
        className={`${styles['link']} ${active === 'en' ? styles['active'] : styles['inactive']}`}
      >
        <Image
          className={styles['image']}
          priority={false}
          src="/en.svg"
          alt="English"
          width={48}
          height={36}
        />
      </Link>
      <Link
        href={hrefWithQuery}
        locale="ru"
        prefetch={false}
        className={`${styles['link']} ${active === 'ru' ? styles['active'] : styles['inactive']}`}
      >
        <Image
          className={styles['image']}
          src="/ru.svg"
          alt="Русский"
          width={48}
          height={36}
          priority={false}
        />
      </Link>
    </div>
  );
}
