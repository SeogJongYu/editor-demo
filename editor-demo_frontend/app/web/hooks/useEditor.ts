import {useEffect} from 'react';
import {useRecoilState} from 'recoil';
import Editor, {EditorOptions, Emitter} from '@toast-ui/editor';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import {ExecCommand} from '@toast-ui/editor/types/ui';

import {textDecoPopupBody} from '~/common/components/toolbar/textDecoPopupBody';
import listIconPlugin from '~/common/plugin/listIconPlugin';

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
  // previewStyle: 'vertical',
  // height: '800px',
  height: '500px',
  // initialEditType: 'markdown',
  initialEditType: 'wysiwyg',
};

export function useEditor() {
  const [{core}, setEditorState] = useRecoilState(TUIEditorState);

  const sampleContainer = document.createElement('div');
  // 에디터 코어 생성
  useEffect(() => {
    const editor = new Editor({
      ...EDITOR_INIT_OPTIONS,
      el: document.querySelector('#editor') as HTMLDivElement,
      toolbarItems: [
        ['heading', 'bold', 'italic', 'strike'],
        ['hr', 'quote'],
        ['ul', 'ol', 'task', 'indent', 'outdent'],
        ['table', 'image', 'link'],
        ['code', 'codeblock'],
        // [
        //   {
        //     name: 'myItem',
        //     tooltip: 'myItem',
        //     text: '@',
        //     className: 'toastui-editor-toolbar-icons',
        //     // render: () => sampleContainer,
        //     style: {backgroundImage: 'none', color: 'red'},
        //     popup: {
        //       className: 'text-color',
        //       body: textDecoPopupBody(),
        //     },
        //   },
        // ],
      ],
      // customHTMLRenderer: {
      //   htmlBlock: {
      //     heading(node, context) {
      //       console.log('node:', node);
      //       console.log('context:', context);

      //       const strongContent = node?.parent?.type === 'strong';

      //       return {
      //         type: context.entering ? 'openTag' : 'closeTag',
      //         tagName: 'p',
      //         classNames: [`dsadsadsad`],
      //       };
      //     },
      //   },
      // },
    });

    setEditorState(prev => ({
      ...prev,
      core: editor,
    }));
  }, [setEditorState]);

  return {
    core,
    setEditorState,
  };
}
