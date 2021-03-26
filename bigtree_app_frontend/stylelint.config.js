module.exports = {
  plugins: ['stylelint-scss'],
  extends: ['stylelint-config-standard'],
  rules: {
    'property-no-unknown': null,
    'no-eol-whitespace': null,
    'rule-empty-line-before': null,
    'at-rule-no-unknown': null,
    'scss/at-rule-no-unknown': true,
  },
};
