import {
  configureStore,
  type Middleware,
  type Reducer,
} from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import type { FC, PropsWithChildren } from 'react';

interface Api {
  reducerPath: string;
  reducer: Reducer;
  middleware: Middleware;
}

export function setupApiStore(api: Api): {
  store: ReturnType<typeof configureStore>;
  wrapper: FC<PropsWithChildren>;
} {
  const store = configureStore({
    reducer: {
      [api.reducerPath]: api.reducer,
    },
    middleware: (gDM) => gDM().concat(api.middleware),
  });

  const wrapper: FC<PropsWithChildren> = ({ children }) => (
    <Provider store={store}>{children}</Provider>
  );

  return { store, wrapper };
}
