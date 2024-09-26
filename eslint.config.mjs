import pluginJs from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default [
  {
    files: ['**/*.{js,mjs,cjs,ts}'],
  },
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.es2021,
        ...globals.node,
      },
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    ignores: ['build/**/*', 'node_modules/**/*', 'dist/**/*'],
  },
];

// import globals from 'globals';

//   parser: '@typescript-eslint/parser',
//   parserOptions: {
//     "ecmaFeatures": {
//       "jsx": true
//     },
//     "ecmaVersion": 12,
//     "sourceType": "module"
//   },
//   plugins: ['@typescript-eslint', 'react'],
//   extends: [
//     'eslint:recommended',
//     'plugin:@typescript-eslint/recommended',
//     'plugin:react/recommended'
//   ],
//   rules: {
//     "no-use-before-define": "off",
//     "@typescript-eslint/no-use-before-define": [ "error" ],
//     "react/jsx-filename-extension": [ "warn", { "extensions": [ ".tsx" ] } ],
//     "import/extensions": [ "error", "ignorePackages", { "ts": "never", "tsx": "never" } ],
//     "no-shadow": "off",
//     "@typescript-eslint/no-shadow": [ "error" ],
//     "@typescript-eslint/explicit-function-return-type": [ "error", { "allowExpressions": true } ],
//     "max-len": [ "warn", { "code": 120, "ignoreComments": true, "ignoreUrls": true } ],
//     "react-hooks/rules-of-hooks": "error",
//     "react-hooks/exhaustive-deps": "warn",
//     "import/prefer-default-export": "off",
//     "react/prop-types": "off",
//     "prettier/prettier": [ "error", { "endOfLine": "auto" } ]
//   },
//   settings: {
//     "import/resolver": {
//       "typescript": {}
//     }
//   },
//   ignores: [
//     "build/**/*",
//     "node_modules/**/*",
//     "dist/**/*",
//   ],
// };
