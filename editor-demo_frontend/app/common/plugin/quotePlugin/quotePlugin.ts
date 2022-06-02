import type {PluginContext, PluginInfo, I18n, Emitter} from '@toast-ui/editor';
import Editor from '@toast-ui/editor';
import isString from 'tui-code-snippet/type/isString';
import {findWrapping} from 'prosemirror-transform';
import {EditorView} from 'prosemirror-view';

import {PluginOptions} from '~/@types/plugin-options';

import {addLangs} from '../../i18n/langs';
import '../../css/plugin.css';
import {happySvgIcon} from '../../components/toolbar/listIconPopupBody';

import {inputArrowPlugin, quoteWwPlugin} from './quoteWwPlugin';

const PREFIX = 'toastui-editor-';

export default function quotePlugin(
  context: PluginContext,
  options: PluginOptions = {},
): PluginInfo {
  const {eventEmitter, i18n, usageStatistics = true, pmState, pmView} = context;

  console.log('context:', context);
  console.log('pmView:', pmView);
  //@ts-ignore
  console.log('EditorView:', EditorView.focus);

  // buttonIcon.classList.add(`${PREFIX}toolbar-icons quote custom-blockquote`);

  addLangs(i18n);

  // eventEmitter.emit('command', 'quotePlugin');

  window.onload = function () {
    const buttonIcon = document.querySelector('.custom-blockquote');
    if (!buttonIcon) {
      return;
    }

    buttonIcon.addEventListener('click', () => {
      const isActive = buttonIcon.classList.contains('active');

      if (isActive) {
        buttonIcon.classList.remove('active');
        eventEmitter.emit('command', 'customQuoteBack');
      } else {
        buttonIcon.classList.add('active');
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
        const {tr, selection, schema} = state;
        console.log({tr, selection, schema});
        console.log('state:', state);

        console.log('selection:', selection);

        const {from, to, $anchor, ranges, $from, $to} = state.selection;

        const firstPos = $anchor.pos - $anchor.parentOffset;
        const lastPos = $anchor.parent.content.size + 1;

        console.table({firstPos, lastPos});

        const node = schema.nodes.blockQuote.create(
          undefined,
          schema.text($anchor.parent.textContent),
        );

        tr.replaceRangeWith(firstPos, lastPos, node);

        // const range = $from.blockRange($to);
        // const wrapping = range && findWrapping(range, schema.nodes.blockquote);

        // console.log('wrapping:', wrapping);

        // const parent = range?.parent;
        // // tr.block
        // const around =
        //   range &&
        //   parent
        //     ?.contentMatchAt(range?.startIndex)
        //     .findWrapping(schema.nodes.blockquote);

        // console.log('range:', range);
        // console.log('around:', around);

        //@ts-ignore
        // tr.wrap(range, {
        //   type: schema.nodes.blockquote,
        // });

        // const attrs = {htmlAttrs: {class: 'custom-quote'}};
        // const mark = schema.marks.span.create(attrs);

        // tr.addMark(firstPos, lastPos, mark);
        dispatch(tr);

        return true;
      },
      customQuoteBack: (payload, state, dispatch) => {
        const {tr, selection, schema} = state;

        //@ts-ignore
        const {from, to, $cursor, $anchor} = selection;

        console.log('cursor:', $cursor);

        const firstPos = $anchor.pos - $anchor.parentOffset;
        const lastPos = $anchor.parent.content.size + 1;

        // console.log('state inactive:', state);
        // console.log('dispatch inactive:', dispatch);
        // const node = schema.nodes.bulletList.create(
        //   undefined,
        //   schema.text($anchor.parent.textContent),
        // );

        tr.deleteRange(firstPos, lastPos);

        // const attrs = {htmlAttrs: {class: 'custom-quote-none'}};
        // const mark = schema.marks.span.create(attrs);

        // tr.removeMark(1, to, schema.marks.span);
        dispatch(tr);

        // eventEmitter.emit('focus');

        // toggleMark(schema.marks.span, attrs)(state, dispatch);
        // const { $from, $to } = selection;
        // const range = $from.blockRange($to);

        // console.log('range:', range);

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
          className: `${PREFIX}toolbar-icons custom-blockquote`,
          // el: buttonIcon,
        },
      },
    ],
  };
}
