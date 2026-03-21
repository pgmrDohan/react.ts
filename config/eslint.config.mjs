import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReactConfig from "eslint-plugin-react/configs/recommended.js";

export default [
  {ignores: ["**/dist/**", "**/.yarn/**", ".pnp**"]},
  {
    files: ["../src/**/*.{ts,tsx}"],
    languageOptions: {globals: globals.browser},
    settings: {react: {version: "detect"}},
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReactConfig,
  {rules: {"react/react-in-jsx-scope": "off"}},
];
