import {parse} from 'node-html-parser';
import html from '../../vdom/htm'

const classConfig = {
  strike: 'custom-button strike',
  underline: 'custom-button underline',
};

export function textDecoPopupBody() {
  const container = document.createElement('div');

  const underlineButton = `<div class="${classConfig.underline}"><span class="icon">As</span><span>밑줄</span></div>`;
  const strikeButton = `<div class="${classConfig.strike}"><span class="icon">Aa</span><span>취소선</span></div>`;

  container.innerHTML = `${strikeButton}${underlineButton}`

  return container;
}
const underlineButton = `<div class="${classConfig.underline}"><span class="icon">As</span><span>밑줄</span></div>`;
const strikeButton = `<div class="${classConfig.strike}"><span class="icon">Aa</span><span>취소선</span></div>`;

export const textDecoBody = `${strikeButton}${underlineButton}`;

const PREFIX = 'toastui-editor-';

function createButton(type: 'strike' | 'underline') {
  const button = document.createElement('button');

  button.setAttribute('type', 'button');
  if (type === 'strike') {
    button.setAttribute('class', `strike ${PREFIX}toolbar-icons`);
  } else if (type === 'underline') {
    button.setAttribute('class', `underline ${PREFIX}toolbar-icons`);
  }

  return button;
}
