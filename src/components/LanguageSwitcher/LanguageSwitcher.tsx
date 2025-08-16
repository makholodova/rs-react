'use client';

import { useLocale } from 'next-intl';

import { routing } from '@/i18n/routing';
import { useSearchParams } from 'next/navigation';
import styles from './LanguageSwitcher.module.css';
import { Link, usePathname } from '@/i18n/navigation.ts'; // опционально

export default function LanguageSwitcher() {
  const active = useLocale();
  const pathname = usePathname(); // без префикса локали (например, "/pokemon/4")
  const search = useSearchParams();
  const qs = search?.toString();
  const hrefWithQuery = qs ? `${pathname}?${qs}` : pathname;

  return (
    <div className={styles?.wrapper ?? ''}>
      {routing.locales.map((loc) => (
        <Link
          key={loc}
          href={hrefWithQuery}
          locale={loc}
          prefetch={false}
          aria-current={active === loc ? 'page' : undefined}
          className={`${styles?.btn ?? ''} ${active === loc ? (styles?.active ?? '') : ''}`}
          title={String(loc).toUpperCase()}
        >
          {String(loc).toUpperCase()}
        </Link>
      ))}
    </div>
  );
}
