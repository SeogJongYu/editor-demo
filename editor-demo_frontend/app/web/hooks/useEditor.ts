import {useEffect} from 'react';
import {useRecoilState} from 'recoil';
import Editor, {EditorOptions} from '@toast-ui/editor';

import quotePlugin from '~/common/plugin/quotePlugin';
import customColorSyntaxPlugin from '~/common/plugin/customColorSyntaxPlugin';

import textDecoPlugin from '../../common/plugin/textDecoPlugin';
import backgroundColorPlugin from '../../common/plugin/backgroundColorPlugin';
import {TUIEditorState} from '../recoil/editorState';

const EDITOR_INIT_OPTIONS: EditorOptions = {
  plugins: [
    customColorSyntaxPlugin,
    backgroundColorPlugin,
    textDecoPlugin,
    quotePlugin,
  ],
  el: document.querySelector('#editor') as HTMLDivElement,
  previewStyle: 'vertical',
  height: '500px',
  initialEditType: 'wysiwyg',
};

export function useEditor() {
  const [{core}, setEditorState] = useRecoilState(TUIEditorState);

  // 에디터 코어 생성
  useEffect(() => {
    const reWidgetRule = /\[(@\S+)\]\((\S+)\)/;

    const editor = new Editor({
      ...EDITOR_INIT_OPTIONS,
      el: document.querySelector('#editor') as HTMLDivElement,
      toolbarItems: [
        ['heading', 'bold', 'italic'],
        ['hr'],
        ['ul', 'ol', 'task', 'indent', 'outdent'],
        ['table', 'image', 'link'],
        ['code', 'codeblock'],
      ],
      widgetRules: [
        {
          rule: reWidgetRule,
          toDOM(text) {
            const rule = reWidgetRule;
            const matched = text.match(rule);

            const span = document.createElement('span');

            span.innerHTML = `<a class="widget-anchor" style="background:purple" href="${matched?.[2]}">${matched?.[1]}</a>`;
            return span;
          },
        },
      ],
    });

    setEditorState(prev => ({
      ...prev,
      core: editor,
    }));

    return () => editor.destroy();
  }, [setEditorState]);

  return {
    core,
    setEditorState,
  };
}
