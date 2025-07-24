import type { FC } from 'react';
import './NotFoundPage.css';
import BaseButton from 'components/ui/BaseButton/BaseButton.tsx';
import { useNavigate } from 'react-router-dom';

const NotFoundPage: FC = () => {
  const navigate = useNavigate();

  return (
    <div className="container-not-found">
      <h2 className="not-found-title">404 — Page Not Found</h2>
      <p className="not-found-text">
        Oops! The page you&rsquo;re looking for doesn&rsquo;t exist or has been
        moved.
      </p>
      <BaseButton
        className="button button-not-found"
        onClick={() => navigate('/')}
      >
        Go to Homepage
      </BaseButton>
    </div>
  );
};

export default NotFoundPage;
