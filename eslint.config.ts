import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import parser from "@typescript-eslint/parser";

export default tseslint.config(
  { ignores: ["dist", "node_modules", "eslint.config.ts"] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ["**/*.ts"],
    languageOptions: {
      parser,
      parserOptions: {
        // sourceType: "module",
        // ecmaVersion: "latest",
        project: "./tsconfig.json",
        tsconfigRootDir: __dirname,
      },
      globals: {
        ...globals.node,
      },
    },
    plugins: {
      "@typescript-eslint": tseslint.plugin,
    },
    rules: {
      "no-multiple-empty-lines": ["error", { max: 1 }],
      "no-trailing-spaces": "error",
      "eol-last": ["error", "always"],

      // Buenas prácticas
      eqeqeq: ["error", "always"],
      "no-console": "warn",
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_" },
      ],

      // Seguridad
      "no-eval": "error",
      "no-implied-eval": "error",

      // Errores comunes
      "no-undef": "off", // no se usa con TS
      "no-empty-function": "off",
      "@typescript-eslint/no-empty-function": ["warn"],

      // Reglas estrictas de TS
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/consistent-type-definitions": ["error", "interface"],
    },
  }
);
