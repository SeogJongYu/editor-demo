import type {Emitter, I18n, PluginContext, PluginInfo} from '@toast-ui/editor';
import {ExecCommand} from '@toast-ui/editor/types/ui';
import {Component} from 'react';

import {PluginOptions} from '~/@types/plugin-options';
import {findParentByClassName} from '~/common/utils/dom';

import headingPopupBody from './headingPopupBody';

const PREFIX = 'toastui-editor-';

function createToolbarItemOption(popupContainer: HTMLDivElement, i18n: I18n) {
  return {
    name: 'headings',
    tooltip: 'Headings',
    className: `${PREFIX}toolbar-icons custom headings`,
    // text: 'H',
    popup: {
      className: `${PREFIX}popup-add-heading`,
      body: popupContainer,
      style: {width: 'auto'},
    },
  };
}

export default function headingPlugin(
  context: PluginContext,
  options: PluginOptions = {},
): PluginInfo {
  const {eventEmitter, i18n, pmState} = context;

  const container = document.createElement('div');

  const innerContainer =
    '<ul><li>제목 1</li><li>제목 2</li><li>제목 3</li></ul>';
  container.innerHTML = innerContainer;

  const toolbarItem = createToolbarItemOption(container, i18n);
  return {
    markdownCommands: {},
    wysiwygCommands: {},
    toHTMLRenderers: {},
    toolbarItems: [
      {
        groupIndex: 0,
        itemIndex: 0,
        item: toolbarItem,
      },
    ],
  };
}
