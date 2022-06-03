const classConfig = {
  strike: 'strike-custom-button',
  underline: 'underline-custom-button',
};

const underlineButton = `<li type="underline" class="${classConfig.underline}"><span class="icon">Aa</span><span class="text">밑줄</span></li>`;
const strikeButton = `<li class="${classConfig.strike}"><span class="icon">Aa</span><span class="text">취소선</span></li>`;

export const textDecoPopupBody = `<ul class="text-deco-custom-ul">${strikeButton}${underlineButton}</ul>`;
