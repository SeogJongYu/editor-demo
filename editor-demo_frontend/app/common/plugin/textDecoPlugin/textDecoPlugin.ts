import type {PluginContext, PluginInfo} from '@toast-ui/editor';
import {EditorCore} from '@toast-ui/editor';
import type {Transaction, Selection, TextSelection} from 'prosemirror-state';
import {
  // toggleMark,
  liftEmptyBlock,
  selectAll,
  selectNodeBackward,
} from 'prosemirror-commands';
import {DOMSerializer} from 'prosemirror-model';
import {EditorView} from 'prosemirror-view';

import type {PluginOptions} from '~/@types/plugin-options';

import {findParentByClassName} from '../../utils/dom';

import {getContentStyle, toggleMark} from './util';

const PREFIX = 'toastui-editor-';

function createTextDecoPopupBody() {
  const classConfig = {
    strike: 'strike-custom-button',
    underline: 'underline-custom-button',
  };

  const underlineButton = `<li type="underline" class="${classConfig.underline}"><span class="icon">Aa</span><span class="text">밑줄</span></li>`;
  const strikeButton = `<li class="${classConfig.strike}"><span class="icon">Aa</span><span class="text">취소선</span></li>`;
  const textDecoPopupBody = `<ul class="text-deco-popup-ul">${strikeButton}${underlineButton}</ul>`;

  return textDecoPopupBody;
}

function createToolbarItemOption(textDecoContainer: HTMLDivElement) {
  return {
    name: 'decoration',
    tooltip: 'Text decoration',
    className: `${PREFIX}toolbar-icons text-deco-icon-button`,
    popup: {
      className: `${PREFIX}popup-text-deco`,
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

export default function textDecoPlugin(
  context: PluginContext,
  options: PluginOptions = {},
): PluginInfo {
  const {eventEmitter, pmState, pmView} = context;
  const container = document.createElement('div');

  container.innerHTML = createTextDecoPopupBody();

  const toolbarItem = createToolbarItemOption(container);

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
      eventEmitter.emit('command', 'customStrike');
      eventEmitter.emit('closePopup');
    }
  });

  return {
    markdownCommands: {
      underline: (payload, state, dispatch) => {
        const {selection, tr, schema} = state;

        const slice = selection.content();
        const textContent = slice.content.textBetween(
          0,
          slice.content.size,
          '\n',
        );
        const openTag = `<span style="text-decoration: underline">`;
        const closeTag = `</span>`;
        const text = `${openTag}${textContent}${closeTag}`;

        tr.replaceSelectionWith(schema.text(text)).setSelection(
          createSelection(
            tr,
            selection,
            pmState.TextSelection,
            openTag,
            closeTag,
          ),
        );

        dispatch(tr);

        return true;
      },
      customStrike: () => {
        eventEmitter.emit('command', 'strike');

        return true;
      },
    },
    wysiwygCommands: {
      underline: (payload, state, dispatch) => {
        const contentHTML = DOMSerializer.fromSchema(
          state.schema,
        ).serializeFragment(state.doc.content);
        const contentStyle =
          contentHTML.querySelector('span')?.getAttribute('style') ?? '';

        const attrs = {
          htmlAttrs: {
            style: `text-decoration: underline; ${contentStyle}`,
          },
        };
        const mark = state.schema.marks.span.create(attrs);

        toggleMark(mark.type, mark.attrs)(state, dispatch);
        eventEmitter.emit('focus', 'wysiwyg');
        // dispatch(state.tr.addStoredMark(mark));
        return true;
      },
      customStrike: (payload, state, dispatch) => {
        console.log('state:', state);

        const fragment = DOMSerializer.fromSchema(
          state.schema,
        ).serializeFragment(state.doc.content);

        const span = fragment.querySelector('span');

        const fragmentStyle =
          fragment.querySelector('span')?.getAttribute('style') ?? '';

        const all = window.getComputedStyle(
          span as HTMLSpanElement,
        ).backgroundColor;
        const addedStyle = getContentStyle(state);

        // console.log('addedStyle:', addedStyle);
        // console.log('all:', all);

        const hasMark = state.doc.rangeHasMark(
          state.selection.from,
          state.selection.to,
          state.schema.marks.span,
        );

        // console.log({hasMark});

        state.doc.nodesBetween(
          state.selection.from,
          state.selection.to,
          (node, position) => {
            console.log({node, position});
          },
        );

        // const mark = state.doc.mark(state.schema.marks);

        // eventEmitter.emit('command', 'strike');

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
  };
}
