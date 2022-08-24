import { javascript } from "@codemirror/lang-javascript";
import { defaultHighlightStyle } from "@codemirror/highlight";
import { bracketMatching } from "@codemirror/matchbrackets";
import { EditorState, EditorView, basicSetup } from "@codemirror/basic-setup";

export const extensions = [
  bracketMatching(),
  defaultHighlightStyle.fallback,
  javascript,
  EditorState,
  EditorView,
   basicSetup

]