import type {PluginContext, PluginInfo, I18n} from '@toast-ui/editor';

import {findParentByClassName} from '../utils/dom';
import {addLangs} from '../i18n/langs';

import '../css/plugin.css';
import {textDecoBody} from '../components/toolbar/textDecoPopupBody';

import {PluginOptions} from '~/@types/plugin-options';

import {
  happySvgIcon,
  listIconPopupBody,
  svgIcon,
} from '../components/toolbar/listIconPopupBody';

const PREFIX = 'toastui-editor-';

function createToolbarItemOption(container: HTMLDivElement, i18n: I18n) {
  return {
    name: 'underline',
    tooltip: i18n.get('List icon'),
    className: `${PREFIX}toolbar-icons underline`,
    text: '😊',
    popup: {
      className: `${PREFIX}popup-textdeco`,
      body: container,
      style: {width: 'auto'},
    },
  };
}

/**
 * Color syntax plugin
 * @param {Object} context - plugin context for communicating with editor
 * @param {Object} options - options for plugin
 */
export default function listIconPlugin(
  context: PluginContext,
  options: PluginOptions = {},
): PluginInfo {
  const {eventEmitter, i18n, usageStatistics = true, pmState} = context;
  const container = document.createElement('div');

  // console.log('context:', context);

  container.innerHTML = happySvgIcon;

  addLangs(i18n);

  const toolbarItem = createToolbarItemOption(container, i18n);

  container.addEventListener('click', e => {
    // console.log('click@', e.target as HTMLElement);
    eventEmitter.emit('command', 'listicon', e.target as HTMLElement);
    eventEmitter.emit('closePopup');
  });

  return {
    markdownCommands: {},
    // wysiwygCommands: {
    //   listicon: (item, state, dispatch) => {
    //     console.log('item:', item);
    //     const {tr, selection, schema} = state;
    //     const {from, to, $from, $to} = selection;
    //     console.log('schema:', schema.nodes);
    //     const range = $from.blockRange($to);
    //     const nodeType = schema.nodes.listItem;

    //     tr.insertText(item, to, to);
    //     dispatch(tr);

    //     return true;
    //   },
    // },
    wysiwygCommands: {
      listicon: (item, state, dispatch) => {
        const {tr, selection, schema} = state;
        const {from, to, $from, $to} = selection;
        const img = new Image(40, 40);
        img.src =
          'https://i.picsum.photos/id/270/200/300.jpg?hmac=To24fO6lmJwfKPyA9r3T_t07xLNZz3q_weS3ISynEGg';

        // const attr = {
        //   attrs: {
        //     style: {
        //       default: null,
        //     },
        //     xmlns: {
        //       default: null,
        //     },
        //     viewBox: {
        //       default: null,
        //     },
        //   },
        //   content: 'block*',
        //   group: 'block',
        //   draggable: false,
        //   parseDOM: [
        //     {
        //       tag: 'svg',
        //       getAttrs: dom => {
        //         const allowed = {};
        //         for (let i = 0; i < dom.attributes.length; i++) {
        //           const attrib = dom.attributes[i];
        //           allowed[attrib.name] = attrib.value;
        //         }
        //         return allowed;
        //       },
        //     },
        //   ],
        //   toDOM: node => ['svg', node.attrs, 0],
        // };

        // tr.addMark(from, to + 1, img);
        // dispatch(tr);
        return true;
      },
    },
    toolbarItems: [
      {
        groupIndex: 2,
        itemIndex: 2,
        item: toolbarItem,
      },
    ],
    toHTMLRenderers: {
      // htmlInline: {
      //   span(node: any, {entering}: any) {
      //     return entering
      //       ? {type: 'openTag', tagName: 'span'}
      //       : {type: 'closeTag', tagName: 'span'};
      //   },
      // },
      listIcon() {
        return [
          {
            type: 'openTag',
            tagName: 'div',
            outerNewLine: true,
            // attributes: { 'data-chart-id': id },
          },
          {type: 'closeTag', tagName: 'div', outerNewLine: true},
        ];
      },
    },
  };
}
