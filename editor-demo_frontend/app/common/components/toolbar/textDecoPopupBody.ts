import {parse} from 'node-html-parser';

import html from '../../vdom/htm';

const classConfig = {
  strike: 'strike-custom-button',
  underline: 'underline-custom-button',
};

// export function textDecoPopupBody() {
//   const container = document.createElement('div');

//   const underlineButton = `<div class="${classConfig.underline}"><span class="icon">As</span><span>밑줄</span></div>`;
//   const strikeButton = `<div class="${classConfig.strike}"><span class="icon">Aa</span><span>취소선</span></div>`;

//   container.innerHTML = `${strikeButton}${underlineButton}`;

//   return container;
// }

const underlineButton = `<li type="underline" class="${classConfig.underline}"><span class="icon">Aa</span><span class="text">밑줄</span></li>`;
const strikeButton = `<li class="${classConfig.strike}"><span class="icon">Aa</span><span class="text">취소선</span></li>`;

export const textDecoBody = `<ul class="text-deco-custom-ul">${strikeButton}${underlineButton}</ul>`;
