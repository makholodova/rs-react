import type { FC } from 'react';

const NotFoundPage: FC = () => {
  return (
    <div>
      <h1>404 — Страница не найдена</h1>
      <p>
        Проверьте адрес или вернитесь на <a href="/">главную</a>.
      </p>
    </div>
  );
};

export default NotFoundPage;
