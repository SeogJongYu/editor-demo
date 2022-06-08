import '@toast-ui/editor/dist/toastui-editor.css';
import 'tui-image-editor/dist/tui-image-editor.css';
import 'tui-color-picker/dist/tui-color-picker.css';

import {useEditor} from '~/web/hooks/useEditor';

export default function TUIEditor() {
  const {core, setEditorState} = useEditor();

  function getElement() {
    setEditorState(prev => ({
      ...prev,
      contentData: core?.getHTML() ?? '',
    }));
  }

  return (
    <>
      <button onClick={getElement}>GET</button>
      <div id="editor" spellCheck={false} />
      <div style={{marginTop: '12px'}} id="editor-viewer" />
    </>
  );
}
