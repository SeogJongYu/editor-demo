import type {PluginContext, PluginInfo, I18n} from '@toast-ui/editor';

import {addLangs} from '../i18n/langs';

import '../css/plugin.css';

import {PluginOptions} from '~/@types/plugin-options';

import {happySvgIcon} from '../components/toolbar/listIconPopupBody';

const PREFIX = 'toastui-editor-';

function createToolbarItemOption(container: HTMLDivElement, i18n: I18n) {
  return {
    name: 'listicon',
    tooltip: i18n.get('List icon'),
    className: `${PREFIX}toolbar-icons listicon`,
    text: '😊',
    popup: {
      className: `${PREFIX}popup-textdeco`,
      body: container,
      style: {width: 'auto'},
    },
  };
}

export default function iconListPlugin(
  context: PluginContext,
  options: PluginOptions = {},
): PluginInfo {
  const {eventEmitter, i18n, usageStatistics = true, pmState} = context;
  const container = document.createElement('div');

  container.innerHTML = happySvgIcon;

  addLangs(i18n);

  const toolbarItem = createToolbarItemOption(container, i18n);

  container.addEventListener('click', e => {
    const target = e.currentTarget as HTMLElement;

    eventEmitter.emit('command', 'listicon', {
      svg: target.firstChild as SVGElement,
    });
    eventEmitter.emit('closePopup');
  });

  return {
    markdownCommands: {
      listicon: (payload, {tr, selection, schema}, dispatch) => {
        eventEmitter.emit('command', 'bulletList');

        // const node = schema.text(payload.svg);
        // tr.replaceSelectionWith(node);

        // dispatch(tr);

        return true;
      },
    },
    wysiwygCommands: {
      listicon: (item, state, dispatch) => {
        eventEmitter.emit('command', 'bulletList');

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
      list(node, context) {
        return {
          type: context.entering ? 'openTag' : 'closeTag',
          tagName: 'ul',
          classNames: ['custom-icon-ul'],
        };
      },
    },
  };
}
