import '@toast-ui/editor/dist/toastui-editor.css';
import 'tui-image-editor/dist/tui-image-editor.css';
import 'tui-color-picker/dist/tui-color-picker.css';

import {useEditor} from '~/web/hooks/useEditor';

export default function TUIEditor() {
  const {core, setEditorState} = useEditor();

  function tuiEvent() {
    if (!core) {
      return;
    }

    core.focus();
  }

  // const styleArr = ['color: red', 'text-decoration: underline'];
  // const styleObj = {
  //   color: 'red',
  //   'text-decoration': 'underline',
  // };
  // const entries = Object.entries(styleObj);
  // for (const [key, value] of entries) {
  //   console.log({key, value});
  // }
  // const str = entries.map(([k, v]) => `${k}: ${v}`).join('; ');
  // console.log({entries});
  // console.log('????', Object.keys(styleObj).length);

  // const sample = convertStyleObjToStr(styleObj);
  // console.log({sample});

  // styleArr.forEach(item => {
  //   str.push(item);
  // });

  // const obj = convertStyleStrToObj('color: red; text-decoration: underline');
  // console.log({obj});

  return (
    <>
      <div style={{}}>sdfsd</div>
      <button onClick={tuiEvent}>ㅇ</button>
      <div id="editor" />
    </>
  );
}
