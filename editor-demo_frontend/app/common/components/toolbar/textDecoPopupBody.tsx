import {parse} from 'node-html-parser';

const classConfig = {
  strike: 'strike toastui-editor-toolbar-icons',
  underline: 'underline toastui-editor-toolbar-icons',
};

export function textDecoPopupBody() {
  // const container = document.createElement('div');
  // container.innerHTML = 'dfdadaf';

  // const textColorButton = document.createElement('button');
  // textColorButton.setAttribute('class', 'custom button');
  // textColorButton.innerHTML = 'A';

  const strikeButton = `<button type="button" class="${classConfig.strike}">S</button>`;
  const underlineButton = `<button type="button" class="${classConfig.underline}">S</button>`;

  // container.appendChild(textColorButton);

  const container = `<div>${strikeButton}${underlineButton}</div>`;

  //@ts-ignore
  const result = parse(container) as HTMLDivElement;

  // console.log('root:', root);

  return result;
}

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
