import '@toast-ui/editor/dist/toastui-editor.css';
import 'tui-image-editor/dist/tui-image-editor.css';
import 'tui-color-picker/dist/tui-color-picker.css';

import {useEffect} from 'react';

import {useEditor} from '~/web/hooks/useEditor';

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
    // console.log('elements:', elements);
    // console.log('html:', html);
    // console.log('markdown:', markdown);
    console.log('selectedText:', selectedText);
    console.log('selection:', selection);

    //@ts-ignore
    core.insertText(svgElement);
  }

  return (
    <>
      <button onClick={tuiEvent}>버튼</button>
      <div id="editor" />
    </>
  );
}
