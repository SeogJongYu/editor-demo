import type {PluginContext, PluginInfo} from '@toast-ui/editor';
import type {Transaction, Selection, TextSelection} from 'prosemirror-state';
import {toggleMark} from 'prosemirror-commands';

import type {PluginOptions} from '~/@types/plugin-options';

import {findParentByClassName} from '../../utils/dom';

import {textDecoPopupBody} from './textDecoPopupBody';

const PREFIX = 'toastui-editor-';

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
  const container = document.createElement('div');

  container.innerHTML = textDecoPopupBody;

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
      eventEmitter.emit('command', 'strikeCommand');
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
      strikeCommand: () => {
        eventEmitter.emit('command', 'strike');

        return true;
      },
    },
    wysiwygCommands: {
      underline: (payload, state, dispatch) => {
        const attrs = {
          htmlAttrs: {style: 'text-decoration: underline'},
        };

        const mark = state.schema.marks.span.create(attrs);

        toggleMark(mark.type, mark.attrs)(state, dispatch);

        return true;
      },
      strikeCommand: () => {
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
  };
}
