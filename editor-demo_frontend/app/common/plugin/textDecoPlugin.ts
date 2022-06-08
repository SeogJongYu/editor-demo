import type {PluginContext, PluginInfo} from '@toast-ui/editor';
import type {Transaction, Selection, TextSelection} from 'prosemirror-state';

import type {PluginOptions} from '~/@types/plugin-options';

import {findParentByClassName, toggleSpanMark} from './util';

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
  const {eventEmitter, pmState} = context;
  const {groupIndex, itemIndex} = options;

  const toolbarItemIndex =
    groupIndex && itemIndex
      ? {groupIndex, itemIndex}
      : {
          groupIndex: 0,
          itemIndex: 5,
        };

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
        const markAttrsObj = {
          'text-decoration': 'underline',
        };

        toggleSpanMark(state.schema.marks['span'], markAttrsObj)(
          state,
          dispatch,
        );
        return true;
      },
      customStrike: () => {
        eventEmitter.emit('command', 'strike');

        return true;
      },
    },
    toolbarItems: [
      {
        ...toolbarItemIndex,
        item: toolbarItem,
      },
    ],
  };
}
