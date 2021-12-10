import {QueryClient, QueryClientProvider} from 'react-query';

import apiQuery from './common/api/apiQuery';
import NativeApp from './native/NativeApp';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: apiQuery,
    },
  },
});

function Root() {
  return (
    <QueryClientProvider client={queryClient}>
      <NativeApp />
    </QueryClientProvider>
  );
}

export default Root;
