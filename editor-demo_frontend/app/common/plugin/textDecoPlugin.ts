import type {Context} from '@toast-ui/toastmark';
import type {
  PluginContext,
  PluginInfo,
  HTMLMdNode,
  I18n,
} from '@toast-ui/editor';
// import type {
//   Transaction,
//   Selection,
//   TextSelection,
// } from '@types/prosemirror-state';
// import {PluginOptions} from '@t/index';
import {Selection, TextSelection, Transaction} from 'prosemirror-state';
import {PluginOptions} from '@toast-ui/editor-plugin-color-syntax';

import {findParentByClassName} from '../utils/dom';
import {addLangs} from '../i18n/langs';

import '../css/plugin.css';
import {textDecoBody, textDecoPopupBody} from '../components/toolbar/textDecoPopupBody';
import { useEffect } from 'react';

const PREFIX = 'toastui-editor-';

function createToolbarItemOption(
  textDecoContainer: HTMLDivElement,
  i18n: I18n,
) {
  return {
    name: 'underline',
    tooltip: i18n.get('Text underline'),
    className: `${PREFIX}toolbar-icons underline`,
    text: 'U',
    popup: {
      className: `${PREFIX}popup-textdeco`,
      body: textDecoContainer,
      style: {width: 'auto'},
    },
  };
}

function createSelection(
  tr: Transaction,
  selection: Selection,
  SelectionClass: typeof TextSelection,
  openTag: string,
  closeTag: string,
) {
  const {mapping, doc} = tr;
  const {from, to, empty} = selection;
  const mappedFrom = mapping.map(from) + openTag.length;
  const mappedTo = mapping.map(to) - closeTag.length;

  return empty
    ? SelectionClass.create(doc, mappedTo, mappedTo)
    : SelectionClass.create(doc, mappedFrom, mappedTo);
}

let containerClassName: string;
let currentEditorEl: HTMLElement;

// @TODO: add custom syntax for plugin
/**
 * Color syntax plugin
 * @param {Object} context - plugin context for communicating with editor
 * @param {Object} options - options for plugin
 * @param {Array.<string>} [options.preset] - preset for color palette (ex: ['#181818', '#292929'])
 * @param {boolean} [options.useCustomSyntax=false] - whether use custom syntax or not
 */
export default function textDecoPlugin(
  context: PluginContext,
  options: PluginOptions = {},
): PluginInfo {
  const {eventEmitter, i18n, usageStatistics = true, pmState} = context;
  const {preset} = options;
  const container = document.createElement('div');

  container.innerHTML = textDecoBody;

  addLangs(i18n);

  const toolbarItem = createToolbarItemOption(container, i18n);

  container.addEventListener('click', e => {
    // console.log('click!', e)
    if ((e.target as HTMLElement).classList.contains('underline')) {
      eventEmitter.emit('command', 'underline')
      eventEmitter.emit('closePopup');
      console.log('underline');
      
    } else if ((e.target as HTMLElement).classList.contains('strike')) {
      eventEmitter.emit('command', 'strike')
      eventEmitter.emit('closePopup');
      console.log('cancel line');
      
    }
  })

  return {
    markdownCommands: {},
    wysiwygCommands: {
      underline: (item, state, dispatch) => {
        const {tr, selection, schema} = state;
        const {from, to} = selection;

        const attrs = {
          htmlAttrs: {style: 'text-decoration: underline'}
        };

        const mark = schema.marks.span.create(attrs);

        tr.addMark(from, to, mark);

        dispatch(tr);

        return true;
      },
      strike: (item, state, dispatch) => {
        const {tr, selection, schema} = state;
        const {from, to} = selection;

        const attrs = {
          htmlAttrs: {style: 'text-decoration: line-through'}
        };

        const mark = schema.marks.span.create(attrs);

        tr.addMark(from, to, mark);

        dispatch(tr);

        return true;
      },
    },
    toolbarItems: [
      {
        groupIndex: 0,
        itemIndex: 6,
        item: toolbarItem,
      },
    ],
    toHTMLRenderers: {},
  };
}
