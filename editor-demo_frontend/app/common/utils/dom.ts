function hasClass(element: HTMLElement, className: string) {
  return element.classList.contains(className);
}

/**
 * el요소가 className의 class를 가지고있지 않다면 el의 부모요소 반환
 * className이 존재하면 el 반환
 */
export function findParentByClassName(el: HTMLElement, className: string) {
  let currentEl: HTMLElement | null = el;

  while (currentEl && !hasClass(currentEl, className)) {
    currentEl = currentEl.parentElement;
  }

  return currentEl;
}
