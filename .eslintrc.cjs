require('@rushstack/eslint-patch/modern-module-resolution');

const path = require('node:path');
const createAliasSetting = require('@vue/eslint-config-airbnb/createAliasSetting');

module.exports = {
root: true,
extends: [
'plugin:vue/vue3-essential',
'eslint:recommended',
'@vue/eslint-config-typescript/recommended',
'@vue/eslint-config-airbnb',
'@vue/eslint-config-prettier'
],
rules: {
"import/no-extraneous-dependencies": ["error", {"devDependencies": true}],
'import/no-unresolved': 'error',
'import/extensions': ['error', 'ignorePackages', {
js: 'never',
jsx: 'never',
ts: 'never',
tsx: 'never',
vue: 'never',
}],
  'no-unused-vars': 'off',
  'vue/script-setup-uses-vars': 'error',
  'no-shadow': 'off',
  '@typescript-eslint/no-shadow': ['error']
},
settings: {
...createAliasSetting({
'@': `${path.resolve(__dirname, './src')}`,
}),
'import/resolver': {
typescript: {},
node: {
extensions: ['.js', '.jsx', '.ts', '.tsx', '.vue'],
},
},
},
parserOptions: {
ecmaVersion: 2021,
sourceType: 'module',
},
};
