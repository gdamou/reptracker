// @ts-check
const { defineConfig } = require("eslint-define-config");

module.exports = defineConfig({
    extends: "@astahmer/eslint-config-ts",
    rules: { "prettier/prettier": ["error", { endOfLine: "auto" }] },
});
