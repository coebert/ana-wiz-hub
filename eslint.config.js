import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import noHexAlphaConcat from "./eslint-rules/no-hex-alpha-concat.js";
import diagramNeedsHeading from "./eslint-rules/diagram-needs-heading.js";

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
        },
      },
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
      "@typescript-eslint/no-unused-vars": "off",
      "lovable-local/no-hex-alpha-concat": "error",
    },
  },
);
