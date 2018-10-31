export {EditorSelection, Plugin,StateField, EditorState, Transaction, Change} from "./codemirror.next/state/src"
export {EditorView} from "./codemirror.next/view/src/"
export {keymap} from "./codemirror.next/keymap/src/keymap"
export {history, redo, redoSelection, undo, undoSelection} from "./codemirror.next/history/src/history"
export {gutter} from "./codemirror.next/gutter/src/index"
export {baseKeymap} from "./codemirror.next/commands/src/commands"
export {matchBrackets} from "./codemirror.next/matchbrackets/src/matchbrackets"
export {specialChars} from "./codemirror.next/special-chars/src/special-chars"
export {multipleSelections} from "./codemirror.next/multiple-selections/src/multiple-selections"
export {legacyMode} from "./codemirror.next/legacy-modes/src/index"

import javascript from "./codemirror.next/legacy-modes/src/javascript"
export {javascript}
