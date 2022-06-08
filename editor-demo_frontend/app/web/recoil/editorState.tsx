import {atom} from 'recoil';
import Editor from '@toast-ui/editor';

interface TUIEditorState {
  core: Editor | undefined;
  contentData: string | undefined;
}

export const TUIEditorState = atom<TUIEditorState>({
  key: 'editorState',
  default: {
    core: undefined,
    contentData: undefined,
  },
  dangerouslyAllowMutability: true,
});
