'use client';
import React from 'react';
import styles from '@/components/Main/Main.module.css';
import { usePathname } from '@/i18n/navigation.ts';
import Flyout from '@/components/Flyout/Flyout';

const MainLayout = ({
  children,
  details,
}: {
  children: React.ReactNode;
  details: React.ReactNode;
}) => {
  const pathname = usePathname();
  const hasDetails = pathname.startsWith('/pokemon/');

  return (
    <main className={styles['main']}>
      <div
        className={`${styles['main__left']} ${hasDetails ? styles['main__left--disabled'] : ''}`}
      >
        {children}
      </div>
      <div className={styles['main__right']}>{details}</div>
      <Flyout />
    </main>
  );
};

export default MainLayout;
