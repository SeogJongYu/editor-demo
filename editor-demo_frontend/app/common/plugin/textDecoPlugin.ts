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

// import './css/plugin.css';
import '../css/plugin.css';
import {textDecoPopupBody} from '../components/toolbar/textDecoPopupBody';

const PREFIX = 'toastui-editor-';

function createButton(type: 'strike' | 'underline') {
  const button = document.createElement('button');

  button.setAttribute('type', 'button');
  if (type === 'strike') {
    button.setAttribute('class', `strike ${PREFIX}toolbar-icons`);
  } else if (type === 'underline') {
    button.setAttribute('class', `underline ${PREFIX}toolbar-icons`);
  }

  return button;
}

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

  addLangs(i18n);

  const strikeButton = createButton('strike');
  const underlineButton = createButton('underline');

  const toolbarItem = createToolbarItemOption(textDecoPopupBody(), i18n);

  container.appendChild(strikeButton);
  container.appendChild(underlineButton);

  return {
    markdownCommands: {},
    wysiwygCommands: {},
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
