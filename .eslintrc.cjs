/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    '@vue/eslint-config-prettier',
    'eslint:recommended',
  ],
  env: {
    'vue/setup-compiler-macros': true,
    browser: true,
    amd: true,
    node: true,
  },
  rules: {
    'no-undef': 'error',
    // quotes: ['error', 'single'],
  },
}
