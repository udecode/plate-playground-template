/** @type {import('prettier').Config} */
export default {
  // Set the line ending to `lf`.
  // https://prettier.io/docs/en/options.html#end-of-line
  endOfLine: 'lf',

  // Set the tab width to 2 spaces.
  plugins: ['prettier-plugin-packagejson'],

  // Add trailing commas for object and array literals in ES5-compatible mode.
  // https://prettier.io/docs/en/options.html#semicolons
  semi: true,

  // https://prettier.io/docs/en/options.html#quotes
  singleQuote: true,

  // https://prettier.io/docs/en/options.html#tab-width
  tabWidth: 2,

  // https://prettier.io/docs/en/options.html#trailing-commas
  trailingComma: 'es5',
};
