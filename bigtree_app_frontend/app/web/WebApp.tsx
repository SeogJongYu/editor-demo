import {ReactNode} from 'react';
import {QueryClient, QueryClientProvider} from 'react-query';

import apiQuery from '~/common/api/apiQuery';

import './WebApp.scss';

import MainPage from './pages/MainPage';

function WebApp() {
  return (
    <Providers>
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

export default WebApp;
