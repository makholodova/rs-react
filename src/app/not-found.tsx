import { FC } from 'react';
import styles from './NotFound.module.css';
import Link from 'next/link';

const NotFound: FC = () => {
  return (
    <div data-testid="not-found-page" className={styles['container-not-found']}>
      <h2>404 — Page Not Found</h2>
      <p className={styles['not-found-text']}>
        Oops! The page you&rsquo;re looking for doesn&rsquo;t exist or has been
        moved.
      </p>
      <Link className={styles['not-found-link']} href="/">
        Go to Homepage
      </Link>
    </div>
  );
};
export default NotFound;
