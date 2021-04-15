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
    'scss/at-rule-no-unknown': true,
    /* Tailwind 사용시 아래와 같이 설정
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
    */
  },
};
