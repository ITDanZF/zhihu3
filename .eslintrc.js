const path = require('node:path')

module.exports = {
  extends: 'standard-with-typescript',
  parserOptions: {
    project: path.join(__dirname, './tsconfig.json')
  },
  rules: {
    camelcase: 'off', // 移除驼峰限制
    'no-unused-vars': 'warn', // 移除没用变量的限制
    '@typescript-eslint/no-unused-vars': 'warn',
    'comma-dangle': 'off', // 移除object结尾不能用,的限制
    '@typescript-eslint/comma-dangle': 'off',
    'object-curly-newline': 'off', // 移除对象必须新起一行的限制
    '@typescript-eslint/consistent-type-assertions': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/strict-boolean-expressions': 'off',
    '@typescript-eslint/no-misused-promises': 'off',
    '@typescript-eslint/restrict-template-expressions': 'off',
    '@typescript-eslint/naming-convention': 'off',
    '@typescript-eslint/return-await': 'off',
    // '@typescript-eslint/dot-notation': 'warn'
  }
}
