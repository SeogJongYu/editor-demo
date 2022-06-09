import type {Attrs, MarkType, Node, NodeType} from 'prosemirror-model';
import {DOMSerializer} from 'prosemirror-model';
import {
  Command,
  EditorState,
  SelectionRange,
  TextSelection,
} from 'prosemirror-state';
import {findWrapping} from 'prosemirror-transform';

function markApplies(
  doc: Node,
  ranges: readonly SelectionRange[],
  type: MarkType,
) {
  for (let i = 0; i < ranges.length; i++) {
    const {$from, $to} = ranges[i];
    let can = $from.depth == 0 ? doc.type.allowsMarkType(type) : false;
    doc.nodesBetween($from.pos, $to.pos, node => {
      if (can) {
        return false;
      }
      can = node.inlineContent && node.type.allowsMarkType(type);
    });
    if (can) {
      return true;
    }
  }
  return false;
}

/**
 * @param markType Span mark type
 * @param attrs obj형태 css 속성
 * span Mark에서 스타일 속성을 토글하는 이벤트 함수
 */
export function toggleSpanMark(
  markType: MarkType,
  attrs: Attrs | null = null,
): Command {
  return function (state, dispatch) {
    const {empty, $cursor, ranges} = state.selection as TextSelection;

    const markAttrs = {
      htmlAttrs: {
        style: convertCssObjToStr(attrs ?? {}),
      },
      htmlInline: true,
    };

    if ((empty && !$cursor) || !markApplies(state.doc, ranges, markType)) {
      return false;
    }

    if (!dispatch) {
      return false;
    }

    if ($cursor) {
      if (markType.isInSet(state.storedMarks || $cursor.marks())) {
        dispatch(state.tr.removeStoredMark(markType));
      } else {
        dispatch(state.tr.addStoredMark(markType.create(markAttrs)));
      }
    } else {
      let has = false;
      const tr = state.tr;
      // 이전에 이미 추가된 htmlAttrs style이 있는지 체크
      let prevCssObj: Record<string, string>;

      const {selection} = state;
      const {$from, $to} = selection;

      let textNodeCount = 0; // selection안에서 TextNode의 갯수

      state.doc.nodesBetween($from.pos, $to.pos, node => {
        if (node.type.name === 'text') {
          textNodeCount++;
        }
      });

      if (textNodeCount !== 1) {
        prevCssObj = {};
      } else {
        prevCssObj = getMarkStyleFromStart(state).cssObj;
      }

      console.log('prevCssObj:', prevCssObj);

      let newCssObj: Record<string, string> = {};

      for (let i = 0; !has && i < ranges.length; i++) {
        const {$from, $to} = ranges[i];
        has = state.doc.rangeHasMark($from.pos, $to.pos, markType);
      }

      for (let i = 0; i < ranges.length; i++) {
        const {$from, $to} = ranges[i];

        let from = $from.pos;
        let to = $to.pos;

        const start = $from.nodeAfter;
        const end = $to.nodeBefore;
        const spaceStart =
          start && start.isText ? /^\s*/.exec(start.text!)![0].length : 0;
        const spaceEnd =
          end && end.isText ? /\s*$/.exec(end.text!)![0].length : 0;

        if (from + spaceStart < to) {
          from += spaceStart;
          to -= spaceEnd;
        }

        if (Object.keys(prevCssObj).length === 0) {
          // 이전에 Span 마크로 추가된 스타일이 없을때
          tr.addMark(from, to, markType.create(markAttrs));
        }

        if (Object.keys(prevCssObj).length !== 0) {
          // 이전에 Span 마크로 추가된 스타일이 있을때

          for (const [prevKey, prevValue] of Object.entries(prevCssObj)) {
            if (!attrs?.[prevKey]) {
              // 전달받은 attrs에 이전 key가 없을 때
              newCssObj = {...prevCssObj, ...attrs};
              markAttrs.htmlAttrs.style = convertCssObjToStr(newCssObj);

              tr.addMark(from, to, markType.create(markAttrs));
            } else {
              if (attrs?.[prevKey] === prevValue) {
                // 전달받은 attrs과 같은 key가 있고, value도 같을 때
                if (Object.keys(prevCssObj).length === 1) {
                  // Style 속성이 하나만 있으면 Span Mark 제거
                  tr.removeMark(from, to, markType);
                }

                if (Object.keys(prevCssObj).length > 1) {
                  // Style 속성이 2개 이상이면 Span Mark의 해당 attr만 제거후 add Mark
                  newCssObj = {...prevCssObj};
                  delete newCssObj[prevKey];
                  markAttrs.htmlAttrs.style = convertCssObjToStr(newCssObj);

                  tr.removeMark(from, to, markType);
                  tr.addMark(from, to, markType.create(markAttrs));
                }
              }

              if (attrs?.[prevKey] !== prevValue) {
                // 전달받은 attrs과 같은 key가 있고, value는 다를 때
                newCssObj = {...prevCssObj};
                newCssObj[prevKey] = attrs[prevKey];
                markAttrs.htmlAttrs.style = convertCssObjToStr(newCssObj);

                tr.addMark(from, to, markType.create(markAttrs));
              }
            }
          }
        }
      }
      dispatch(tr.scrollIntoView());
    }
    return true;
  };
}

export function wrapIn(
  nodeType: NodeType,
  attrs: Attrs | null = null,
): Command {
  return function (state, dispatch) {
    const {$from, $to} = state.selection;
    const range = $from.blockRange($to);
    const wrapping = range && findWrapping(range, nodeType, attrs);
    if (!wrapping) {
      return false;
    }
    if (dispatch) {
      dispatch(state.tr.wrap(range!, wrapping).scrollIntoView());
    }
    return true;
  };
}

interface ContentStyle {
  cssText: string;
  cssObj: Attrs;
}

/**
 * span 태그로 감싸진 콘텐츠의 Style Attribute를 가져옴.
 */
export function getContentStyle(state: EditorState): ContentStyle {
  const fragment = DOMSerializer.fromSchema(state.schema).serializeFragment(
    state.doc.content,
  );
  const cssText = fragment.querySelector('span')?.getAttribute('style') ?? '';
  const cssObj = convertCssStrToObj(cssText) ?? {};

  return {
    cssText,
    cssObj,
  };
}

/**
 * Selection의 from position 바로 뒤에 있는 노드 Mark의 스타일을 가져옴
 */
export function getMarkStyleFromStart(state: EditorState): ContentStyle {
  const {selection} = state;

  const nodeAtFrom = state.doc.nodeAt(selection.from);
  const mark = nodeAtFrom?.marks ?? [];
  const markHtmlAttrStyle = mark?.[0]?.attrs?.htmlAttrs?.style ?? '';

  return {
    cssText: markHtmlAttrStyle,
    cssObj: convertCssStrToObj(markHtmlAttrStyle),
  };
}

export function convertCssObjToStr(cssObj: Attrs = {}) {
  const attrsArr = Object.entries(cssObj);
  const cssText = attrsArr.map(([key, value]) => `${key}: ${value}`).join('; ');

  return cssText;
}

export function convertCssStrToObj(cssText: string) {
  const regex = /([\w-]*)\s*:\s*([^;]*)/g;
  let match;
  const properties: Record<string, string> = {};
  while ((match = regex.exec(cssText))) {
    properties[match[1]] = match[2].trim();
  }

  return properties;
}

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
