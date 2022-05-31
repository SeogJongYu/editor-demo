import {useNavigate} from 'react-router-dom';

import Page from '~/common/components/Page';
import TUIEditor from '~/common/components/TUIEditor';

export default function HomePage() {
  const navigate = useNavigate();
  return (
    <Page>
      <div className="pt-10">
        <div
          style={{
            backgroundColor: 'rgb(74 222 128)',
            padding: '10px 0',
            textAlign: 'center',
            fontWeight: 'bold',
            marginBottom: '10px',
          }}>
          TUI Editor Demo
        </div>
        <button onClick={() => navigate('/editor')}>
          번들에디터 사용 페이지로 이동
        </button>
        <div>
          dfs
          <ul style={{listStyle: 'none'}}>
            <li>sfdsd</li>
            <li>sfdsd</li>
          </ul>
        </div>
        <TUIEditor />
      </div>
    </Page>
  );
}
