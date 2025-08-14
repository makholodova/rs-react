'use client';
import React from 'react';
import styles from '@/pages/Main/Main.module.css';
import { usePathname } from 'next/navigation';

const MainLayout = ({
  children,
  details,
}: {
  children: React.ReactNode;
  details: React.ReactNode;
}) => {
  const pathname = usePathname() ?? '';
  const hasDetails = /^\/pokemon\/\w+/.test(pathname);

  return (
    <main className={styles['main']}>
      <div
        className={`${styles['main__left']} ${hasDetails ? styles['main__left--disabled'] : ''}`}
      >
        {children}
      </div>
      <div className={styles['main__right']}>{details}</div>
    </main>
  );
};

export default MainLayout;
