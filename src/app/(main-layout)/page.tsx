import { FC, Suspense } from 'react';
import Main from '@/components/Main/Main';

const MainPage: FC = () => {
  return (
    <Suspense fallback={<div>Загрузка…</div>}>
      <Main />
    </Suspense>
  );
};
export default MainPage;
