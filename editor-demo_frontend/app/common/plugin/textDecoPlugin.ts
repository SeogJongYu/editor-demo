import type {PluginContext, PluginInfo, I18n} from '@toast-ui/editor';

import {findParentByClassName} from '../utils/dom';
import {addLangs} from '../i18n/langs';

import '../css/plugin.css';
import {textDecoBody} from '../components/toolbar/textDecoPopupBody';

import {PluginOptions} from '~/@types/plugin-options';

const PREFIX = 'toastui-editor-';

function createToolbarItemOption(
  textDecoContainer: HTMLDivElement,
  i18n: I18n,
) {
  return {
    name: 'decoration',
    tooltip: 'Text decoration',
    // tooltip: i18n.get('Text underline'),
    className: `${PREFIX}toolbar-icons text-deco-icon-button`,
    text: 'U',
    popup: {
      className: `${PREFIX}popup-text-deco`,
      body: textDecoContainer,
      style: {width: 'auto'},
    },
  };
}

/**
 * Color syntax plugin
 * @param {Object} context - plugin context for communicating with editor
 * @param {Object} options - options for plugin
 */
export default function textDecoPlugin(
  context: PluginContext,
  options: PluginOptions = {},
): PluginInfo {
  const {eventEmitter, i18n, usageStatistics = true, pmState} = context;
  const container = document.createElement('div');

  container.innerHTML = textDecoBody;

  addLangs(i18n);

  console.log('pmState:', pmState);

  const toolbarItem = createToolbarItemOption(container, i18n);

  container.addEventListener('click', e => {
    if (
      findParentByClassName(e.target as HTMLElement, 'underline-custom-button')
    ) {
      eventEmitter.emit('command', 'underline');
      eventEmitter.emit('closePopup');
    }

    if (
      findParentByClassName(e.target as HTMLElement, 'strike-custom-button')
    ) {
      eventEmitter.emit('command', 'strikeCommand');
      eventEmitter.emit('closePopup');
    }
  });

  return {
    markdownCommands: {
      underline: (item, state, dispatch) => {
        const {tr, selection, schema} = state;
        const {from, to} = selection;

        const attrs = {
          htmlAttrs: {style: 'text-decoration: underline'},
        };

        const mark = schema.marks.span.create(attrs);

        tr.addMark(from, to, mark);

        dispatch(tr);

        return true;
      },
      strikeCommand: (item, state, dispatch) => {
        eventEmitter.emit('command', 'strike');

        return true;
      },
    },
    wysiwygCommands: {
      underline: (item, state, dispatch) => {
        const {tr, selection, schema} = state;
        const {from, to} = selection;

        console.log('schema:', schema);
        console.log('selection:', selection);

        const newSchema = schema.nodes;

        const attrs = {
          htmlAttrs: {style: 'text-decoration: underline'},
        };

        const mark = schema.marks.span.create(attrs);

        tr.addMark(from, to, mark);

        dispatch(tr);

        return true;
      },
      strikeCommand: (item, state, dispatch) => {
        eventEmitter.emit('command', 'strike');

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
