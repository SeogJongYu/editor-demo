import type {PluginContext, PluginInfo, I18n, Emitter} from '@toast-ui/editor';
import type {Node as ProsemirrorNode} from 'prosemirror-model';
import type {Decoration} from 'prosemirror-view';

import {addLangs} from '../../i18n/langs';

import '../../css/plugin.css';

import {PluginOptions} from '~/@types/plugin-options';

import {happySvgIcon} from '../../components/toolbar/listIconPopupBody';

import isString from 'tui-code-snippet/type/isString';

import {inputArrowPlugin, quoteWwPlugin} from './quoteWwPlugin';

const PREFIX = 'toastui-editor-';

export default function quotePlugin(
  context: PluginContext,
  options: PluginOptions = {},
): PluginInfo {
  const {eventEmitter, i18n, usageStatistics = true, pmState} = context;

  // buttonIcon.classList.add(`${PREFIX}toolbar-icons quote custom-blockquote`);

  addLangs(i18n);

  // eventEmitter.emit('command', 'quotePlugin');

  window.onload = function () {
    const buttonIcon = document.querySelector('.custom-blockquote');
    if (!buttonIcon) {
      return;
    }
    buttonIcon.addEventListener('click', () => {
      const isActive = buttonIcon.classList.contains('active') ? true : false;

      if (isActive) {
        buttonIcon.classList.remove('active');
      } else {
        buttonIcon.classList.add('active');
      }

      eventEmitter.emit('command', 'customQuote', {
        isActive,
      });
    });
  };

  return {
    markdownCommands: {
      customQuote: (payload, state, dispatch) => {
        const {tr, selection, schema, doc} = state;
        eventEmitter.emit('command', 'blockQuote');

        // console.log({state});

        // const node = schema.text(payload.svg);
        // tr.replaceSelectionWith(node);

        // dispatch(tr);

        return true;
      },
    },
    wysiwygCommands: {
      customQuote: ({isActive}, state, dispatch) => {
        const {tr, selection, schema, doc} = state;
        console.log({state});
        console.log('tr:', state.tr);
        // eventEmitter.holdEventInvoke(() => {});
        // console.log('node:', schema.nodes());

        // if (isActive) {
        //   return true;
        // }

        // if (!isActive) {
        //   eventEmitter.emit('command', 'blockQuote');
        //   return true;
        // }

        return true;
      },
    },
    wysiwygPlugins: [() => inputArrowPlugin],
    // wysiwygPlugins: [() => quoteWwPlugin(eventEmitter, context)],
    toolbarItems: [
      {
        groupIndex: 1,
        itemIndex: 2,
        item: {
          name: 'block quote',
          tooltip: i18n.get('Blockquote'),
          className: `${PREFIX}toolbar-icons quote custom-blockquote`,
          // el: buttonIcon,
        },
      },
    ],
  };
}
