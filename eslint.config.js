import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import noHexAlphaConcat from "./eslint-rules/no-hex-alpha-concat.js";
import diagramNeedsHeading from "./eslint-rules/diagram-needs-heading.js";
import validExamTag from "./eslint-rules/valid-exam-tag.js";

export default tseslint.config(
  { ignores: ["dist", "eslint-rules"] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      "lovable-local": {
        rules: {
          "no-hex-alpha-concat": noHexAlphaConcat,
          "diagram-needs-heading": diagramNeedsHeading,
          "valid-exam-tag": validExamTag,
        },
      },
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
      // Surface unused imports / locals / parameters during development.
      // Underscore-prefixed names are intentionally ignored as the conventional
      // "I know this is unused" opt-out (e.g. `_props`, `_event`).
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          args: "after-used",
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrors: "all",
          caughtErrorsIgnorePattern: "^_",
          destructuredArrayIgnorePattern: "^_",
          ignoreRestSiblings: true,
        },
      ],
      "no-unused-vars": "off",
      "lovable-local/no-hex-alpha-concat": "error",
      "lovable-local/diagram-needs-heading": "error",
      "lovable-local/valid-exam-tag": "error",
    },
  },
);
