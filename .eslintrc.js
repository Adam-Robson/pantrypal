export default {
    'env': {
        'browser': true,
        'es2021': true,
        "jest": true,
        "node": true
    },
    'extends': [
        'eslint:recommended',
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
        'eqeqeq': ['error', 'always'],
        'no-trailing-spaces': 'error',
        'arrow-spacing': ['error', {'before': true, 'after': true}],
        'react-hooks/exhaustive-deps': 1,
        'react-hooks/rules-of-hooks': 2,
        'react/jsx-uses-react': 'off',
        'react/jsx-uses-vars': 'off',

        'no-undef': 'warn',
        'no-case-declarations': 'off',
        'no-empty': 'off',
        "block-spacing": "error",
        "brace-style": "error",
        "computed-property-spacing": "error",
        "func-call-spacing": "error",
        "key-spacing": "error",

        "no-whitespace-before-property": "error",
        "semi-spacing": "error",
        "space-before-blocks": "error",


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
  }
};
