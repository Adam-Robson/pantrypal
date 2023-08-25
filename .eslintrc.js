export default {
    'env': {
        'browser': true,
        'es2021': true,
        "jest": true,
        "node": true
    },
    'extends': [
        'eslint:all',
        'plugin:react/recommended',
        'plugin:react-hooks/recommended'
    ],
    'parserOptions': {
        'ecmaFeatures': {
            'implied strict': true,
            'jsx': true
        },
        'ecmaVersion': 12,
        'sourceType': 'module'
    },
    'plugins': [
        'react'
    ],
    'rules': {
        'indent': [
            'error',
            2
        ],
        'linebreak-style': [
            'error',
            'unix'
        ],
        'quotes': [
            'error',
            'single'
        ],
        'semi': [
            'error',
            'always'
        ],
        'array-bracket-spacing': 'error',
        'arrow-parens': 2,
        'arrow-spacing': ['error', {'before': true, 'after': true}],
        'comma-spacing':'error',
        'eqeqeq': 2,
        'keyword-spacing': ['error', { 'before': 'error', 'after': 'error' }],
        'max-lines': { 'skipBlankLines': true, 'skipComments': true, 'max': 150 },
        'no-console': ['warn', {'allow': ['info', 'error']}],
        "no-multiple-empty-lines": "error",
        'no-redeclare': [ 'error', { 'builtInGlobals': true }],
        'no-trailing-spaces': 1,
        'no-undefined': 1,
        'no-unused-vars': 'warn',
        'object-curly-spacing': ['error', 'always'],
        'semi-spacing': 2,
        'space-before-blocks': 2,
        'semi': ['error', 'always'],
        'space-in-parens': 'error',
        'space-infix-ops': 'error',
        'space-before-function-paren': ['error', { 'asyncArrow': true, 'anonymous': false, 'named': false }],
        'react/prop-types': 0,
        'react/react-in-jsx-scope': 0,
        'react/jsx-uses-react': 0,
        'react/jsx-uses-vars': 0,
        'react-hooks/exhaustive-deps': 1,
        'react-hooks/rules-of-hooks': 2,
      },
      'settings': {
        'react': {
          'version': 'detect'
        }
      }
};
