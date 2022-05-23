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
    wysiwygCommands: {
      listicon: (item, state, dispatch) => {
        console.log('item:', item);
        const {tr, selection, schema} = state;
        const {from, to, $from, $to} = selection;
        console.log('schema:', schema.nodes);
        const range = $from.blockRange($to);
        const nodeType = schema.nodes.listItem;

        // const text = schema.nodes.text.create()
        const text = schema.text('this is');
        console.log('text:', text);

        tr.insert(1, text);

        // console.log('range:', range);
        // const around = range?.parent
        //   .contentMatchAt(range.startIndex)
        //   .findWrapping(nodeType);

        // if (around) {
        //   const outer = around.length ? around[0] : nodeType;
        //   console.log('outer:', outer);

        //   const result = range?.parent.canReplaceWith(
        //     range.startIndex,
        //     range.endIndex,
        //     outer,
        //   )
        //     ? around
        //     : null;

        //   console.log('result:', result);
        // }
        // console.log('around:', around);

        // const attrs = {
        //   htmlAttrs: {style: 'text-decoration: underline'},
        // };
        // const mark = schema.marks.span.create(attrs);
        // tr.addMark(from, to, mark);
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
      htmlInline: {
        span(node: any, {entering}: any) {
          return entering
            ? {type: 'openTag', tagName: 'span'}
            : {type: 'closeTag', tagName: 'span'};
        },
      },
    },
  };
}
