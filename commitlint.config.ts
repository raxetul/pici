const Configuration = {
  extends: ['@commitlint/config-conventional'],

  formatter: '@commitlint/format',

  defaultIgnores: true,

  helpUrl: 'https://github.com/conventional-changelog/commitlint/tree/master/@commitlint/config-conventional',

  rules: {
    'subject-case': [2, 'always', ['sentence-case']],
  },
  prompt: {
    messages: {},
    questions: {
      type: {
        description: 'please input type:',
      },
    },
  },
  ignorePatterns: ['/node_modules/', '/dist/', '/build/', '/public/', '/coverage/'],
};

export default Configuration;
