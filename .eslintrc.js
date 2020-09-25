module.exports = {
  "env": {
    "browser": true,
    "es6": true,
    "node": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/eslint-recommended"
  ],
  "globals": {
    "Atomics": "readonly",
    "SharedArrayBuffer": "readonly"
  },
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    },
    "ecmaVersion": 2018,
    "sourceType": "module"
  },
  "plugins": [
    "react",
    "@typescript-eslint"
  ],
  "rules": {
    "indent": [2, 4, { "SwitchCase": 1 }],
    "no-mixed-spaces-and-tabs": 2,
    "no-empty": 2,
    "no-var": 2,
    "semi": [2, "always"],
    "no-debugger": 1,
    "eqeqeq": [2, "smart"],
    "no-alert": 2,
    "prefer-const": 1,
    "no-const-assign": 2,
    "no-new-object": 2,
    "quote-props": [2, "consistent-as-needed"],
    "no-array-constructor": 2,
    "prefer-destructuring": [2, {
      "array": true,
      "object": true
    }, {
      "enforceForRenamedProperties": false
    }],
    "quotes": [2, "double"],
    "prefer-template": 2,
    "template-curly-spacing": 2,
    "no-new-func": 2,
    "no-param-reassign": 2,
    "function-paren-newline": [2, "multiline"],
    "prefer-arrow-callback": 2,
    "arrow-parens": [2, "always"],
    "no-dupe-class-members": 2,
    "no-duplicate-imports": 2,
    "dot-notation": 1,
    "spaced-comment": [1, "always"],
    "space-before-blocks": 1,
    "keyword-spacing": [1, { "before": true }],
    "space-infix-ops": 1
  }
};
