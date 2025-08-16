import { type FC } from 'react';
import Image from 'next/image';
import { Link } from '@/i18n/navigation.ts';
import ThemeButton from '@/components/ThemeButton/ThemeButton';
import styles from './Header.module.css';
import { useTranslations } from 'next-intl';
import LanguageSwitcher from '@/components/LanguageSwitcher/LanguageSwitcher.tsx';

const Header: FC = () => {
  const t = useTranslations('Header');
  return (
    <header className={styles['header-wrapper']}>
      <div className={styles['header']}>
        <Link href="/" className={styles['header__image-wrapper']}>
          <Image
            src="/logo-pokemon.png"
            alt="Logo"
            className={styles['header__image']}
            width={79}
            height={45}
          />
        </Link>
        <nav className={styles['header__nav']}>
          <LanguageSwitcher />
          <ThemeButton />
          <Link className={styles['header__nav-link']} href="/">
            {t('nav.main')}
          </Link>
          <Link className={styles['header__nav-link']} href="/about">
            {t('nav.about')}
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
