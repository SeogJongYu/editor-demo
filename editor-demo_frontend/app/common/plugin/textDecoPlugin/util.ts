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
 bgColor가 있을때 그냥 색상만 바꿔주기
 underline은 뺐다 없앴다 해줘야함
 rangeHasMark = true 일 경우 그냥 addMark 해주고
 false일 경우 attr만 변경해줌

 만약 같은 스타일이 들어오면 해당 스타일만 제거해줌
 */

export function toggleMark(
  markType: MarkType,
  attrs: Attrs | null = null,
): Command {
  return function (state, dispatch) {
    const {empty, $cursor, ranges} = state.selection as TextSelection;

    console.log('ranges:', ranges);

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
        dispatch(state.tr.addStoredMark(markType.create(attrs)));
      }
    } else {
      let has = false;
      const tr = state.tr;

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
        console.log({spaceStart, spaceEnd});

        if (from + spaceStart < to) {
          from += spaceStart;
          to -= spaceEnd;
        }
        tr.addMark(from, to, markType.create(attrs));

        // if (has) {
        //   tr.removeMark($from.pos, $to.pos, markType);
        // } else {
        //   let from = $from.pos;
        //   let to = $to.pos;
        //   const start = $from.nodeAfter;
        //   const end = $to.nodeBefore;
        //   const spaceStart =
        //     start && start.isText ? /^\s*/.exec(start.text!)![0].length : 0;
        //   const spaceEnd =
        //     end && end.isText ? /\s*$/.exec(end.text!)![0].length : 0;
        //   if (from + spaceStart < to) {
        //     from += spaceStart;
        //     to -= spaceEnd;
        //   }
        //   tr.addMark(from, to, markType.create(attrs));
        // }
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

/**
 * span 태그로 감싸진 콘텐츠의 Style Attribute를 가져옴.
 */
export function getContentStyle(state: EditorState): string {
  const fragment = DOMSerializer.fromSchema(state.schema).serializeFragment(
    state.doc.content,
  );
  const fragmentStyle =
    fragment.querySelector('span')?.getAttribute('style') ?? '';
  console.log('#####', fragment.querySelector('span')?.style);

  return fragmentStyle;
}
