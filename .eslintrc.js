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
        'no-console': ['warn', {'allow': ['info', 'error']}],
        'eqeqeq': 2,
        'no-trailing-spaces': 1,
        'arrow-spacing': ['error', {'before': true, 'after': true}],
        'react-hooks/exhaustive-deps': 1,
        'react-hooks/rules-of-hooks': 2,
        'react/jsx-uses-react': 0,
        'react/jsx-uses-vars': 0,
        'max-lines': { 'skipBlankLines': true, 'skipComments': true, 'max': 150 },
        'no-undefined': 1,
        'semi-spacing': 2,
        'space-before-blocks': 2,
        'no-redeclare': [ 'error', { 'builtInGlobals': true }],
        'semi': ['error', 'always'],
        'space-in-parens': 'error',
        'space-infix-ops': 'error',
        'object-curly-spacing': ['error', 'always'],
        'comma-spacing':'error',
        'space-before-function-paren': ['error', { 'asyncArrow': true, 'anonymous': false, 'named': false }],
        'keyword-spacing': ['error', { 'before': 'error', 'after': 'error' }],
        'array-bracket-spacing': 'error',
        'react/prop-types': 0,
        'no-unused-vars': 'warn',
        'react/react-in-jsx-scope': 0,




        "no-multiple-empty-lines": "error",
        "no-trailing-spaces": "error",
  },
  'settings': {
    'react': {
      'version': 'detect'
    }
  }
};
