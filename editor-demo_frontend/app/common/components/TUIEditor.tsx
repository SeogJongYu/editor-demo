import '@toast-ui/editor/dist/toastui-editor.css';
import 'tui-image-editor/dist/tui-image-editor.css';
import 'tui-color-picker/dist/tui-color-picker.css';

import {useEditor} from '~/web/hooks/useEditor';
import Cat from '~/common/assets/cat.png';
import Owl from '~/common/assets/owl.svg';
import {ReactComponent as TextIcon} from '~/common/assets/editor_icon/icon_Text_BGColor.svg';
import {ReactComponent as Qua} from '~/common/assets/editor_icon/icon_Quatation.svg';

import {svgIcon} from '../assets/svg/svgIcon';

export default function TUIEditor() {
  const {core, setEditorState} = useEditor();

  function tuiEvent() {
    if (!core) {
      return;
    }
    const svgElement = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'svg',
    );
    svgElement.innerHTML = 'dsa';

    const elements = core.getEditorElements();
    const html = core.getHTML();
    const markdown = core.getMarkdown();
    const selectedText = core.getSelectedText();
    const selection = core.getSelection();
    // core.insertText('https://picsum.photos/200/300');
    console.log('elements:', elements);
    console.log('html:', html);
    console.log('markdown:', markdown);
    console.log('selectedText:', selectedText);
    console.log('selection:', selection);
  }

  return (
    <>
      {/* <iframe src="http://www.example.com/" width="400" height="300"></iframe> */}
      {/* {svgIcon.happy} */}

      {/* <button onClick={tuiEvent}>버튼</button> */}
      <Qua />
      <div
        style={{
          border: '1px solid black',
          width: 30,
          height: 30,
          backgroundImage: `url(${require('~/common/assets/editor_icon/icon_Text_BGColor.svg')})`,
          // background: 'url(~/common/assets/cat.png)',
          backgroundSize: '20px 20px',
          // background: `url(${Cat})`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
        }}></div>
      <div id="editor" />
    </>
  );
}
