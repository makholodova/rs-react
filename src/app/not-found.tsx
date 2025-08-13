'use client';

import { FC } from 'react';
import { useRouter } from 'next/navigation';
import BaseButton from '@/components/ui/BaseButton/BaseButton';
import styles from './NotFound.module.css';

const NotFound: FC = () => {
  const router = useRouter();
  return (
    <div data-testid="not-found-page" className={styles['container-not-found']}>
      <h2>404 — Page Not Found</h2>
      <p className={styles['not-found-text']}>
        Oops! The page you&rsquo;re looking for doesn&rsquo;t exist or has been
        moved.
      </p>
      <BaseButton onClick={() => router.push('/')}>Go to Homepage</BaseButton>
    </div>
  );
};
export default NotFound;
