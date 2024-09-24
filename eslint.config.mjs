import mocha from "eslint-plugin-mocha";
import globals from "globals";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default [...compat.extends("eslint:recommended"), {
    plugins: {
        mocha,
    },

    languageOptions: {
        globals: {
            ...globals.mocha,
            ...globals.node,
        },

        ecmaVersion: 2020,
        sourceType: "commonjs",
    },

    rules: {
        semi: [2, "always"],
        quotes: ["error", "single"],
    },
}, ...compat.extends(
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
).map(config => ({
    ...config,
    files: ["test/*.ts"],
})), {
    files: ["test/*.ts"],

    plugins: {
        "@typescript-eslint": typescriptEslint,
    },

    languageOptions: {
        parser: tsParser,
    },

    rules: {
        "@typescript-eslint/ban-ts-comment": "off",
    },
}, {
    files: ["**/*.mjs", "lib/*.js", "wasm/*.js"],

    languageOptions: {
        ecmaVersion: 2022,
        sourceType: "module",
    },
}, {
    files: ["test/integration/browser*/*.js", "example/browser/**/*.js"],

    languageOptions: {
        globals: {
            ...globals.browser,
        },

        ecmaVersion: 2020,
        sourceType: "module",
    },
}, ...compat.extends(
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
).map(config => ({
    ...config,
    files: ["test/integration/browser*/*.ts"],
})), {
    files: ["test/integration/browser*/*.ts"],

    plugins: {
        "@typescript-eslint": typescriptEslint,
    },

    languageOptions: {
        globals: {
            ...globals.browser,
        },

        parser: tsParser,
    },

    rules: {
        "@typescript-eslint/ban-ts-comment": "off",
    },
}];