import {Route, Routes} from 'react-router-dom';

import Page from '~/common/components/Page';

import TextPage from './TextPage';

export default function EditorPage() {
  return (
    <Page>
      <Routes>
        <Route path="text" element={<TextPage />} />
      </Routes>
    </Page>
  );
}
