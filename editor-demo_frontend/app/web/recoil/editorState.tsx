import {atom} from 'recoil';
import Editor from '@toast-ui/editor';
import {EditorPlugin} from '@toast-ui/editor/types/editor';

interface TUIEditorState {
  core: Editor | undefined;
}

export const TUIEditorState = atom<TUIEditorState>({
  key: 'editorState',
  default: {
    core: undefined,
  },
  dangerouslyAllowMutability: true,
});
