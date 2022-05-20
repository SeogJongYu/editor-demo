import {useEffect} from 'react';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';

import TUIEditor from '~/common/components/TUIEditor';
import {useEditor} from '~/web/hooks/useEditor';

export default function TextPage() {
  const {core, setEditorState} = useEditor();

  return (
    <div className="pt-10">
      <TUIEditor />
    </div>
  );
}
