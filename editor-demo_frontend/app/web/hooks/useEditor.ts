import {useEffect, useMemo, useRef, useState} from 'react';
import {useRecoilState} from 'recoil';
import Editor, {EditorOptions, Emitter} from '@toast-ui/editor';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
// import customQuote from '@toast-ui/editor-plugin-custom-quote';

import iconListPlugin from '~/common/plugin/iconListPlugin';
// import quotePlugin from '~/common/plugin/quotePlugin/quotePlugin';

import underlinePlugin from '../../common/plugin/textDecoPlugin';
import backgroundColorPlugin from '../../common/plugin/backgroundColorPlugin';
import {TUIEditorState} from '../recoil/editorState';

import customQuote from '../../../../../../fork-lib/tui.editor/plugins/custom-quote/dist/toastui-editor-plugin-custom-quote.js';

const EDITOR_INIT_OPTIONS: EditorOptions = {
  //@ts-ignore
  plugins: [colorSyntax, backgroundColorPlugin, underlinePlugin, customQuote],
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
        ['heading', 'bold', 'italic', 'strike'],
        ['hr', 'quote'],
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
      // customHTMLRenderer: {
      //   htmlBlock: {
      //     //@ts-ignore
      //     iframe(node) {
      //       console.log('node:', node);
      //       return [
      //         {
      //           type: 'openTag',
      //           tagName: 'iframe',
      //           outerNewLine: true,
      //           attributes: node.attrs,
      //         },
      //         {type: 'html', content: node.childrenHTML},
      //         {type: 'closeTag', tagName: 'iframe', outerNewLine: true},
      //       ];
      //     },
      //     //@ts-ignore
      //     svg(node) {
      //       console.log('svgNode:', node);
      //     },
      //   },
      // },
    });

    setEditorState(prev => ({
      ...prev,
      core: editor,
    }));

    return () => editor.destroy();
  }, [setEditorState]);

  useEffect(() => {
    if (!core) {
      return;
    }

    const popup = document.querySelector('.toastui-editor-popup-add-heading');
    console.log('popup:', popup);
  });

  return {
    core,
    setEditorState,
  };
}
