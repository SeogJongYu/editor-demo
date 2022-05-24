import {useEffect} from 'react';
import {useRecoilState} from 'recoil';
import Editor, {EditorOptions, Emitter} from '@toast-ui/editor';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import {ExecCommand, ToolbarItemOptions} from '@toast-ui/editor/types/ui';

import {textDecoPopupBody} from '~/common/components/toolbar/textDecoPopupBody';
import listIconPlugin from '~/common/plugin/listIconPlugin';
import {happySvgIcon} from '~/common/components/toolbar/listIconPopupBody';

import underlinePlugin from '../../common/plugin/textDecoPlugin';
import backgroundColorPlugin from '../../common/plugin/backgroundColorPlugin';
import {TUIEditorState} from '../recoil/editorState';

// export function closest(node: Node, found: string | Node) {
//   let condition;

//   if (typeof found === 'string') {
//     condition = (target: Node) => matches(target as Element, found);
//   } else {
//     condition = (target: Node) => target === found;
//   }

//   while (node && node !== document) {
//     if (isElemNode(node) && condition(node)) {
//       return node;
//     }

//     node = node.parentNode!;
//   }

//   return null;
// }

const EDITOR_INIT_OPTIONS: EditorOptions = {
  plugins: [
    colorSyntax,
    backgroundColorPlugin,
    underlinePlugin,
    listIconPlugin,
  ],
  el: document.querySelector('#editor') as HTMLDivElement,
  previewStyle: 'vertical',
  // height: '800px',
  height: '500px',
  // initialEditType: 'markdown',
  initialEditType: 'wysiwyg',
};

const iconListItem: ToolbarItemOptions = {
  name: 'Icon list',
  tooltip: 'Icon list',
  text: '😍',
  className: 'toastui-editor-toolbar-icons',
  style: {backgroundImage: 'none'},
  command: 'iconList',
};

export function useEditor() {
  const [{core}, setEditorState] = useRecoilState(TUIEditorState);

  const sampleContainer = document.createElement('div');

  // 에디터 코어 생성
  useEffect(() => {
    const reWidgetRule = /\[(@\S+)\]\((\S+)\)/;

    const editor = new Editor({
      ...EDITOR_INIT_OPTIONS,
      el: document.querySelector('#editor') as HTMLDivElement,
      toolbarItems: [
        ['heading', 'bold', 'italic', 'strike'],
        ['hr', 'quote'],
        ['ul', 'ol', 'task', 'indent', 'outdent', iconListItem],
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
      customHTMLRenderer: {
        // htmlInline: {
        //   iconList(node, {entering}) {
        //     return entering
        //       ? {type: 'openTag', tagName: 'strong', attributes: node.attrs}
        //       : {type: 'closeTag', tagName: 'strong'};
        //   },
        // },
        // heading(node, context) {
        //   console.log({node, context});
        //   return {
        //     type: context.entering ? 'openTag' : 'closeTag',
        //     tagName: 'p',
        //     //@ts-ignore
        //     classNames: [`heading-'${node?.level}`],
        //   };
        // },
        // iconList(node, context) {
        //   return [
        //     {
        //       type: 'openTag',
        //       tagName: 'h4',
        //     },
        //     {
        //       type: 'closeTag',
        //       tagName: 'h4',
        //     },
        //   ];
        // },
        // iconList(node, context) {
        //   return {
        //     type: context.entering ? 'openTag' : 'closeTag',
        //     tagName: 'div',
        //   };
        // },
      },
    });

    setEditorState(prev => ({
      ...prev,
      core: editor,
    }));
  }, [setEditorState]);

  useEffect(() => {
    if (!core) {
      return;
    }

    core.addCommand(
      'markdown',
      'iconList',
      (payload, state, dispatch, view) => {
        const text = core.getSelectedText();
        // console.log({payload, state, dispatch, view});

        // console.log('text:', text);

        core.replaceSelection(
          `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-settings" width="16" height="16" viewBox="0 0 24 24" stroke-width="1.5" stroke="#9E9E9E" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M10.325 4.317c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756 .426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543 -.826 3.31 -2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756 -2.924 1.756 -3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065z" /><circle cx="12" cy="12" r="3" /></svg>`,
        );
        return true;
      },
    );
    // core.addCommand('markdown', 'iconList', () => {
    //   const text = core.getSelectedText();
    //   core.replaceSelection(`<strong>${text}</strong>`);
    //   return true;
    // });

    // core.on('keyup', (editorType, e) => {
    //   if (e.key === '@') {
    //     const popup = document.createElement('ul');
    //     popup
    //     popup.innerHTML = 'zxczxc';

    //     core.addWidget(popup, 'top');
    //   }
    // });
  }, [core]);

  // useEffect(() => {
  //   if (!core) {
  //     return;
  //   }

  // }, [core]);

  return {
    core,
    setEditorState,
  };
}
