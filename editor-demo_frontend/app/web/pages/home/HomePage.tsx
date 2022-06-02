import Page from '~/common/components/Page';
import TUIEditor from '~/common/components/TUIEditor';

export default function HomePage() {
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
        <TUIEditor />
      </div>
    </Page>
  );
}
