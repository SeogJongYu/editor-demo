import {ReactNode} from 'react';
import {QueryClient, QueryClientProvider} from 'react-query';

import './WebApp.scss';

import apiQuery from '~/common/api/apiQuery';
import {useCSRFToken} from '~/common/api/csrf';

import MainPage from './pages/MainPage';

function WebApp() {
  return (
    <Providers>
      <CSRFTokenInitializer />
      <MainPage />
    </Providers>
  );
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: apiQuery,
    },
  },
});

function Providers({children}: {children: ReactNode}) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

function CSRFTokenInitializer() {
  useCSRFToken();
  return null;
}

export default WebApp;
