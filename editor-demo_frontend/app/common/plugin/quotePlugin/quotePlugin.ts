import type {PluginContext, PluginInfo} from '@toast-ui/editor';
import {wrapIn, lift} from 'prosemirror-commands';

import {PluginOptions} from '~/@types/plugin-options';

import {addLangs} from '../../i18n/langs';
import '../../css/plugin.css';

const PREFIX = 'toastui-editor-';

export default function quotePlugin(
  context: PluginContext,
  options: PluginOptions = {},
): PluginInfo {
  const {eventEmitter, i18n} = context;
  const {groupIndex, itemIndex} = options;

  const toolbarItemIndex =
    groupIndex && itemIndex
      ? {groupIndex, itemIndex}
      : {
          groupIndex: 1,
          itemIndex: 1,
        };

  addLangs(i18n);

  window.onload = function () {
    const buttonIcon = document.querySelector('.custom-blockquote');
    if (!buttonIcon) {
      return;
    }

    // toolbarItems의 state에서 active 클래스네임 관리
    buttonIcon.addEventListener('click', () => {
      const isActive = buttonIcon.classList.contains('active');

      if (isActive) {
        eventEmitter.emit('command', 'customQuoteBack');
      } else {
        eventEmitter.emit('command', 'customQuote');
      }
    });
  };

  return {
    markdownCommands: {
      customQuote: () => {
        eventEmitter.emit('command', 'blockQuote');
        return true;
      },
      customQuoteBack: () => {
        eventEmitter.emit('command', 'blockQuote');
        return true;
      },
    },
    wysiwygCommands: {
      customQuote: (payload, state, dispatch) => {
        wrapIn(state.schema.nodes.blockQuote)(state, dispatch);

        return true;
      },
      customQuoteBack: (payload, state, dispatch) => {
        lift(state, dispatch);

        return true;
      },
    },
    toolbarItems: [
      {
        ...toolbarItemIndex,
        item: {
          name: 'blockQuote',
          tooltip: i18n.get('Blockquote'),
          className: `${PREFIX}toolbar-icons custom-blockquote`,
          state: 'blockQuote',
        },
      },
    ],
  };
}
