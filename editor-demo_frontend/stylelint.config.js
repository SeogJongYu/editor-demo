module.exports = {
  plugins: ['stylelint-scss'],
  extends: ['stylelint-config-standard'],
  rules: {
    'property-no-unknown': null,
    'no-eol-whitespace': null,
    'rule-empty-line-before': null,
    'at-rule-no-unknown': null,
    'value-keyword-case': null,
    'declaration-colon-newline-after': null,
    'comment-empty-line-before': null,
    'no-missing-end-of-source-newline': null,
    'scss/at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: [
          'tailwind',
          'apply',
          'variants',
          'responsive',
          'screen',
        ],
      },
    ],
  },
};
