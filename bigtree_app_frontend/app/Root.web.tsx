import {QueryClient, QueryClientProvider} from 'react-query';

import WebApp from './web/WebApp';
import apiQuery from './common/api/apiQuery';

import './Root.web.scss';

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
      <WebApp />
    </QueryClientProvider>
  );
}

export default Root;
