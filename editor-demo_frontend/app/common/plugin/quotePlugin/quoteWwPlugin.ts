//@ts-nocheck
import {Emitter, PluginContext} from '@toast-ui/editor';
import {InputRule} from 'prosemirror-inputrules';
import {Plugin} from 'prosemirror-state';

const arrowRule = new InputRule(/->/g, (state, match, start, end) => {
  console.log({state, match, start, end});
  // console.log(match);
  return null;
});

export const inputArrowPlugin = inputRules({
  rules: [arrowRule],
});

// import 해와도 됨
function inputRules({rules}: {rules: any}) {
  const plugin = new Plugin({
    state: {
      init() {
        return null;
      },
      apply(tr, prev) {
        // console.log({tr, prev});

        const stored = tr.getMeta(this);
        // console.log('stored:', stored);

        if (stored) {
          return stored;
        }
        return tr.selectionSet || tr.docChanged ? null : prev;
      },
    },
    props: {
      handleTextInput(view, from, to, text) {
        // console.log('text input');

        return run(view, from, to, text, rules, plugin);
      },
      handleDOMEvents: {
        compositionend: view => {
          setTimeout(() => {
            const {$cursor} = view.state.selection;
            if ($cursor) {
              run(view, $cursor.pos, $cursor.pos, '', rules, plugin);
            }
          });
        },
        // click: () => {
        //   console.log('click');
        // },
      },
      // handleKeyDown() {
      //   console.log('down@@@');
      // },
      // handleDoubleClick() {
      //   console.log('double click@');
      // },
    },
    isInputRules: true,
  });
  return plugin;
}

const MAX_MATCH = 500;

function run(view, from, to, text, rules, plugin) {
  if (view.composing) {
    return false;
  }
  const state = view.state,
    $from = state.doc.resolve(from);
  if ($from.parent.type.spec.code) {
    return false;
  }
  const textBefore =
    $from.parent.textBetween(
      Math.max(0, $from.parentOffset - MAX_MATCH),
      $from.parentOffset,
      null,
      '\ufffc',
    ) + text;
  for (let i = 0; i < rules.length; i++) {
    const match = rules[i].match.exec(textBefore);
    const tr =
      match &&
      rules[i].handler(
        state,
        match,
        from - (match[0].length - text.length),
        to,
      );
    if (!tr) {
      continue;
    }
    view.dispatch(tr.setMeta(plugin, {transform: tr, from, to, text}));
    return true;
  }
  return false;
}

export function quoteWwPlugin(eventEmitter: Emitter, context: PluginContext) {
  return new context.pmState.Plugin({
    state: {
      init() {
        console.log('init@@@');
        return null;
      },
      apply(tr, set) {
        console.log({tr, set});
        const stored = tr.getMeta(this);
        if (stored) {
          return stored;
        }
      },
    },
    props: {
      handleDoubleClick() {
        console.log('double click@');
      },
    },
  });
}
