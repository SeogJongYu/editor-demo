import ColorPicker from 'tui-color-picker';
import type {Context} from '@toast-ui/toastmark';
import type {
  PluginContext,
  PluginInfo,
  HTMLMdNode,
  I18n,
} from '@toast-ui/editor';
import type {Transaction, Selection, TextSelection} from 'prosemirror-state';

import {PluginOptions} from '~/@types/plugin-options';

import {findParentByClassName} from '../utils/dom';
import {addLangs} from '../i18n/langs';

import '../css/plugin.css';
import '../css/customPlugin.css';

const PREFIX = 'toastui-editor-';

function createApplyButton(text: string) {
  const button = document.createElement('button');

  button.setAttribute('type', 'button');
  button.textContent = text;

  return button;
}

function createToolbarItemOption(
  colorPickerContainer: HTMLDivElement,
  i18n: I18n,
) {
  return {
    name: 'bgColor',
    tooltip: i18n.get('Text background color'),
    className: `${PREFIX}toolbar-icons bg-color`,
    text: 'BG',
    popup: {
      className: `${PREFIX}popup-color`,
      body: colorPickerContainer,
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

function getCurrentEditorEl(
  colorPickerEl: HTMLElement,
  containerClassName: string,
) {
  const editorDefaultEl = findParentByClassName(
    colorPickerEl,
    `${PREFIX}defaultUI`,
  )!;

  return editorDefaultEl.querySelector<HTMLElement>(
    `.${containerClassName} .ProseMirror`,
  )!;
}

interface ColorPickerOption {
  container: HTMLDivElement;
  preset?: Array<string>;
  usageStatistics: boolean;
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
export default function colorSyntaxPlugin(
  context: PluginContext,
  options: PluginOptions = {},
): PluginInfo {
  const {eventEmitter, i18n, usageStatistics = true, pmState} = context;
  const {preset} = options;
  const container = document.createElement('div');
  const colorPickerOption: ColorPickerOption = {container, usageStatistics};

  addLangs(i18n);

  if (preset) {
    colorPickerOption.preset = preset;
  }

  const colorPicker = ColorPicker.create(colorPickerOption);
  const button = createApplyButton(i18n.get('OK'));

  /**
   * 타입 any 임시박아놓음
   */
  eventEmitter.listen('focus', (editType: any) => {
    containerClassName = `${PREFIX}${
      editType === 'markdown' ? 'md' : 'ww'
    }-container`;
  });

  container.addEventListener('click', ev => {
    if ((ev.target as HTMLElement).getAttribute('type') === 'button') {
      const selectedColor = colorPicker.getColor();

      currentEditorEl = getCurrentEditorEl(container, containerClassName);

      eventEmitter.emit('command', 'bgColor', {selectedColor});
      eventEmitter.emit('closePopup');
      // force the current editor to focus for preventing to lose focus
      currentEditorEl.focus();
    }
  });

  colorPicker.slider.toggle(true);
  container.appendChild(button);

  const toolbarItem = createToolbarItemOption(container, i18n);

  return {
    markdownCommands: {
      bgColor: ({selectedColor}, {tr, selection, schema}, dispatch) => {
        if (selectedColor) {
          const slice = selection.content();
          const textContent = slice.content.textBetween(
            0,
            slice.content.size,
            '\n',
          );
          const openTag = `<span style="background-color: ${selectedColor}">`;
          const closeTag = `</span>`;
          const colored = `${openTag}${textContent}${closeTag}`;

          console.log('schema', schema);
          console.log('@@@:', schema.text(colored));
          
          

          tr.replaceSelectionWith(schema.text(colored)).setSelection(
            createSelection(
              tr,
              selection,
              pmState.TextSelection,
              openTag,
              closeTag,
            ),
          );

          dispatch!(tr);

          return true;
        }
        return false;
      },
    },
    wysiwygCommands: {
      bgColor: ({selectedColor}, state, dispatch) => {
        const {tr, selection, schema} = state;

        console.log('state:', state);
        

        if (selectedColor) {
          const {from, to} = selection;

          const attrs = {
            htmlAttrs: {style: `background-color: ${selectedColor}`},
          };

          console.log('mark:', schema);
          

          const mark = schema.marks.span.create(attrs);

          tr.addMark(from, to, mark);

          tr.addStoredMark(mark);

          dispatch!(tr);

          return true;
        }
        return false;
      },
      // bgColor: ({selectedColor}, {tr, selection, schema}, dispatch) => {
      //   console.log({tr, selection, schema});

      //   if (selectedColor) {
      //     const {from, to} = selection;
      //     console.log({from, to});

      //     const attrs = {
      //       htmlAttrs: {style: `background-color: ${selectedColor}`},
      //     };
      //     console.log('attrs:', attrs);

      //     const mark = schema.marks.span.create(attrs);
      //     console.log('mark:', mark);

      //     tr.addMark(from, to, mark);
      //     dispatch!(tr);

      //     return true;
      //   }
      //   return false;
      // },
    },
    toolbarItems: [
      {
        groupIndex: 0,
        itemIndex: 4,
        item: toolbarItem,
      },
    ],
    toHTMLRenderers: {
      htmlInline: {
        span(node: HTMLMdNode, {entering}: Context) {
          return entering
            ? {type: 'openTag', tagName: 'span', attributes: node.attrs!}
            : {type: 'closeTag', tagName: 'span'};
        },
      },
    },
  };
}
