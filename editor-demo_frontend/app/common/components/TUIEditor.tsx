import '@toast-ui/editor/dist/toastui-editor.css';
import 'tui-image-editor/dist/tui-image-editor.css';
import 'tui-color-picker/dist/tui-color-picker.css';
import {Transaction, Selection, TextSelection} from 'prosemirror-state';
import {EditorView} from 'prosemirror-view';
import {toggleMark} from 'prosemirror-commands';

import {useEditor} from '~/web/hooks/useEditor';

export default function TUIEditor() {
  const {core, setEditorState} = useEditor();

  function tuiEvent() {
    if (!core) {
      return;
    }

    core.focus();

    // const elements = core.getEditorElements();
    // const html = core.getHTML();
    // const markdown = core.getMarkdown();
    // const selectedText = core.getSelectedText();
    // const selection = core.getSelection();
    // // core.insertText('https://picsum.photos/200/300');
    // console.log('elements:', elements);
    // console.log('html:', html);
    // console.log('markdown:', markdown);
    // console.log('selectedText:', selectedText);
    // console.log('selection:', selection);
  }

  function getState() {
    console.log('EditorView:', EditorView);
    //@ts-ignore
    // return Selection;
  }

  return (
    <>
      <button onClick={tuiEvent}>ㅇ</button>
      <div id="editor" />
    </>
  );
}
