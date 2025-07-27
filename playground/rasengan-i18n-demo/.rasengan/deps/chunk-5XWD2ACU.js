// ../../node_modules/.pnpm/zwitch@2.0.4/node_modules/zwitch/index.js
var own = {}.hasOwnProperty;
function zwitch(key, options) {
  const settings = options || {};
  function one(value, ...parameters) {
    let fn = one.invalid;
    const handlers = one.handlers;
    if (value && own.call(value, key)) {
      const id = String(value[key]);
      fn = own.call(handlers, id) ? handlers[id] : one.unknown;
    }
    if (fn) {
      return fn.call(this, value, ...parameters);
    }
  }
  one.handlers = settings.handlers || {};
  one.invalid = settings.invalid;
  one.unknown = settings.unknown;
  return one;
}

// ../../node_modules/.pnpm/ccount@2.0.1/node_modules/ccount/index.js
function ccount(value, character) {
  const source = String(value);
  if (typeof character !== 'string') {
    throw new TypeError('Expected character');
  }
  let count = 0;
  let index = source.indexOf(character);
  while (index !== -1) {
    count++;
    index = source.indexOf(character, index + character.length);
  }
  return count;
}

export { zwitch, ccount };
//# sourceMappingURL=chunk-5XWD2ACU.js.map
