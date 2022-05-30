import {useEffect} from 'react';
import {Route, Routes, useNavigate} from 'react-router-dom';

import Page from '~/common/components/Page';

import TextPage from './TextPage';

export default function EditorPage() {
  const navigate = useNavigate();

  return (
    <Page>
      <button onClick={() => navigate('/')}>홈으로 가기</button>
      <div className="pt-10">
        <div
          style={{
            backgroundColor: 'rgb(74 222 128)',
            padding: '10px 0',
            textAlign: 'center',
            fontWeight: 'bold',
            marginBottom: '10px',
          }}>
          번들 에디터 페이지
        </div>
        <div id="bundle-editor" />
      </div>
    </Page>
  );
}
