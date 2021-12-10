import {ReactNode} from 'react';
import {QueryClient, QueryClientProvider} from 'react-query';

import apiQuery from '~/common/api/apiQuery';

import MainScreen from './screens/MainScreen';

function NativeApp() {
  return (
    <Providers>
      <MainScreen />
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

export default NativeApp;
