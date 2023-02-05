/* eslint-env node */
module.exports = {
  root: true,
  extends: ["plugin:vue/vue3-recommended", "eslint:recommended"],
  env: {
    "vue/setup-compiler-macros": true,
  },
  rules: {
    "vue/multi-word-component-names": "off",
    semi: ["error", "always", { omitLastInOneLineBlock: false }],
    quotes: ["error", "double"],
  },
};
