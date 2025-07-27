import {
  find,
  hastToReact,
  html,
  stringify,
  stringify2,
  svg,
  whitespace,
} from './chunk-EAHWUTXV.js';
import { pointStart, remarkRehype } from './chunk-WFH3WSZP.js';
import { remarkParse, stringifyPosition } from './chunk-VXURKPJB.js';
import { visit } from './chunk-6GFY52XF.js';
import './chunk-MTY6IQI4.js';
import { ok, unreachable } from './chunk-W3RG5IXQ.js';
import { require_jsx_runtime } from './chunk-NO5IRT5Q.js';
import { require_react } from './chunk-CUTZXKCK.js';
import { __commonJS, __toESM } from './chunk-DC5AMYBS.js';

// ../../node_modules/.pnpm/inline-style-parser@0.2.4/node_modules/inline-style-parser/index.js
var require_inline_style_parser = __commonJS({
  '../../node_modules/.pnpm/inline-style-parser@0.2.4/node_modules/inline-style-parser/index.js'(
    exports,
    module
  ) {
    var COMMENT_REGEX = /\/\*[^*]*\*+([^/*][^*]*\*+)*\//g;
    var NEWLINE_REGEX = /\n/g;
    var WHITESPACE_REGEX = /^\s*/;
    var PROPERTY_REGEX = /^(\*?[-#/*\\\w]+(\[[0-9a-z_-]+\])?)\s*/;
    var COLON_REGEX = /^:\s*/;
    var VALUE_REGEX = /^((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^)]*?\)|[^};])+)/;
    var SEMICOLON_REGEX = /^[;\s]*/;
    var TRIM_REGEX = /^\s+|\s+$/g;
    var NEWLINE = '\n';
    var FORWARD_SLASH = '/';
    var ASTERISK = '*';
    var EMPTY_STRING = '';
    var TYPE_COMMENT = 'comment';
    var TYPE_DECLARATION = 'declaration';
    module.exports = function (style, options) {
      if (typeof style !== 'string') {
        throw new TypeError('First argument must be a string');
      }
      if (!style) return [];
      options = options || {};
      var lineno = 1;
      var column = 1;
      function updatePosition(str) {
        var lines = str.match(NEWLINE_REGEX);
        if (lines) lineno += lines.length;
        var i = str.lastIndexOf(NEWLINE);
        column = ~i ? str.length - i : column + str.length;
      }
      function position() {
        var start2 = { line: lineno, column };
        return function (node) {
          node.position = new Position(start2);
          whitespace2();
          return node;
        };
      }
      function Position(start2) {
        this.start = start2;
        this.end = { line: lineno, column };
        this.source = options.source;
      }
      Position.prototype.content = style;
      var errorsList = [];
      function error(msg) {
        var err = new Error(
          options.source + ':' + lineno + ':' + column + ': ' + msg
        );
        err.reason = msg;
        err.filename = options.source;
        err.line = lineno;
        err.column = column;
        err.source = style;
        if (options.silent) {
          errorsList.push(err);
        } else {
          throw err;
        }
      }
      function match(re) {
        var m = re.exec(style);
        if (!m) return;
        var str = m[0];
        updatePosition(str);
        style = style.slice(str.length);
        return m;
      }
      function whitespace2() {
        match(WHITESPACE_REGEX);
      }
      function comments(rules) {
        var c;
        rules = rules || [];
        while ((c = comment())) {
          if (c !== false) {
            rules.push(c);
          }
        }
        return rules;
      }
      function comment() {
        var pos = position();
        if (FORWARD_SLASH != style.charAt(0) || ASTERISK != style.charAt(1))
          return;
        var i = 2;
        while (
          EMPTY_STRING != style.charAt(i) &&
          (ASTERISK != style.charAt(i) || FORWARD_SLASH != style.charAt(i + 1))
        ) {
          ++i;
        }
        i += 2;
        if (EMPTY_STRING === style.charAt(i - 1)) {
          return error('End of comment missing');
        }
        var str = style.slice(2, i - 2);
        column += 2;
        updatePosition(str);
        style = style.slice(i);
        column += 2;
        return pos({
          type: TYPE_COMMENT,
          comment: str,
        });
      }
      function declaration() {
        var pos = position();
        var prop = match(PROPERTY_REGEX);
        if (!prop) return;
        comment();
        if (!match(COLON_REGEX)) return error("property missing ':'");
        var val = match(VALUE_REGEX);
        var ret = pos({
          type: TYPE_DECLARATION,
          property: trim(prop[0].replace(COMMENT_REGEX, EMPTY_STRING)),
          value: val
            ? trim(val[0].replace(COMMENT_REGEX, EMPTY_STRING))
            : EMPTY_STRING,
        });
        match(SEMICOLON_REGEX);
        return ret;
      }
      function declarations() {
        var decls = [];
        comments(decls);
        var decl;
        while ((decl = declaration())) {
          if (decl !== false) {
            decls.push(decl);
            comments(decls);
          }
        }
        return decls;
      }
      whitespace2();
      return declarations();
    };
    function trim(str) {
      return str ? str.replace(TRIM_REGEX, EMPTY_STRING) : EMPTY_STRING;
    }
  },
});

// ../../node_modules/.pnpm/style-to-object@1.0.9/node_modules/style-to-object/cjs/index.js
var require_cjs = __commonJS({
  '../../node_modules/.pnpm/style-to-object@1.0.9/node_modules/style-to-object/cjs/index.js'(
    exports
  ) {
    'use strict';
    var __importDefault =
      (exports && exports.__importDefault) ||
      function (mod) {
        return mod && mod.__esModule ? mod : { default: mod };
      };
    Object.defineProperty(exports, '__esModule', { value: true });
    exports.default = StyleToObject;
    var inline_style_parser_1 = __importDefault(require_inline_style_parser());
    function StyleToObject(style, iterator) {
      var styleObject = null;
      if (!style || typeof style !== 'string') {
        return styleObject;
      }
      var declarations = (0, inline_style_parser_1.default)(style);
      var hasIterator = typeof iterator === 'function';
      declarations.forEach(function (declaration) {
        if (declaration.type !== 'declaration') {
          return;
        }
        var property = declaration.property,
          value = declaration.value;
        if (hasIterator) {
          iterator(property, value, declaration);
        } else if (value) {
          styleObject = styleObject || {};
          styleObject[property] = value;
        }
      });
      return styleObject;
    }
  },
});

// ../../node_modules/.pnpm/style-to-js@1.1.17/node_modules/style-to-js/cjs/utilities.js
var require_utilities = __commonJS({
  '../../node_modules/.pnpm/style-to-js@1.1.17/node_modules/style-to-js/cjs/utilities.js'(
    exports
  ) {
    'use strict';
    Object.defineProperty(exports, '__esModule', { value: true });
    exports.camelCase = void 0;
    var CUSTOM_PROPERTY_REGEX = /^--[a-zA-Z0-9_-]+$/;
    var HYPHEN_REGEX = /-([a-z])/g;
    var NO_HYPHEN_REGEX = /^[^-]+$/;
    var VENDOR_PREFIX_REGEX = /^-(webkit|moz|ms|o|khtml)-/;
    var MS_VENDOR_PREFIX_REGEX = /^-(ms)-/;
    var skipCamelCase = function (property) {
      return (
        !property ||
        NO_HYPHEN_REGEX.test(property) ||
        CUSTOM_PROPERTY_REGEX.test(property)
      );
    };
    var capitalize = function (match, character) {
      return character.toUpperCase();
    };
    var trimHyphen = function (match, prefix) {
      return ''.concat(prefix, '-');
    };
    var camelCase = function (property, options) {
      if (options === void 0) {
        options = {};
      }
      if (skipCamelCase(property)) {
        return property;
      }
      property = property.toLowerCase();
      if (options.reactCompat) {
        property = property.replace(MS_VENDOR_PREFIX_REGEX, trimHyphen);
      } else {
        property = property.replace(VENDOR_PREFIX_REGEX, trimHyphen);
      }
      return property.replace(HYPHEN_REGEX, capitalize);
    };
    exports.camelCase = camelCase;
  },
});

// ../../node_modules/.pnpm/style-to-js@1.1.17/node_modules/style-to-js/cjs/index.js
var require_cjs2 = __commonJS({
  '../../node_modules/.pnpm/style-to-js@1.1.17/node_modules/style-to-js/cjs/index.js'(
    exports,
    module
  ) {
    'use strict';
    var __importDefault =
      (exports && exports.__importDefault) ||
      function (mod) {
        return mod && mod.__esModule ? mod : { default: mod };
      };
    var style_to_object_1 = __importDefault(require_cjs());
    var utilities_1 = require_utilities();
    function StyleToJS(style, options) {
      var output = {};
      if (!style || typeof style !== 'string') {
        return output;
      }
      (0, style_to_object_1.default)(style, function (property, value) {
        if (property && value) {
          output[(0, utilities_1.camelCase)(property, options)] = value;
        }
      });
      return output;
    }
    StyleToJS.default = StyleToJS;
    module.exports = StyleToJS;
  },
});

// ../../node_modules/.pnpm/extend@3.0.2/node_modules/extend/index.js
var require_extend = __commonJS({
  '../../node_modules/.pnpm/extend@3.0.2/node_modules/extend/index.js'(
    exports,
    module
  ) {
    'use strict';
    var hasOwn = Object.prototype.hasOwnProperty;
    var toStr = Object.prototype.toString;
    var defineProperty = Object.defineProperty;
    var gOPD = Object.getOwnPropertyDescriptor;
    var isArray = function isArray2(arr) {
      if (typeof Array.isArray === 'function') {
        return Array.isArray(arr);
      }
      return toStr.call(arr) === '[object Array]';
    };
    var isPlainObject2 = function isPlainObject3(obj) {
      if (!obj || toStr.call(obj) !== '[object Object]') {
        return false;
      }
      var hasOwnConstructor = hasOwn.call(obj, 'constructor');
      var hasIsPrototypeOf =
        obj.constructor &&
        obj.constructor.prototype &&
        hasOwn.call(obj.constructor.prototype, 'isPrototypeOf');
      if (obj.constructor && !hasOwnConstructor && !hasIsPrototypeOf) {
        return false;
      }
      var key;
      for (key in obj) {
      }
      return typeof key === 'undefined' || hasOwn.call(obj, key);
    };
    var setProperty = function setProperty2(target, options) {
      if (defineProperty && options.name === '__proto__') {
        defineProperty(target, options.name, {
          enumerable: true,
          configurable: true,
          value: options.newValue,
          writable: true,
        });
      } else {
        target[options.name] = options.newValue;
      }
    };
    var getProperty = function getProperty2(obj, name2) {
      if (name2 === '__proto__') {
        if (!hasOwn.call(obj, name2)) {
          return void 0;
        } else if (gOPD) {
          return gOPD(obj, name2).value;
        }
      }
      return obj[name2];
    };
    module.exports = function extend2() {
      var options, name2, src, copy, copyIsArray, clone;
      var target = arguments[0];
      var i = 1;
      var length = arguments.length;
      var deep = false;
      if (typeof target === 'boolean') {
        deep = target;
        target = arguments[1] || {};
        i = 2;
      }
      if (
        target == null ||
        (typeof target !== 'object' && typeof target !== 'function')
      ) {
        target = {};
      }
      for (; i < length; ++i) {
        options = arguments[i];
        if (options != null) {
          for (name2 in options) {
            src = getProperty(target, name2);
            copy = getProperty(options, name2);
            if (target !== copy) {
              if (
                deep &&
                copy &&
                (isPlainObject2(copy) || (copyIsArray = isArray(copy)))
              ) {
                if (copyIsArray) {
                  copyIsArray = false;
                  clone = src && isArray(src) ? src : [];
                } else {
                  clone = src && isPlainObject2(src) ? src : {};
                }
                setProperty(target, {
                  name: name2,
                  newValue: extend2(deep, clone, copy),
                });
              } else if (typeof copy !== 'undefined') {
                setProperty(target, { name: name2, newValue: copy });
              }
            }
          }
        }
      }
      return target;
    };
  },
});

// ../../node_modules/.pnpm/estree-util-is-identifier-name@3.0.0/node_modules/estree-util-is-identifier-name/lib/index.js
var nameRe = /^[$_\p{ID_Start}][$_\u{200C}\u{200D}\p{ID_Continue}]*$/u;
var nameReJsx = /^[$_\p{ID_Start}][-$_\u{200C}\u{200D}\p{ID_Continue}]*$/u;
var emptyOptions = {};
function name(name2, options) {
  const settings = options || emptyOptions;
  const re = settings.jsx ? nameReJsx : nameRe;
  return re.test(name2);
}

// ../../node_modules/.pnpm/hast-util-to-jsx-runtime@2.3.6/node_modules/hast-util-to-jsx-runtime/lib/index.js
var import_style_to_js = __toESM(require_cjs2(), 1);

// ../../node_modules/.pnpm/vfile-message@4.0.2/node_modules/vfile-message/lib/index.js
var VFileMessage = class extends Error {
  /**
   * Create a message for `reason`.
   *
   * > 🪦 **Note**: also has obsolete signatures.
   *
   * @overload
   * @param {string} reason
   * @param {Options | null | undefined} [options]
   * @returns
   *
   * @overload
   * @param {string} reason
   * @param {Node | NodeLike | null | undefined} parent
   * @param {string | null | undefined} [origin]
   * @returns
   *
   * @overload
   * @param {string} reason
   * @param {Point | Position | null | undefined} place
   * @param {string | null | undefined} [origin]
   * @returns
   *
   * @overload
   * @param {string} reason
   * @param {string | null | undefined} [origin]
   * @returns
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {Node | NodeLike | null | undefined} parent
   * @param {string | null | undefined} [origin]
   * @returns
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {Point | Position | null | undefined} place
   * @param {string | null | undefined} [origin]
   * @returns
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {string | null | undefined} [origin]
   * @returns
   *
   * @param {Error | VFileMessage | string} causeOrReason
   *   Reason for message, should use markdown.
   * @param {Node | NodeLike | Options | Point | Position | string | null | undefined} [optionsOrParentOrPlace]
   *   Configuration (optional).
   * @param {string | null | undefined} [origin]
   *   Place in code where the message originates (example:
   *   `'my-package:my-rule'` or `'my-rule'`).
   * @returns
   *   Instance of `VFileMessage`.
   */
  // eslint-disable-next-line complexity
  constructor(causeOrReason, optionsOrParentOrPlace, origin) {
    super();
    if (typeof optionsOrParentOrPlace === 'string') {
      origin = optionsOrParentOrPlace;
      optionsOrParentOrPlace = void 0;
    }
    let reason = '';
    let options = {};
    let legacyCause = false;
    if (optionsOrParentOrPlace) {
      if (
        'line' in optionsOrParentOrPlace &&
        'column' in optionsOrParentOrPlace
      ) {
        options = { place: optionsOrParentOrPlace };
      } else if (
        'start' in optionsOrParentOrPlace &&
        'end' in optionsOrParentOrPlace
      ) {
        options = { place: optionsOrParentOrPlace };
      } else if ('type' in optionsOrParentOrPlace) {
        options = {
          ancestors: [optionsOrParentOrPlace],
          place: optionsOrParentOrPlace.position,
        };
      } else {
        options = { ...optionsOrParentOrPlace };
      }
    }
    if (typeof causeOrReason === 'string') {
      reason = causeOrReason;
    } else if (!options.cause && causeOrReason) {
      legacyCause = true;
      reason = causeOrReason.message;
      options.cause = causeOrReason;
    }
    if (!options.ruleId && !options.source && typeof origin === 'string') {
      const index = origin.indexOf(':');
      if (index === -1) {
        options.ruleId = origin;
      } else {
        options.source = origin.slice(0, index);
        options.ruleId = origin.slice(index + 1);
      }
    }
    if (!options.place && options.ancestors && options.ancestors) {
      const parent = options.ancestors[options.ancestors.length - 1];
      if (parent) {
        options.place = parent.position;
      }
    }
    const start2 =
      options.place && 'start' in options.place
        ? options.place.start
        : options.place;
    this.ancestors = options.ancestors || void 0;
    this.cause = options.cause || void 0;
    this.column = start2 ? start2.column : void 0;
    this.fatal = void 0;
    this.file;
    this.message = reason;
    this.line = start2 ? start2.line : void 0;
    this.name = stringifyPosition(options.place) || '1:1';
    this.place = options.place || void 0;
    this.reason = this.message;
    this.ruleId = options.ruleId || void 0;
    this.source = options.source || void 0;
    this.stack =
      legacyCause && options.cause && typeof options.cause.stack === 'string'
        ? options.cause.stack
        : '';
    this.actual;
    this.expected;
    this.note;
    this.url;
  }
};
VFileMessage.prototype.file = '';
VFileMessage.prototype.name = '';
VFileMessage.prototype.reason = '';
VFileMessage.prototype.message = '';
VFileMessage.prototype.stack = '';
VFileMessage.prototype.column = void 0;
VFileMessage.prototype.line = void 0;
VFileMessage.prototype.ancestors = void 0;
VFileMessage.prototype.cause = void 0;
VFileMessage.prototype.fatal = void 0;
VFileMessage.prototype.place = void 0;
VFileMessage.prototype.ruleId = void 0;
VFileMessage.prototype.source = void 0;

// ../../node_modules/.pnpm/hast-util-to-jsx-runtime@2.3.6/node_modules/hast-util-to-jsx-runtime/lib/index.js
var own = {}.hasOwnProperty;
var emptyMap = /* @__PURE__ */ new Map();
var cap = /[A-Z]/g;
var tableElements = /* @__PURE__ */ new Set([
  'table',
  'tbody',
  'thead',
  'tfoot',
  'tr',
]);
var tableCellElement = /* @__PURE__ */ new Set(['td', 'th']);
var docs = 'https://github.com/syntax-tree/hast-util-to-jsx-runtime';
function toJsxRuntime(tree, options) {
  if (!options || options.Fragment === void 0) {
    throw new TypeError('Expected `Fragment` in options');
  }
  const filePath = options.filePath || void 0;
  let create;
  if (options.development) {
    if (typeof options.jsxDEV !== 'function') {
      throw new TypeError(
        'Expected `jsxDEV` in options when `development: true`'
      );
    }
    create = developmentCreate(filePath, options.jsxDEV);
  } else {
    if (typeof options.jsx !== 'function') {
      throw new TypeError('Expected `jsx` in production options');
    }
    if (typeof options.jsxs !== 'function') {
      throw new TypeError('Expected `jsxs` in production options');
    }
    create = productionCreate(filePath, options.jsx, options.jsxs);
  }
  const state = {
    Fragment: options.Fragment,
    ancestors: [],
    components: options.components || {},
    create,
    elementAttributeNameCase: options.elementAttributeNameCase || 'react',
    evaluater: options.createEvaluater ? options.createEvaluater() : void 0,
    filePath,
    ignoreInvalidStyle: options.ignoreInvalidStyle || false,
    passKeys: options.passKeys !== false,
    passNode: options.passNode || false,
    schema: options.space === 'svg' ? svg : html,
    stylePropertyNameCase: options.stylePropertyNameCase || 'dom',
    tableCellAlignToStyle: options.tableCellAlignToStyle !== false,
  };
  const result = one(state, tree, void 0);
  if (result && typeof result !== 'string') {
    return result;
  }
  return state.create(
    tree,
    state.Fragment,
    { children: result || void 0 },
    void 0
  );
}
function one(state, node, key) {
  if (node.type === 'element') {
    return element(state, node, key);
  }
  if (node.type === 'mdxFlowExpression' || node.type === 'mdxTextExpression') {
    return mdxExpression(state, node);
  }
  if (node.type === 'mdxJsxFlowElement' || node.type === 'mdxJsxTextElement') {
    return mdxJsxElement(state, node, key);
  }
  if (node.type === 'mdxjsEsm') {
    return mdxEsm(state, node);
  }
  if (node.type === 'root') {
    return root(state, node, key);
  }
  if (node.type === 'text') {
    return text(state, node);
  }
}
function element(state, node, key) {
  const parentSchema = state.schema;
  let schema = parentSchema;
  if (node.tagName.toLowerCase() === 'svg' && parentSchema.space === 'html') {
    schema = svg;
    state.schema = schema;
  }
  state.ancestors.push(node);
  const type = findComponentFromName(state, node.tagName, false);
  const props = createElementProps(state, node);
  let children = createChildren(state, node);
  if (tableElements.has(node.tagName)) {
    children = children.filter(function (child) {
      return typeof child === 'string' ? !whitespace(child) : true;
    });
  }
  addNode(state, props, type, node);
  addChildren(props, children);
  state.ancestors.pop();
  state.schema = parentSchema;
  return state.create(node, type, props, key);
}
function mdxExpression(state, node) {
  if (node.data && node.data.estree && state.evaluater) {
    const program = node.data.estree;
    const expression = program.body[0];
    ok(expression.type === 'ExpressionStatement');
    return (
      /** @type {Child | undefined} */
      state.evaluater.evaluateExpression(expression.expression)
    );
  }
  crashEstree(state, node.position);
}
function mdxEsm(state, node) {
  if (node.data && node.data.estree && state.evaluater) {
    return (
      /** @type {Child | undefined} */
      state.evaluater.evaluateProgram(node.data.estree)
    );
  }
  crashEstree(state, node.position);
}
function mdxJsxElement(state, node, key) {
  const parentSchema = state.schema;
  let schema = parentSchema;
  if (node.name === 'svg' && parentSchema.space === 'html') {
    schema = svg;
    state.schema = schema;
  }
  state.ancestors.push(node);
  const type =
    node.name === null
      ? state.Fragment
      : findComponentFromName(state, node.name, true);
  const props = createJsxElementProps(state, node);
  const children = createChildren(state, node);
  addNode(state, props, type, node);
  addChildren(props, children);
  state.ancestors.pop();
  state.schema = parentSchema;
  return state.create(node, type, props, key);
}
function root(state, node, key) {
  const props = {};
  addChildren(props, createChildren(state, node));
  return state.create(node, state.Fragment, props, key);
}
function text(_, node) {
  return node.value;
}
function addNode(state, props, type, node) {
  if (typeof type !== 'string' && type !== state.Fragment && state.passNode) {
    props.node = node;
  }
}
function addChildren(props, children) {
  if (children.length > 0) {
    const value = children.length > 1 ? children : children[0];
    if (value) {
      props.children = value;
    }
  }
}
function productionCreate(_, jsx2, jsxs2) {
  return create;
  function create(_2, type, props, key) {
    const isStaticChildren = Array.isArray(props.children);
    const fn = isStaticChildren ? jsxs2 : jsx2;
    return key ? fn(type, props, key) : fn(type, props);
  }
}
function developmentCreate(filePath, jsxDEV) {
  return create;
  function create(node, type, props, key) {
    const isStaticChildren = Array.isArray(props.children);
    const point = pointStart(node);
    return jsxDEV(
      type,
      props,
      key,
      isStaticChildren,
      {
        columnNumber: point ? point.column - 1 : void 0,
        fileName: filePath,
        lineNumber: point ? point.line : void 0,
      },
      void 0
    );
  }
}
function createElementProps(state, node) {
  const props = {};
  let alignValue;
  let prop;
  for (prop in node.properties) {
    if (prop !== 'children' && own.call(node.properties, prop)) {
      const result = createProperty(state, prop, node.properties[prop]);
      if (result) {
        const [key, value] = result;
        if (
          state.tableCellAlignToStyle &&
          key === 'align' &&
          typeof value === 'string' &&
          tableCellElement.has(node.tagName)
        ) {
          alignValue = value;
        } else {
          props[key] = value;
        }
      }
    }
  }
  if (alignValue) {
    const style =
      /** @type {Style} */
      props.style || (props.style = {});
    style[state.stylePropertyNameCase === 'css' ? 'text-align' : 'textAlign'] =
      alignValue;
  }
  return props;
}
function createJsxElementProps(state, node) {
  const props = {};
  for (const attribute of node.attributes) {
    if (attribute.type === 'mdxJsxExpressionAttribute') {
      if (attribute.data && attribute.data.estree && state.evaluater) {
        const program = attribute.data.estree;
        const expression = program.body[0];
        ok(expression.type === 'ExpressionStatement');
        const objectExpression = expression.expression;
        ok(objectExpression.type === 'ObjectExpression');
        const property = objectExpression.properties[0];
        ok(property.type === 'SpreadElement');
        Object.assign(
          props,
          state.evaluater.evaluateExpression(property.argument)
        );
      } else {
        crashEstree(state, node.position);
      }
    } else {
      const name2 = attribute.name;
      let value;
      if (attribute.value && typeof attribute.value === 'object') {
        if (
          attribute.value.data &&
          attribute.value.data.estree &&
          state.evaluater
        ) {
          const program = attribute.value.data.estree;
          const expression = program.body[0];
          ok(expression.type === 'ExpressionStatement');
          value = state.evaluater.evaluateExpression(expression.expression);
        } else {
          crashEstree(state, node.position);
        }
      } else {
        value = attribute.value === null ? true : attribute.value;
      }
      props[name2] = /** @type {Props[keyof Props]} */ value;
    }
  }
  return props;
}
function createChildren(state, node) {
  const children = [];
  let index = -1;
  const countsByName = state.passKeys ? /* @__PURE__ */ new Map() : emptyMap;
  while (++index < node.children.length) {
    const child = node.children[index];
    let key;
    if (state.passKeys) {
      const name2 =
        child.type === 'element'
          ? child.tagName
          : child.type === 'mdxJsxFlowElement' ||
              child.type === 'mdxJsxTextElement'
            ? child.name
            : void 0;
      if (name2) {
        const count = countsByName.get(name2) || 0;
        key = name2 + '-' + count;
        countsByName.set(name2, count + 1);
      }
    }
    const result = one(state, child, key);
    if (result !== void 0) children.push(result);
  }
  return children;
}
function createProperty(state, prop, value) {
  const info = find(state.schema, prop);
  if (
    value === null ||
    value === void 0 ||
    (typeof value === 'number' && Number.isNaN(value))
  ) {
    return;
  }
  if (Array.isArray(value)) {
    value = info.commaSeparated ? stringify(value) : stringify2(value);
  }
  if (info.property === 'style') {
    let styleObject =
      typeof value === 'object' ? value : parseStyle(state, String(value));
    if (state.stylePropertyNameCase === 'css') {
      styleObject = transformStylesToCssCasing(styleObject);
    }
    return ['style', styleObject];
  }
  return [
    state.elementAttributeNameCase === 'react' && info.space
      ? hastToReact[info.property] || info.property
      : info.attribute,
    value,
  ];
}
function parseStyle(state, value) {
  try {
    return (0, import_style_to_js.default)(value, { reactCompat: true });
  } catch (error) {
    if (state.ignoreInvalidStyle) {
      return {};
    }
    const cause =
      /** @type {Error} */
      error;
    const message = new VFileMessage('Cannot parse `style` attribute', {
      ancestors: state.ancestors,
      cause,
      ruleId: 'style',
      source: 'hast-util-to-jsx-runtime',
    });
    message.file = state.filePath || void 0;
    message.url = docs + '#cannot-parse-style-attribute';
    throw message;
  }
}
function findComponentFromName(state, name2, allowExpression) {
  let result;
  if (!allowExpression) {
    result = { type: 'Literal', value: name2 };
  } else if (name2.includes('.')) {
    const identifiers = name2.split('.');
    let index = -1;
    let node;
    while (++index < identifiers.length) {
      const prop = name(identifiers[index])
        ? { type: 'Identifier', name: identifiers[index] }
        : { type: 'Literal', value: identifiers[index] };
      node = node
        ? {
            type: 'MemberExpression',
            object: node,
            property: prop,
            computed: Boolean(index && prop.type === 'Literal'),
            optional: false,
          }
        : prop;
    }
    ok(node, 'always a result');
    result = node;
  } else {
    result =
      name(name2) && !/^[a-z]/.test(name2)
        ? { type: 'Identifier', name: name2 }
        : { type: 'Literal', value: name2 };
  }
  if (result.type === 'Literal') {
    const name3 =
      /** @type {string | number} */
      result.value;
    return own.call(state.components, name3) ? state.components[name3] : name3;
  }
  if (state.evaluater) {
    return state.evaluater.evaluateExpression(result);
  }
  crashEstree(state);
}
function crashEstree(state, place) {
  const message = new VFileMessage(
    'Cannot handle MDX estrees without `createEvaluater`',
    {
      ancestors: state.ancestors,
      place,
      ruleId: 'mdx-estree',
      source: 'hast-util-to-jsx-runtime',
    }
  );
  message.file = state.filePath || void 0;
  message.url = docs + '#cannot-handle-mdx-estrees-without-createevaluater';
  throw message;
}
function transformStylesToCssCasing(domCasing) {
  const cssCasing = {};
  let from;
  for (from in domCasing) {
    if (own.call(domCasing, from)) {
      cssCasing[transformStyleToCssCasing(from)] = domCasing[from];
    }
  }
  return cssCasing;
}
function transformStyleToCssCasing(from) {
  let to = from.replace(cap, toDash);
  if (to.slice(0, 3) === 'ms-') to = '-' + to;
  return to;
}
function toDash($0) {
  return '-' + $0.toLowerCase();
}

// ../../node_modules/.pnpm/html-url-attributes@3.0.1/node_modules/html-url-attributes/lib/index.js
var urlAttributes = {
  action: ['form'],
  cite: ['blockquote', 'del', 'ins', 'q'],
  data: ['object'],
  formAction: ['button', 'input'],
  href: ['a', 'area', 'base', 'link'],
  icon: ['menuitem'],
  itemId: null,
  manifest: ['html'],
  ping: ['a', 'area'],
  poster: ['video'],
  src: [
    'audio',
    'embed',
    'iframe',
    'img',
    'input',
    'script',
    'source',
    'track',
    'video',
  ],
};

// ../../node_modules/.pnpm/react-markdown@9.1.0_@types+react@19.1.8_react@19.1.0/node_modules/react-markdown/lib/index.js
var import_jsx_runtime = __toESM(require_jsx_runtime(), 1);
var import_react = __toESM(require_react(), 1);

// ../../node_modules/.pnpm/bail@2.0.2/node_modules/bail/index.js
function bail(error) {
  if (error) {
    throw error;
  }
}

// ../../node_modules/.pnpm/unified@11.0.5/node_modules/unified/lib/index.js
var import_extend = __toESM(require_extend(), 1);

// ../../node_modules/.pnpm/is-plain-obj@4.1.0/node_modules/is-plain-obj/index.js
function isPlainObject(value) {
  if (typeof value !== 'object' || value === null) {
    return false;
  }
  const prototype = Object.getPrototypeOf(value);
  return (
    (prototype === null ||
      prototype === Object.prototype ||
      Object.getPrototypeOf(prototype) === null) &&
    !(Symbol.toStringTag in value) &&
    !(Symbol.iterator in value)
  );
}

// ../../node_modules/.pnpm/trough@2.2.0/node_modules/trough/lib/index.js
function trough() {
  const fns = [];
  const pipeline = { run, use };
  return pipeline;
  function run(...values) {
    let middlewareIndex = -1;
    const callback = values.pop();
    if (typeof callback !== 'function') {
      throw new TypeError(
        'Expected function as last argument, not ' + callback
      );
    }
    next(null, ...values);
    function next(error, ...output) {
      const fn = fns[++middlewareIndex];
      let index = -1;
      if (error) {
        callback(error);
        return;
      }
      while (++index < values.length) {
        if (output[index] === null || output[index] === void 0) {
          output[index] = values[index];
        }
      }
      values = output;
      if (fn) {
        wrap(fn, next)(...output);
      } else {
        callback(null, ...output);
      }
    }
  }
  function use(middelware) {
    if (typeof middelware !== 'function') {
      throw new TypeError(
        'Expected `middelware` to be a function, not ' + middelware
      );
    }
    fns.push(middelware);
    return pipeline;
  }
}
function wrap(middleware, callback) {
  let called;
  return wrapped;
  function wrapped(...parameters) {
    const fnExpectsCallback = middleware.length > parameters.length;
    let result;
    if (fnExpectsCallback) {
      parameters.push(done);
    }
    try {
      result = middleware.apply(this, parameters);
    } catch (error) {
      const exception =
        /** @type {Error} */
        error;
      if (fnExpectsCallback && called) {
        throw exception;
      }
      return done(exception);
    }
    if (!fnExpectsCallback) {
      if (result && result.then && typeof result.then === 'function') {
        result.then(then, done);
      } else if (result instanceof Error) {
        done(result);
      } else {
        then(result);
      }
    }
  }
  function done(error, ...output) {
    if (!called) {
      called = true;
      callback(error, ...output);
    }
  }
  function then(value) {
    done(null, value);
  }
}

// ../../node_modules/.pnpm/vfile@6.0.3/node_modules/vfile/lib/minpath.browser.js
var minpath = { basename, dirname, extname, join, sep: '/' };
function basename(path, extname2) {
  if (extname2 !== void 0 && typeof extname2 !== 'string') {
    throw new TypeError('"ext" argument must be a string');
  }
  assertPath(path);
  let start2 = 0;
  let end = -1;
  let index = path.length;
  let seenNonSlash;
  if (
    extname2 === void 0 ||
    extname2.length === 0 ||
    extname2.length > path.length
  ) {
    while (index--) {
      if (path.codePointAt(index) === 47) {
        if (seenNonSlash) {
          start2 = index + 1;
          break;
        }
      } else if (end < 0) {
        seenNonSlash = true;
        end = index + 1;
      }
    }
    return end < 0 ? '' : path.slice(start2, end);
  }
  if (extname2 === path) {
    return '';
  }
  let firstNonSlashEnd = -1;
  let extnameIndex = extname2.length - 1;
  while (index--) {
    if (path.codePointAt(index) === 47) {
      if (seenNonSlash) {
        start2 = index + 1;
        break;
      }
    } else {
      if (firstNonSlashEnd < 0) {
        seenNonSlash = true;
        firstNonSlashEnd = index + 1;
      }
      if (extnameIndex > -1) {
        if (path.codePointAt(index) === extname2.codePointAt(extnameIndex--)) {
          if (extnameIndex < 0) {
            end = index;
          }
        } else {
          extnameIndex = -1;
          end = firstNonSlashEnd;
        }
      }
    }
  }
  if (start2 === end) {
    end = firstNonSlashEnd;
  } else if (end < 0) {
    end = path.length;
  }
  return path.slice(start2, end);
}
function dirname(path) {
  assertPath(path);
  if (path.length === 0) {
    return '.';
  }
  let end = -1;
  let index = path.length;
  let unmatchedSlash;
  while (--index) {
    if (path.codePointAt(index) === 47) {
      if (unmatchedSlash) {
        end = index;
        break;
      }
    } else if (!unmatchedSlash) {
      unmatchedSlash = true;
    }
  }
  return end < 0
    ? path.codePointAt(0) === 47
      ? '/'
      : '.'
    : end === 1 && path.codePointAt(0) === 47
      ? '//'
      : path.slice(0, end);
}
function extname(path) {
  assertPath(path);
  let index = path.length;
  let end = -1;
  let startPart = 0;
  let startDot = -1;
  let preDotState = 0;
  let unmatchedSlash;
  while (index--) {
    const code = path.codePointAt(index);
    if (code === 47) {
      if (unmatchedSlash) {
        startPart = index + 1;
        break;
      }
      continue;
    }
    if (end < 0) {
      unmatchedSlash = true;
      end = index + 1;
    }
    if (code === 46) {
      if (startDot < 0) {
        startDot = index;
      } else if (preDotState !== 1) {
        preDotState = 1;
      }
    } else if (startDot > -1) {
      preDotState = -1;
    }
  }
  if (
    startDot < 0 ||
    end < 0 || // We saw a non-dot character immediately before the dot.
    preDotState === 0 || // The (right-most) trimmed path component is exactly `..`.
    (preDotState === 1 && startDot === end - 1 && startDot === startPart + 1)
  ) {
    return '';
  }
  return path.slice(startDot, end);
}
function join(...segments) {
  let index = -1;
  let joined;
  while (++index < segments.length) {
    assertPath(segments[index]);
    if (segments[index]) {
      joined =
        joined === void 0 ? segments[index] : joined + '/' + segments[index];
    }
  }
  return joined === void 0 ? '.' : normalize(joined);
}
function normalize(path) {
  assertPath(path);
  const absolute = path.codePointAt(0) === 47;
  let value = normalizeString(path, !absolute);
  if (value.length === 0 && !absolute) {
    value = '.';
  }
  if (value.length > 0 && path.codePointAt(path.length - 1) === 47) {
    value += '/';
  }
  return absolute ? '/' + value : value;
}
function normalizeString(path, allowAboveRoot) {
  let result = '';
  let lastSegmentLength = 0;
  let lastSlash = -1;
  let dots = 0;
  let index = -1;
  let code;
  let lastSlashIndex;
  while (++index <= path.length) {
    if (index < path.length) {
      code = path.codePointAt(index);
    } else if (code === 47) {
      break;
    } else {
      code = 47;
    }
    if (code === 47) {
      if (lastSlash === index - 1 || dots === 1) {
      } else if (lastSlash !== index - 1 && dots === 2) {
        if (
          result.length < 2 ||
          lastSegmentLength !== 2 ||
          result.codePointAt(result.length - 1) !== 46 ||
          result.codePointAt(result.length - 2) !== 46
        ) {
          if (result.length > 2) {
            lastSlashIndex = result.lastIndexOf('/');
            if (lastSlashIndex !== result.length - 1) {
              if (lastSlashIndex < 0) {
                result = '';
                lastSegmentLength = 0;
              } else {
                result = result.slice(0, lastSlashIndex);
                lastSegmentLength = result.length - 1 - result.lastIndexOf('/');
              }
              lastSlash = index;
              dots = 0;
              continue;
            }
          } else if (result.length > 0) {
            result = '';
            lastSegmentLength = 0;
            lastSlash = index;
            dots = 0;
            continue;
          }
        }
        if (allowAboveRoot) {
          result = result.length > 0 ? result + '/..' : '..';
          lastSegmentLength = 2;
        }
      } else {
        if (result.length > 0) {
          result += '/' + path.slice(lastSlash + 1, index);
        } else {
          result = path.slice(lastSlash + 1, index);
        }
        lastSegmentLength = index - lastSlash - 1;
      }
      lastSlash = index;
      dots = 0;
    } else if (code === 46 && dots > -1) {
      dots++;
    } else {
      dots = -1;
    }
  }
  return result;
}
function assertPath(path) {
  if (typeof path !== 'string') {
    throw new TypeError(
      'Path must be a string. Received ' + JSON.stringify(path)
    );
  }
}

// ../../node_modules/.pnpm/vfile@6.0.3/node_modules/vfile/lib/minproc.browser.js
var minproc = { cwd };
function cwd() {
  return '/';
}

// ../../node_modules/.pnpm/vfile@6.0.3/node_modules/vfile/lib/minurl.shared.js
function isUrl(fileUrlOrPath) {
  return Boolean(
    fileUrlOrPath !== null &&
      typeof fileUrlOrPath === 'object' &&
      'href' in fileUrlOrPath &&
      fileUrlOrPath.href &&
      'protocol' in fileUrlOrPath &&
      fileUrlOrPath.protocol && // @ts-expect-error: indexing is fine.
      fileUrlOrPath.auth === void 0
  );
}

// ../../node_modules/.pnpm/vfile@6.0.3/node_modules/vfile/lib/minurl.browser.js
function urlToPath(path) {
  if (typeof path === 'string') {
    path = new URL(path);
  } else if (!isUrl(path)) {
    const error = new TypeError(
      'The "path" argument must be of type string or an instance of URL. Received `' +
        path +
        '`'
    );
    error.code = 'ERR_INVALID_ARG_TYPE';
    throw error;
  }
  if (path.protocol !== 'file:') {
    const error = new TypeError('The URL must be of scheme file');
    error.code = 'ERR_INVALID_URL_SCHEME';
    throw error;
  }
  return getPathFromURLPosix(path);
}
function getPathFromURLPosix(url) {
  if (url.hostname !== '') {
    const error = new TypeError(
      'File URL host must be "localhost" or empty on darwin'
    );
    error.code = 'ERR_INVALID_FILE_URL_HOST';
    throw error;
  }
  const pathname = url.pathname;
  let index = -1;
  while (++index < pathname.length) {
    if (
      pathname.codePointAt(index) === 37 &&
      pathname.codePointAt(index + 1) === 50
    ) {
      const third = pathname.codePointAt(index + 2);
      if (third === 70 || third === 102) {
        const error = new TypeError(
          'File URL path must not include encoded / characters'
        );
        error.code = 'ERR_INVALID_FILE_URL_PATH';
        throw error;
      }
    }
  }
  return decodeURIComponent(pathname);
}

// ../../node_modules/.pnpm/vfile@6.0.3/node_modules/vfile/lib/index.js
var order =
  /** @type {const} */
  ['history', 'path', 'basename', 'stem', 'extname', 'dirname'];
var VFile = class {
  /**
   * Create a new virtual file.
   *
   * `options` is treated as:
   *
   * *   `string` or `Uint8Array` — `{value: options}`
   * *   `URL` — `{path: options}`
   * *   `VFile` — shallow copies its data over to the new file
   * *   `object` — all fields are shallow copied over to the new file
   *
   * Path related fields are set in the following order (least specific to
   * most specific): `history`, `path`, `basename`, `stem`, `extname`,
   * `dirname`.
   *
   * You cannot set `dirname` or `extname` without setting either `history`,
   * `path`, `basename`, or `stem` too.
   *
   * @param {Compatible | null | undefined} [value]
   *   File value.
   * @returns
   *   New instance.
   */
  constructor(value) {
    let options;
    if (!value) {
      options = {};
    } else if (isUrl(value)) {
      options = { path: value };
    } else if (typeof value === 'string' || isUint8Array(value)) {
      options = { value };
    } else {
      options = value;
    }
    this.cwd = 'cwd' in options ? '' : minproc.cwd();
    this.data = {};
    this.history = [];
    this.messages = [];
    this.value;
    this.map;
    this.result;
    this.stored;
    let index = -1;
    while (++index < order.length) {
      const field2 = order[index];
      if (
        field2 in options &&
        options[field2] !== void 0 &&
        options[field2] !== null
      ) {
        this[field2] =
          field2 === 'history' ? [...options[field2]] : options[field2];
      }
    }
    let field;
    for (field in options) {
      if (!order.includes(field)) {
        this[field] = options[field];
      }
    }
  }
  /**
   * Get the basename (including extname) (example: `'index.min.js'`).
   *
   * @returns {string | undefined}
   *   Basename.
   */
  get basename() {
    return typeof this.path === 'string' ? minpath.basename(this.path) : void 0;
  }
  /**
   * Set basename (including extname) (`'index.min.js'`).
   *
   * Cannot contain path separators (`'/'` on unix, macOS, and browsers, `'\'`
   * on windows).
   * Cannot be nullified (use `file.path = file.dirname` instead).
   *
   * @param {string} basename
   *   Basename.
   * @returns {undefined}
   *   Nothing.
   */
  set basename(basename2) {
    assertNonEmpty(basename2, 'basename');
    assertPart(basename2, 'basename');
    this.path = minpath.join(this.dirname || '', basename2);
  }
  /**
   * Get the parent path (example: `'~'`).
   *
   * @returns {string | undefined}
   *   Dirname.
   */
  get dirname() {
    return typeof this.path === 'string' ? minpath.dirname(this.path) : void 0;
  }
  /**
   * Set the parent path (example: `'~'`).
   *
   * Cannot be set if there’s no `path` yet.
   *
   * @param {string | undefined} dirname
   *   Dirname.
   * @returns {undefined}
   *   Nothing.
   */
  set dirname(dirname2) {
    assertPath2(this.basename, 'dirname');
    this.path = minpath.join(dirname2 || '', this.basename);
  }
  /**
   * Get the extname (including dot) (example: `'.js'`).
   *
   * @returns {string | undefined}
   *   Extname.
   */
  get extname() {
    return typeof this.path === 'string' ? minpath.extname(this.path) : void 0;
  }
  /**
   * Set the extname (including dot) (example: `'.js'`).
   *
   * Cannot contain path separators (`'/'` on unix, macOS, and browsers, `'\'`
   * on windows).
   * Cannot be set if there’s no `path` yet.
   *
   * @param {string | undefined} extname
   *   Extname.
   * @returns {undefined}
   *   Nothing.
   */
  set extname(extname2) {
    assertPart(extname2, 'extname');
    assertPath2(this.dirname, 'extname');
    if (extname2) {
      if (extname2.codePointAt(0) !== 46) {
        throw new Error('`extname` must start with `.`');
      }
      if (extname2.includes('.', 1)) {
        throw new Error('`extname` cannot contain multiple dots');
      }
    }
    this.path = minpath.join(this.dirname, this.stem + (extname2 || ''));
  }
  /**
   * Get the full path (example: `'~/index.min.js'`).
   *
   * @returns {string}
   *   Path.
   */
  get path() {
    return this.history[this.history.length - 1];
  }
  /**
   * Set the full path (example: `'~/index.min.js'`).
   *
   * Cannot be nullified.
   * You can set a file URL (a `URL` object with a `file:` protocol) which will
   * be turned into a path with `url.fileURLToPath`.
   *
   * @param {URL | string} path
   *   Path.
   * @returns {undefined}
   *   Nothing.
   */
  set path(path) {
    if (isUrl(path)) {
      path = urlToPath(path);
    }
    assertNonEmpty(path, 'path');
    if (this.path !== path) {
      this.history.push(path);
    }
  }
  /**
   * Get the stem (basename w/o extname) (example: `'index.min'`).
   *
   * @returns {string | undefined}
   *   Stem.
   */
  get stem() {
    return typeof this.path === 'string'
      ? minpath.basename(this.path, this.extname)
      : void 0;
  }
  /**
   * Set the stem (basename w/o extname) (example: `'index.min'`).
   *
   * Cannot contain path separators (`'/'` on unix, macOS, and browsers, `'\'`
   * on windows).
   * Cannot be nullified (use `file.path = file.dirname` instead).
   *
   * @param {string} stem
   *   Stem.
   * @returns {undefined}
   *   Nothing.
   */
  set stem(stem) {
    assertNonEmpty(stem, 'stem');
    assertPart(stem, 'stem');
    this.path = minpath.join(this.dirname || '', stem + (this.extname || ''));
  }
  // Normal prototypal methods.
  /**
   * Create a fatal message for `reason` associated with the file.
   *
   * The `fatal` field of the message is set to `true` (error; file not usable)
   * and the `file` field is set to the current file path.
   * The message is added to the `messages` field on `file`.
   *
   * > 🪦 **Note**: also has obsolete signatures.
   *
   * @overload
   * @param {string} reason
   * @param {MessageOptions | null | undefined} [options]
   * @returns {never}
   *
   * @overload
   * @param {string} reason
   * @param {Node | NodeLike | null | undefined} parent
   * @param {string | null | undefined} [origin]
   * @returns {never}
   *
   * @overload
   * @param {string} reason
   * @param {Point | Position | null | undefined} place
   * @param {string | null | undefined} [origin]
   * @returns {never}
   *
   * @overload
   * @param {string} reason
   * @param {string | null | undefined} [origin]
   * @returns {never}
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {Node | NodeLike | null | undefined} parent
   * @param {string | null | undefined} [origin]
   * @returns {never}
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {Point | Position | null | undefined} place
   * @param {string | null | undefined} [origin]
   * @returns {never}
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {string | null | undefined} [origin]
   * @returns {never}
   *
   * @param {Error | VFileMessage | string} causeOrReason
   *   Reason for message, should use markdown.
   * @param {Node | NodeLike | MessageOptions | Point | Position | string | null | undefined} [optionsOrParentOrPlace]
   *   Configuration (optional).
   * @param {string | null | undefined} [origin]
   *   Place in code where the message originates (example:
   *   `'my-package:my-rule'` or `'my-rule'`).
   * @returns {never}
   *   Never.
   * @throws {VFileMessage}
   *   Message.
   */
  fail(causeOrReason, optionsOrParentOrPlace, origin) {
    const message = this.message(causeOrReason, optionsOrParentOrPlace, origin);
    message.fatal = true;
    throw message;
  }
  /**
   * Create an info message for `reason` associated with the file.
   *
   * The `fatal` field of the message is set to `undefined` (info; change
   * likely not needed) and the `file` field is set to the current file path.
   * The message is added to the `messages` field on `file`.
   *
   * > 🪦 **Note**: also has obsolete signatures.
   *
   * @overload
   * @param {string} reason
   * @param {MessageOptions | null | undefined} [options]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {string} reason
   * @param {Node | NodeLike | null | undefined} parent
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {string} reason
   * @param {Point | Position | null | undefined} place
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {string} reason
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {Node | NodeLike | null | undefined} parent
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {Point | Position | null | undefined} place
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @param {Error | VFileMessage | string} causeOrReason
   *   Reason for message, should use markdown.
   * @param {Node | NodeLike | MessageOptions | Point | Position | string | null | undefined} [optionsOrParentOrPlace]
   *   Configuration (optional).
   * @param {string | null | undefined} [origin]
   *   Place in code where the message originates (example:
   *   `'my-package:my-rule'` or `'my-rule'`).
   * @returns {VFileMessage}
   *   Message.
   */
  info(causeOrReason, optionsOrParentOrPlace, origin) {
    const message = this.message(causeOrReason, optionsOrParentOrPlace, origin);
    message.fatal = void 0;
    return message;
  }
  /**
   * Create a message for `reason` associated with the file.
   *
   * The `fatal` field of the message is set to `false` (warning; change may be
   * needed) and the `file` field is set to the current file path.
   * The message is added to the `messages` field on `file`.
   *
   * > 🪦 **Note**: also has obsolete signatures.
   *
   * @overload
   * @param {string} reason
   * @param {MessageOptions | null | undefined} [options]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {string} reason
   * @param {Node | NodeLike | null | undefined} parent
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {string} reason
   * @param {Point | Position | null | undefined} place
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {string} reason
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {Node | NodeLike | null | undefined} parent
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {Point | Position | null | undefined} place
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @param {Error | VFileMessage | string} causeOrReason
   *   Reason for message, should use markdown.
   * @param {Node | NodeLike | MessageOptions | Point | Position | string | null | undefined} [optionsOrParentOrPlace]
   *   Configuration (optional).
   * @param {string | null | undefined} [origin]
   *   Place in code where the message originates (example:
   *   `'my-package:my-rule'` or `'my-rule'`).
   * @returns {VFileMessage}
   *   Message.
   */
  message(causeOrReason, optionsOrParentOrPlace, origin) {
    const message = new VFileMessage(
      // @ts-expect-error: the overloads are fine.
      causeOrReason,
      optionsOrParentOrPlace,
      origin
    );
    if (this.path) {
      message.name = this.path + ':' + message.name;
      message.file = this.path;
    }
    message.fatal = false;
    this.messages.push(message);
    return message;
  }
  /**
   * Serialize the file.
   *
   * > **Note**: which encodings are supported depends on the engine.
   * > For info on Node.js, see:
   * > <https://nodejs.org/api/util.html#whatwg-supported-encodings>.
   *
   * @param {string | null | undefined} [encoding='utf8']
   *   Character encoding to understand `value` as when it’s a `Uint8Array`
   *   (default: `'utf-8'`).
   * @returns {string}
   *   Serialized file.
   */
  toString(encoding) {
    if (this.value === void 0) {
      return '';
    }
    if (typeof this.value === 'string') {
      return this.value;
    }
    const decoder = new TextDecoder(encoding || void 0);
    return decoder.decode(this.value);
  }
};
function assertPart(part, name2) {
  if (part && part.includes(minpath.sep)) {
    throw new Error(
      '`' + name2 + '` cannot be a path: did not expect `' + minpath.sep + '`'
    );
  }
}
function assertNonEmpty(part, name2) {
  if (!part) {
    throw new Error('`' + name2 + '` cannot be empty');
  }
}
function assertPath2(path, name2) {
  if (!path) {
    throw new Error('Setting `' + name2 + '` requires `path` to be set too');
  }
}
function isUint8Array(value) {
  return Boolean(
    value &&
      typeof value === 'object' &&
      'byteLength' in value &&
      'byteOffset' in value
  );
}

// ../../node_modules/.pnpm/unified@11.0.5/node_modules/unified/lib/callable-instance.js
var CallableInstance =
  /**
   * @type {new <Parameters extends Array<unknown>, Result>(property: string | symbol) => (...parameters: Parameters) => Result}
   */
  /** @type {unknown} */
  /**
   * @this {Function}
   * @param {string | symbol} property
   * @returns {(...parameters: Array<unknown>) => unknown}
   */
  function (property) {
    const self = this;
    const constr = self.constructor;
    const proto =
      /** @type {Record<string | symbol, Function>} */
      // Prototypes do exist.
      // type-coverage:ignore-next-line
      constr.prototype;
    const value = proto[property];
    const apply = function () {
      return value.apply(apply, arguments);
    };
    Object.setPrototypeOf(apply, proto);
    return apply;
  };

// ../../node_modules/.pnpm/unified@11.0.5/node_modules/unified/lib/index.js
var own2 = {}.hasOwnProperty;
var Processor = class _Processor extends CallableInstance {
  /**
   * Create a processor.
   */
  constructor() {
    super('copy');
    this.Compiler = void 0;
    this.Parser = void 0;
    this.attachers = [];
    this.compiler = void 0;
    this.freezeIndex = -1;
    this.frozen = void 0;
    this.namespace = {};
    this.parser = void 0;
    this.transformers = trough();
  }
  /**
   * Copy a processor.
   *
   * @deprecated
   *   This is a private internal method and should not be used.
   * @returns {Processor<ParseTree, HeadTree, TailTree, CompileTree, CompileResult>}
   *   New *unfrozen* processor ({@linkcode Processor}) that is
   *   configured to work the same as its ancestor.
   *   When the descendant processor is configured in the future it does not
   *   affect the ancestral processor.
   */
  copy() {
    const destination =
      /** @type {Processor<ParseTree, HeadTree, TailTree, CompileTree, CompileResult>} */
      new _Processor();
    let index = -1;
    while (++index < this.attachers.length) {
      const attacher = this.attachers[index];
      destination.use(...attacher);
    }
    destination.data((0, import_extend.default)(true, {}, this.namespace));
    return destination;
  }
  /**
   * Configure the processor with info available to all plugins.
   * Information is stored in an object.
   *
   * Typically, options can be given to a specific plugin, but sometimes it
   * makes sense to have information shared with several plugins.
   * For example, a list of HTML elements that are self-closing, which is
   * needed during all phases.
   *
   * > **Note**: setting information cannot occur on *frozen* processors.
   * > Call the processor first to create a new unfrozen processor.
   *
   * > **Note**: to register custom data in TypeScript, augment the
   * > {@linkcode Data} interface.
   *
   * @example
   *   This example show how to get and set info:
   *
   *   ```js
   *   import {unified} from 'unified'
   *
   *   const processor = unified().data('alpha', 'bravo')
   *
   *   processor.data('alpha') // => 'bravo'
   *
   *   processor.data() // => {alpha: 'bravo'}
   *
   *   processor.data({charlie: 'delta'})
   *
   *   processor.data() // => {charlie: 'delta'}
   *   ```
   *
   * @template {keyof Data} Key
   *
   * @overload
   * @returns {Data}
   *
   * @overload
   * @param {Data} dataset
   * @returns {Processor<ParseTree, HeadTree, TailTree, CompileTree, CompileResult>}
   *
   * @overload
   * @param {Key} key
   * @returns {Data[Key]}
   *
   * @overload
   * @param {Key} key
   * @param {Data[Key]} value
   * @returns {Processor<ParseTree, HeadTree, TailTree, CompileTree, CompileResult>}
   *
   * @param {Data | Key} [key]
   *   Key to get or set, or entire dataset to set, or nothing to get the
   *   entire dataset (optional).
   * @param {Data[Key]} [value]
   *   Value to set (optional).
   * @returns {unknown}
   *   The current processor when setting, the value at `key` when getting, or
   *   the entire dataset when getting without key.
   */
  data(key, value) {
    if (typeof key === 'string') {
      if (arguments.length === 2) {
        assertUnfrozen('data', this.frozen);
        this.namespace[key] = value;
        return this;
      }
      return (own2.call(this.namespace, key) && this.namespace[key]) || void 0;
    }
    if (key) {
      assertUnfrozen('data', this.frozen);
      this.namespace = key;
      return this;
    }
    return this.namespace;
  }
  /**
   * Freeze a processor.
   *
   * Frozen processors are meant to be extended and not to be configured
   * directly.
   *
   * When a processor is frozen it cannot be unfrozen.
   * New processors working the same way can be created by calling the
   * processor.
   *
   * It’s possible to freeze processors explicitly by calling `.freeze()`.
   * Processors freeze automatically when `.parse()`, `.run()`, `.runSync()`,
   * `.stringify()`, `.process()`, or `.processSync()` are called.
   *
   * @returns {Processor<ParseTree, HeadTree, TailTree, CompileTree, CompileResult>}
   *   The current processor.
   */
  freeze() {
    if (this.frozen) {
      return this;
    }
    const self =
      /** @type {Processor} */
      /** @type {unknown} */
      this;
    while (++this.freezeIndex < this.attachers.length) {
      const [attacher, ...options] = this.attachers[this.freezeIndex];
      if (options[0] === false) {
        continue;
      }
      if (options[0] === true) {
        options[0] = void 0;
      }
      const transformer = attacher.call(self, ...options);
      if (typeof transformer === 'function') {
        this.transformers.use(transformer);
      }
    }
    this.frozen = true;
    this.freezeIndex = Number.POSITIVE_INFINITY;
    return this;
  }
  /**
   * Parse text to a syntax tree.
   *
   * > **Note**: `parse` freezes the processor if not already *frozen*.
   *
   * > **Note**: `parse` performs the parse phase, not the run phase or other
   * > phases.
   *
   * @param {Compatible | undefined} [file]
   *   file to parse (optional); typically `string` or `VFile`; any value
   *   accepted as `x` in `new VFile(x)`.
   * @returns {ParseTree extends undefined ? Node : ParseTree}
   *   Syntax tree representing `file`.
   */
  parse(file) {
    this.freeze();
    const realFile = vfile(file);
    const parser = this.parser || this.Parser;
    assertParser('parse', parser);
    return parser(String(realFile), realFile);
  }
  /**
   * Process the given file as configured on the processor.
   *
   * > **Note**: `process` freezes the processor if not already *frozen*.
   *
   * > **Note**: `process` performs the parse, run, and stringify phases.
   *
   * @overload
   * @param {Compatible | undefined} file
   * @param {ProcessCallback<VFileWithOutput<CompileResult>>} done
   * @returns {undefined}
   *
   * @overload
   * @param {Compatible | undefined} [file]
   * @returns {Promise<VFileWithOutput<CompileResult>>}
   *
   * @param {Compatible | undefined} [file]
   *   File (optional); typically `string` or `VFile`]; any value accepted as
   *   `x` in `new VFile(x)`.
   * @param {ProcessCallback<VFileWithOutput<CompileResult>> | undefined} [done]
   *   Callback (optional).
   * @returns {Promise<VFile> | undefined}
   *   Nothing if `done` is given.
   *   Otherwise a promise, rejected with a fatal error or resolved with the
   *   processed file.
   *
   *   The parsed, transformed, and compiled value is available at
   *   `file.value` (see note).
   *
   *   > **Note**: unified typically compiles by serializing: most
   *   > compilers return `string` (or `Uint8Array`).
   *   > Some compilers, such as the one configured with
   *   > [`rehype-react`][rehype-react], return other values (in this case, a
   *   > React tree).
   *   > If you’re using a compiler that doesn’t serialize, expect different
   *   > result values.
   *   >
   *   > To register custom results in TypeScript, add them to
   *   > {@linkcode CompileResultMap}.
   *
   *   [rehype-react]: https://github.com/rehypejs/rehype-react
   */
  process(file, done) {
    const self = this;
    this.freeze();
    assertParser('process', this.parser || this.Parser);
    assertCompiler('process', this.compiler || this.Compiler);
    return done ? executor(void 0, done) : new Promise(executor);
    function executor(resolve, reject) {
      const realFile = vfile(file);
      const parseTree =
        /** @type {HeadTree extends undefined ? Node : HeadTree} */
        /** @type {unknown} */
        self.parse(realFile);
      self.run(parseTree, realFile, function (error, tree, file2) {
        if (error || !tree || !file2) {
          return realDone(error);
        }
        const compileTree =
          /** @type {CompileTree extends undefined ? Node : CompileTree} */
          /** @type {unknown} */
          tree;
        const compileResult = self.stringify(compileTree, file2);
        if (looksLikeAValue(compileResult)) {
          file2.value = compileResult;
        } else {
          file2.result = compileResult;
        }
        realDone(
          error,
          /** @type {VFileWithOutput<CompileResult>} */
          file2
        );
      });
      function realDone(error, file2) {
        if (error || !file2) {
          reject(error);
        } else if (resolve) {
          resolve(file2);
        } else {
          ok(done, '`done` is defined if `resolve` is not');
          done(void 0, file2);
        }
      }
    }
  }
  /**
   * Process the given file as configured on the processor.
   *
   * An error is thrown if asynchronous transforms are configured.
   *
   * > **Note**: `processSync` freezes the processor if not already *frozen*.
   *
   * > **Note**: `processSync` performs the parse, run, and stringify phases.
   *
   * @param {Compatible | undefined} [file]
   *   File (optional); typically `string` or `VFile`; any value accepted as
   *   `x` in `new VFile(x)`.
   * @returns {VFileWithOutput<CompileResult>}
   *   The processed file.
   *
   *   The parsed, transformed, and compiled value is available at
   *   `file.value` (see note).
   *
   *   > **Note**: unified typically compiles by serializing: most
   *   > compilers return `string` (or `Uint8Array`).
   *   > Some compilers, such as the one configured with
   *   > [`rehype-react`][rehype-react], return other values (in this case, a
   *   > React tree).
   *   > If you’re using a compiler that doesn’t serialize, expect different
   *   > result values.
   *   >
   *   > To register custom results in TypeScript, add them to
   *   > {@linkcode CompileResultMap}.
   *
   *   [rehype-react]: https://github.com/rehypejs/rehype-react
   */
  processSync(file) {
    let complete = false;
    let result;
    this.freeze();
    assertParser('processSync', this.parser || this.Parser);
    assertCompiler('processSync', this.compiler || this.Compiler);
    this.process(file, realDone);
    assertDone('processSync', 'process', complete);
    ok(result, 'we either bailed on an error or have a tree');
    return result;
    function realDone(error, file2) {
      complete = true;
      bail(error);
      result = file2;
    }
  }
  /**
   * Run *transformers* on a syntax tree.
   *
   * > **Note**: `run` freezes the processor if not already *frozen*.
   *
   * > **Note**: `run` performs the run phase, not other phases.
   *
   * @overload
   * @param {HeadTree extends undefined ? Node : HeadTree} tree
   * @param {RunCallback<TailTree extends undefined ? Node : TailTree>} done
   * @returns {undefined}
   *
   * @overload
   * @param {HeadTree extends undefined ? Node : HeadTree} tree
   * @param {Compatible | undefined} file
   * @param {RunCallback<TailTree extends undefined ? Node : TailTree>} done
   * @returns {undefined}
   *
   * @overload
   * @param {HeadTree extends undefined ? Node : HeadTree} tree
   * @param {Compatible | undefined} [file]
   * @returns {Promise<TailTree extends undefined ? Node : TailTree>}
   *
   * @param {HeadTree extends undefined ? Node : HeadTree} tree
   *   Tree to transform and inspect.
   * @param {(
   *   RunCallback<TailTree extends undefined ? Node : TailTree> |
   *   Compatible
   * )} [file]
   *   File associated with `node` (optional); any value accepted as `x` in
   *   `new VFile(x)`.
   * @param {RunCallback<TailTree extends undefined ? Node : TailTree>} [done]
   *   Callback (optional).
   * @returns {Promise<TailTree extends undefined ? Node : TailTree> | undefined}
   *   Nothing if `done` is given.
   *   Otherwise, a promise rejected with a fatal error or resolved with the
   *   transformed tree.
   */
  run(tree, file, done) {
    assertNode(tree);
    this.freeze();
    const transformers = this.transformers;
    if (!done && typeof file === 'function') {
      done = file;
      file = void 0;
    }
    return done ? executor(void 0, done) : new Promise(executor);
    function executor(resolve, reject) {
      ok(
        typeof file !== 'function',
        '`file` can’t be a `done` anymore, we checked'
      );
      const realFile = vfile(file);
      transformers.run(tree, realFile, realDone);
      function realDone(error, outputTree, file2) {
        const resultingTree =
          /** @type {TailTree extends undefined ? Node : TailTree} */
          outputTree || tree;
        if (error) {
          reject(error);
        } else if (resolve) {
          resolve(resultingTree);
        } else {
          ok(done, '`done` is defined if `resolve` is not');
          done(void 0, resultingTree, file2);
        }
      }
    }
  }
  /**
   * Run *transformers* on a syntax tree.
   *
   * An error is thrown if asynchronous transforms are configured.
   *
   * > **Note**: `runSync` freezes the processor if not already *frozen*.
   *
   * > **Note**: `runSync` performs the run phase, not other phases.
   *
   * @param {HeadTree extends undefined ? Node : HeadTree} tree
   *   Tree to transform and inspect.
   * @param {Compatible | undefined} [file]
   *   File associated with `node` (optional); any value accepted as `x` in
   *   `new VFile(x)`.
   * @returns {TailTree extends undefined ? Node : TailTree}
   *   Transformed tree.
   */
  runSync(tree, file) {
    let complete = false;
    let result;
    this.run(tree, file, realDone);
    assertDone('runSync', 'run', complete);
    ok(result, 'we either bailed on an error or have a tree');
    return result;
    function realDone(error, tree2) {
      bail(error);
      result = tree2;
      complete = true;
    }
  }
  /**
   * Compile a syntax tree.
   *
   * > **Note**: `stringify` freezes the processor if not already *frozen*.
   *
   * > **Note**: `stringify` performs the stringify phase, not the run phase
   * > or other phases.
   *
   * @param {CompileTree extends undefined ? Node : CompileTree} tree
   *   Tree to compile.
   * @param {Compatible | undefined} [file]
   *   File associated with `node` (optional); any value accepted as `x` in
   *   `new VFile(x)`.
   * @returns {CompileResult extends undefined ? Value : CompileResult}
   *   Textual representation of the tree (see note).
   *
   *   > **Note**: unified typically compiles by serializing: most compilers
   *   > return `string` (or `Uint8Array`).
   *   > Some compilers, such as the one configured with
   *   > [`rehype-react`][rehype-react], return other values (in this case, a
   *   > React tree).
   *   > If you’re using a compiler that doesn’t serialize, expect different
   *   > result values.
   *   >
   *   > To register custom results in TypeScript, add them to
   *   > {@linkcode CompileResultMap}.
   *
   *   [rehype-react]: https://github.com/rehypejs/rehype-react
   */
  stringify(tree, file) {
    this.freeze();
    const realFile = vfile(file);
    const compiler = this.compiler || this.Compiler;
    assertCompiler('stringify', compiler);
    assertNode(tree);
    return compiler(tree, realFile);
  }
  /**
   * Configure the processor to use a plugin, a list of usable values, or a
   * preset.
   *
   * If the processor is already using a plugin, the previous plugin
   * configuration is changed based on the options that are passed in.
   * In other words, the plugin is not added a second time.
   *
   * > **Note**: `use` cannot be called on *frozen* processors.
   * > Call the processor first to create a new unfrozen processor.
   *
   * @example
   *   There are many ways to pass plugins to `.use()`.
   *   This example gives an overview:
   *
   *   ```js
   *   import {unified} from 'unified'
   *
   *   unified()
   *     // Plugin with options:
   *     .use(pluginA, {x: true, y: true})
   *     // Passing the same plugin again merges configuration (to `{x: true, y: false, z: true}`):
   *     .use(pluginA, {y: false, z: true})
   *     // Plugins:
   *     .use([pluginB, pluginC])
   *     // Two plugins, the second with options:
   *     .use([pluginD, [pluginE, {}]])
   *     // Preset with plugins and settings:
   *     .use({plugins: [pluginF, [pluginG, {}]], settings: {position: false}})
   *     // Settings only:
   *     .use({settings: {position: false}})
   *   ```
   *
   * @template {Array<unknown>} [Parameters=[]]
   * @template {Node | string | undefined} [Input=undefined]
   * @template [Output=Input]
   *
   * @overload
   * @param {Preset | null | undefined} [preset]
   * @returns {Processor<ParseTree, HeadTree, TailTree, CompileTree, CompileResult>}
   *
   * @overload
   * @param {PluggableList} list
   * @returns {Processor<ParseTree, HeadTree, TailTree, CompileTree, CompileResult>}
   *
   * @overload
   * @param {Plugin<Parameters, Input, Output>} plugin
   * @param {...(Parameters | [boolean])} parameters
   * @returns {UsePlugin<ParseTree, HeadTree, TailTree, CompileTree, CompileResult, Input, Output>}
   *
   * @param {PluggableList | Plugin | Preset | null | undefined} value
   *   Usable value.
   * @param {...unknown} parameters
   *   Parameters, when a plugin is given as a usable value.
   * @returns {Processor<ParseTree, HeadTree, TailTree, CompileTree, CompileResult>}
   *   Current processor.
   */
  use(value, ...parameters) {
    const attachers = this.attachers;
    const namespace = this.namespace;
    assertUnfrozen('use', this.frozen);
    if (value === null || value === void 0) {
    } else if (typeof value === 'function') {
      addPlugin(value, parameters);
    } else if (typeof value === 'object') {
      if (Array.isArray(value)) {
        addList(value);
      } else {
        addPreset(value);
      }
    } else {
      throw new TypeError('Expected usable value, not `' + value + '`');
    }
    return this;
    function add(value2) {
      if (typeof value2 === 'function') {
        addPlugin(value2, []);
      } else if (typeof value2 === 'object') {
        if (Array.isArray(value2)) {
          const [plugin, ...parameters2] =
            /** @type {PluginTuple<Array<unknown>>} */
            value2;
          addPlugin(plugin, parameters2);
        } else {
          addPreset(value2);
        }
      } else {
        throw new TypeError('Expected usable value, not `' + value2 + '`');
      }
    }
    function addPreset(result) {
      if (!('plugins' in result) && !('settings' in result)) {
        throw new Error(
          'Expected usable value but received an empty preset, which is probably a mistake: presets typically come with `plugins` and sometimes with `settings`, but this has neither'
        );
      }
      addList(result.plugins);
      if (result.settings) {
        namespace.settings = (0, import_extend.default)(
          true,
          namespace.settings,
          result.settings
        );
      }
    }
    function addList(plugins) {
      let index = -1;
      if (plugins === null || plugins === void 0) {
      } else if (Array.isArray(plugins)) {
        while (++index < plugins.length) {
          const thing = plugins[index];
          add(thing);
        }
      } else {
        throw new TypeError(
          'Expected a list of plugins, not `' + plugins + '`'
        );
      }
    }
    function addPlugin(plugin, parameters2) {
      let index = -1;
      let entryIndex = -1;
      while (++index < attachers.length) {
        if (attachers[index][0] === plugin) {
          entryIndex = index;
          break;
        }
      }
      if (entryIndex === -1) {
        attachers.push([plugin, ...parameters2]);
      } else if (parameters2.length > 0) {
        let [primary, ...rest] = parameters2;
        const currentPrimary = attachers[entryIndex][1];
        if (isPlainObject(currentPrimary) && isPlainObject(primary)) {
          primary = (0, import_extend.default)(true, currentPrimary, primary);
        }
        attachers[entryIndex] = [plugin, primary, ...rest];
      }
    }
  }
};
var unified = new Processor().freeze();
function assertParser(name2, value) {
  if (typeof value !== 'function') {
    throw new TypeError('Cannot `' + name2 + '` without `parser`');
  }
}
function assertCompiler(name2, value) {
  if (typeof value !== 'function') {
    throw new TypeError('Cannot `' + name2 + '` without `compiler`');
  }
}
function assertUnfrozen(name2, frozen) {
  if (frozen) {
    throw new Error(
      'Cannot call `' +
        name2 +
        '` on a frozen processor.\nCreate a new processor first, by calling it: use `processor()` instead of `processor`.'
    );
  }
}
function assertNode(node) {
  if (!isPlainObject(node) || typeof node.type !== 'string') {
    throw new TypeError('Expected node, got `' + node + '`');
  }
}
function assertDone(name2, asyncName, complete) {
  if (!complete) {
    throw new Error(
      '`' + name2 + '` finished async. Use `' + asyncName + '` instead'
    );
  }
}
function vfile(value) {
  return looksLikeAVFile(value) ? value : new VFile(value);
}
function looksLikeAVFile(value) {
  return Boolean(
    value &&
      typeof value === 'object' &&
      'message' in value &&
      'messages' in value
  );
}
function looksLikeAValue(value) {
  return typeof value === 'string' || isUint8Array2(value);
}
function isUint8Array2(value) {
  return Boolean(
    value &&
      typeof value === 'object' &&
      'byteLength' in value &&
      'byteOffset' in value
  );
}

// ../../node_modules/.pnpm/react-markdown@9.1.0_@types+react@19.1.8_react@19.1.0/node_modules/react-markdown/lib/index.js
var changelog =
  'https://github.com/remarkjs/react-markdown/blob/main/changelog.md';
var emptyPlugins = [];
var emptyRemarkRehypeOptions = { allowDangerousHtml: true };
var safeProtocol = /^(https?|ircs?|mailto|xmpp)$/i;
var deprecations = [
  { from: 'astPlugins', id: 'remove-buggy-html-in-markdown-parser' },
  { from: 'allowDangerousHtml', id: 'remove-buggy-html-in-markdown-parser' },
  {
    from: 'allowNode',
    id: 'replace-allownode-allowedtypes-and-disallowedtypes',
    to: 'allowElement',
  },
  {
    from: 'allowedTypes',
    id: 'replace-allownode-allowedtypes-and-disallowedtypes',
    to: 'allowedElements',
  },
  {
    from: 'disallowedTypes',
    id: 'replace-allownode-allowedtypes-and-disallowedtypes',
    to: 'disallowedElements',
  },
  { from: 'escapeHtml', id: 'remove-buggy-html-in-markdown-parser' },
  { from: 'includeElementIndex', id: '#remove-includeelementindex' },
  {
    from: 'includeNodeIndex',
    id: 'change-includenodeindex-to-includeelementindex',
  },
  { from: 'linkTarget', id: 'remove-linktarget' },
  {
    from: 'plugins',
    id: 'change-plugins-to-remarkplugins',
    to: 'remarkPlugins',
  },
  { from: 'rawSourcePos', id: '#remove-rawsourcepos' },
  { from: 'renderers', id: 'change-renderers-to-components', to: 'components' },
  { from: 'source', id: 'change-source-to-children', to: 'children' },
  { from: 'sourcePos', id: '#remove-sourcepos' },
  { from: 'transformImageUri', id: '#add-urltransform', to: 'urlTransform' },
  { from: 'transformLinkUri', id: '#add-urltransform', to: 'urlTransform' },
];
function Markdown(options) {
  const processor = createProcessor(options);
  const file = createFile(options);
  return post(processor.runSync(processor.parse(file), file), options);
}
async function MarkdownAsync(options) {
  const processor = createProcessor(options);
  const file = createFile(options);
  const tree = await processor.run(processor.parse(file), file);
  return post(tree, options);
}
function MarkdownHooks(options) {
  const processor = createProcessor(options);
  const [error, setError] = (0, import_react.useState)(
    /** @type {Error | undefined} */
    void 0
  );
  const [tree, setTree] = (0, import_react.useState)(
    /** @type {Root | undefined} */
    void 0
  );
  (0, import_react.useEffect)(
    /* c8 ignore next 7 -- hooks are client-only. */
    function () {
      const file = createFile(options);
      processor.run(processor.parse(file), file, function (error2, tree2) {
        setError(error2);
        setTree(tree2);
      });
    },
    [
      options.children,
      options.rehypePlugins,
      options.remarkPlugins,
      options.remarkRehypeOptions,
    ]
  );
  if (error) throw error;
  return tree
    ? post(tree, options)
    : (0, import_react.createElement)(import_jsx_runtime.Fragment);
}
function createProcessor(options) {
  const rehypePlugins = options.rehypePlugins || emptyPlugins;
  const remarkPlugins = options.remarkPlugins || emptyPlugins;
  const remarkRehypeOptions = options.remarkRehypeOptions
    ? { ...options.remarkRehypeOptions, ...emptyRemarkRehypeOptions }
    : emptyRemarkRehypeOptions;
  const processor = unified()
    .use(remarkParse)
    .use(remarkPlugins)
    .use(remarkRehype, remarkRehypeOptions)
    .use(rehypePlugins);
  return processor;
}
function createFile(options) {
  const children = options.children || '';
  const file = new VFile();
  if (typeof children === 'string') {
    file.value = children;
  } else {
    unreachable(
      'Unexpected value `' +
        children +
        '` for `children` prop, expected `string`'
    );
  }
  return file;
}
function post(tree, options) {
  const allowedElements = options.allowedElements;
  const allowElement = options.allowElement;
  const components = options.components;
  const disallowedElements = options.disallowedElements;
  const skipHtml = options.skipHtml;
  const unwrapDisallowed = options.unwrapDisallowed;
  const urlTransform = options.urlTransform || defaultUrlTransform;
  for (const deprecation of deprecations) {
    if (Object.hasOwn(options, deprecation.from)) {
      unreachable(
        'Unexpected `' +
          deprecation.from +
          '` prop, ' +
          (deprecation.to
            ? 'use `' + deprecation.to + '` instead'
            : 'remove it') +
          ' (see <' +
          changelog +
          '#' +
          deprecation.id +
          '> for more info)'
      );
    }
  }
  if (allowedElements && disallowedElements) {
    unreachable(
      'Unexpected combined `allowedElements` and `disallowedElements`, expected one or the other'
    );
  }
  if (options.className) {
    tree = {
      type: 'element',
      tagName: 'div',
      properties: { className: options.className },
      // Assume no doctypes.
      children:
        /** @type {Array<ElementContent>} */
        tree.type === 'root' ? tree.children : [tree],
    };
  }
  visit(tree, transform);
  return toJsxRuntime(tree, {
    Fragment: import_jsx_runtime.Fragment,
    // @ts-expect-error
    // React components are allowed to return numbers,
    // but not according to the types in hast-util-to-jsx-runtime
    components,
    ignoreInvalidStyle: true,
    jsx: import_jsx_runtime.jsx,
    jsxs: import_jsx_runtime.jsxs,
    passKeys: true,
    passNode: true,
  });
  function transform(node, index, parent) {
    if (node.type === 'raw' && parent && typeof index === 'number') {
      if (skipHtml) {
        parent.children.splice(index, 1);
      } else {
        parent.children[index] = { type: 'text', value: node.value };
      }
      return index;
    }
    if (node.type === 'element') {
      let key;
      for (key in urlAttributes) {
        if (
          Object.hasOwn(urlAttributes, key) &&
          Object.hasOwn(node.properties, key)
        ) {
          const value = node.properties[key];
          const test = urlAttributes[key];
          if (test === null || test.includes(node.tagName)) {
            node.properties[key] = urlTransform(String(value || ''), key, node);
          }
        }
      }
    }
    if (node.type === 'element') {
      let remove = allowedElements
        ? !allowedElements.includes(node.tagName)
        : disallowedElements
          ? disallowedElements.includes(node.tagName)
          : false;
      if (!remove && allowElement && typeof index === 'number') {
        remove = !allowElement(node, index, parent);
      }
      if (remove && parent && typeof index === 'number') {
        if (unwrapDisallowed && node.children) {
          parent.children.splice(index, 1, ...node.children);
        } else {
          parent.children.splice(index, 1);
        }
        return index;
      }
    }
  }
}
function defaultUrlTransform(value) {
  const colon = value.indexOf(':');
  const questionMark = value.indexOf('?');
  const numberSign = value.indexOf('#');
  const slash = value.indexOf('/');
  if (
    // If there is no protocol, it’s relative.
    colon === -1 || // If the first colon is after a `?`, `#`, or `/`, it’s not a protocol.
    (slash !== -1 && colon > slash) ||
    (questionMark !== -1 && colon > questionMark) ||
    (numberSign !== -1 && colon > numberSign) || // It is a protocol, it should be allowed.
    safeProtocol.test(value.slice(0, colon))
  ) {
    return value;
  }
  return '';
}
export {
  MarkdownAsync,
  MarkdownHooks,
  Markdown as default,
  defaultUrlTransform,
};
//# sourceMappingURL=react-markdown.js.map
