import {ReactNode} from 'react';
import {QueryClient, QueryClientProvider} from 'react-query';

import './WebApp.scss';

import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {RecoilRoot} from 'recoil';

import apiQuery from '~/common/api/apiQuery';
import {useCSRFToken} from '~/common/api/csrf';

import MainPage from './pages/MainPage';
import HomePage from './pages/home/HomePage';
import EditorPage from './pages/editor/EditorPage';

function WebApp() {
  return (
    <Providers>
      {/* <CSRFTokenInitializer /> */}
      <BrowserRouter>
        <RecoilRoot>
          <Routes>
            <Route path="" element={<HomePage />} />
            <Route path="editor/*" element={<EditorPage />} />
          </Routes>
        </RecoilRoot>
      </BrowserRouter>
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
