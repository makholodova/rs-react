import { type FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import ThemeButton from '@/components/ThemeButton/ThemeButton';
import styles from './Header.module.css';

const Header: FC = () => {
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
          <ThemeButton />
          <Link className={styles['header__nav-link']} href="/">
            Main
          </Link>
          <Link className={styles['header__nav-link']} href="/about">
            About
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
