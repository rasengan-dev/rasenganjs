import {
  attention,
  autolink,
  blankLine,
  blockQuote,
  characterEscape,
  characterReference,
  codeFenced,
  codeIndented,
  codeText,
  combineExtensions,
  content,
  decodeNamedCharacterReference,
  decodeNumericCharacterReference,
  decodeString,
  definition,
  factorySpace,
  hardBreakEscape,
  headingAtx,
  htmlFlow,
  htmlText,
  labelEnd,
  labelStartImage,
  labelStartLink,
  lineEnding,
  list,
  normalizeIdentifier,
  push,
  resolveAll,
  setextUnderline,
  splice,
  subtokenize,
  thematicBreak,
  toString,
} from './chunk-34KA3PD2.js';
import {
  codes,
  constants,
  markdownLineEnding,
  ok,
  types,
  values,
} from './chunk-WIQS64A7.js';
import { __commonJS, __export, __toESM } from './chunk-G3PMV62Z.js';

// ../../node_modules/.pnpm/ms@2.1.3/node_modules/ms/index.js
var require_ms = __commonJS({
  '../../node_modules/.pnpm/ms@2.1.3/node_modules/ms/index.js'(
    exports,
    module
  ) {
    var s = 1e3;
    var m = s * 60;
    var h = m * 60;
    var d = h * 24;
    var w = d * 7;
    var y = d * 365.25;
    module.exports = function (val, options) {
      options = options || {};
      var type = typeof val;
      if (type === 'string' && val.length > 0) {
        return parse2(val);
      } else if (type === 'number' && isFinite(val)) {
        return options.long ? fmtLong(val) : fmtShort(val);
      }
      throw new Error(
        'val is not a non-empty string or a valid number. val=' +
          JSON.stringify(val)
      );
    };
    function parse2(str) {
      str = String(str);
      if (str.length > 100) {
        return;
      }
      var match =
        /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
          str
        );
      if (!match) {
        return;
      }
      var n = parseFloat(match[1]);
      var type = (match[2] || 'ms').toLowerCase();
      switch (type) {
        case 'years':
        case 'year':
        case 'yrs':
        case 'yr':
        case 'y':
          return n * y;
        case 'weeks':
        case 'week':
        case 'w':
          return n * w;
        case 'days':
        case 'day':
        case 'd':
          return n * d;
        case 'hours':
        case 'hour':
        case 'hrs':
        case 'hr':
        case 'h':
          return n * h;
        case 'minutes':
        case 'minute':
        case 'mins':
        case 'min':
        case 'm':
          return n * m;
        case 'seconds':
        case 'second':
        case 'secs':
        case 'sec':
        case 's':
          return n * s;
        case 'milliseconds':
        case 'millisecond':
        case 'msecs':
        case 'msec':
        case 'ms':
          return n;
        default:
          return void 0;
      }
    }
    function fmtShort(ms) {
      var msAbs = Math.abs(ms);
      if (msAbs >= d) {
        return Math.round(ms / d) + 'd';
      }
      if (msAbs >= h) {
        return Math.round(ms / h) + 'h';
      }
      if (msAbs >= m) {
        return Math.round(ms / m) + 'm';
      }
      if (msAbs >= s) {
        return Math.round(ms / s) + 's';
      }
      return ms + 'ms';
    }
    function fmtLong(ms) {
      var msAbs = Math.abs(ms);
      if (msAbs >= d) {
        return plural(ms, msAbs, d, 'day');
      }
      if (msAbs >= h) {
        return plural(ms, msAbs, h, 'hour');
      }
      if (msAbs >= m) {
        return plural(ms, msAbs, m, 'minute');
      }
      if (msAbs >= s) {
        return plural(ms, msAbs, s, 'second');
      }
      return ms + ' ms';
    }
    function plural(ms, msAbs, n, name) {
      var isPlural = msAbs >= n * 1.5;
      return Math.round(ms / n) + ' ' + name + (isPlural ? 's' : '');
    }
  },
});

// ../../node_modules/.pnpm/debug@4.4.1/node_modules/debug/src/common.js
var require_common = __commonJS({
  '../../node_modules/.pnpm/debug@4.4.1/node_modules/debug/src/common.js'(
    exports,
    module
  ) {
    function setup(env) {
      createDebug2.debug = createDebug2;
      createDebug2.default = createDebug2;
      createDebug2.coerce = coerce;
      createDebug2.disable = disable2;
      createDebug2.enable = enable;
      createDebug2.enabled = enabled;
      createDebug2.humanize = require_ms();
      createDebug2.destroy = destroy;
      Object.keys(env).forEach((key) => {
        createDebug2[key] = env[key];
      });
      createDebug2.names = [];
      createDebug2.skips = [];
      createDebug2.formatters = {};
      function selectColor(namespace) {
        let hash = 0;
        for (let i = 0; i < namespace.length; i++) {
          hash = (hash << 5) - hash + namespace.charCodeAt(i);
          hash |= 0;
        }
        return createDebug2.colors[Math.abs(hash) % createDebug2.colors.length];
      }
      createDebug2.selectColor = selectColor;
      function createDebug2(namespace) {
        let prevTime;
        let enableOverride = null;
        let namespacesCache;
        let enabledCache;
        function debug2(...args) {
          if (!debug2.enabled) {
            return;
          }
          const self = debug2;
          const curr = Number(/* @__PURE__ */ new Date());
          const ms = curr - (prevTime || curr);
          self.diff = ms;
          self.prev = prevTime;
          self.curr = curr;
          prevTime = curr;
          args[0] = createDebug2.coerce(args[0]);
          if (typeof args[0] !== 'string') {
            args.unshift('%O');
          }
          let index2 = 0;
          args[0] = args[0].replace(/%([a-zA-Z%])/g, (match, format) => {
            if (match === '%%') {
              return '%';
            }
            index2++;
            const formatter = createDebug2.formatters[format];
            if (typeof formatter === 'function') {
              const val = args[index2];
              match = formatter.call(self, val);
              args.splice(index2, 1);
              index2--;
            }
            return match;
          });
          createDebug2.formatArgs.call(self, args);
          const logFn = self.log || createDebug2.log;
          logFn.apply(self, args);
        }
        debug2.namespace = namespace;
        debug2.useColors = createDebug2.useColors();
        debug2.color = createDebug2.selectColor(namespace);
        debug2.extend = extend;
        debug2.destroy = createDebug2.destroy;
        Object.defineProperty(debug2, 'enabled', {
          enumerable: true,
          configurable: false,
          get: () => {
            if (enableOverride !== null) {
              return enableOverride;
            }
            if (namespacesCache !== createDebug2.namespaces) {
              namespacesCache = createDebug2.namespaces;
              enabledCache = createDebug2.enabled(namespace);
            }
            return enabledCache;
          },
          set: (v) => {
            enableOverride = v;
          },
        });
        if (typeof createDebug2.init === 'function') {
          createDebug2.init(debug2);
        }
        return debug2;
      }
      function extend(namespace, delimiter) {
        const newDebug = createDebug2(
          this.namespace +
            (typeof delimiter === 'undefined' ? ':' : delimiter) +
            namespace
        );
        newDebug.log = this.log;
        return newDebug;
      }
      function enable(namespaces) {
        createDebug2.save(namespaces);
        createDebug2.namespaces = namespaces;
        createDebug2.names = [];
        createDebug2.skips = [];
        const split = (typeof namespaces === 'string' ? namespaces : '')
          .trim()
          .replace(/\s+/g, ',')
          .split(',')
          .filter(Boolean);
        for (const ns of split) {
          if (ns[0] === '-') {
            createDebug2.skips.push(ns.slice(1));
          } else {
            createDebug2.names.push(ns);
          }
        }
      }
      function matchesTemplate(search2, template) {
        let searchIndex = 0;
        let templateIndex = 0;
        let starIndex = -1;
        let matchIndex = 0;
        while (searchIndex < search2.length) {
          if (
            templateIndex < template.length &&
            (template[templateIndex] === search2[searchIndex] ||
              template[templateIndex] === '*')
          ) {
            if (template[templateIndex] === '*') {
              starIndex = templateIndex;
              matchIndex = searchIndex;
              templateIndex++;
            } else {
              searchIndex++;
              templateIndex++;
            }
          } else if (starIndex !== -1) {
            templateIndex = starIndex + 1;
            matchIndex++;
            searchIndex = matchIndex;
          } else {
            return false;
          }
        }
        while (
          templateIndex < template.length &&
          template[templateIndex] === '*'
        ) {
          templateIndex++;
        }
        return templateIndex === template.length;
      }
      function disable2() {
        const namespaces = [
          ...createDebug2.names,
          ...createDebug2.skips.map((namespace) => '-' + namespace),
        ].join(',');
        createDebug2.enable('');
        return namespaces;
      }
      function enabled(name) {
        for (const skip of createDebug2.skips) {
          if (matchesTemplate(name, skip)) {
            return false;
          }
        }
        for (const ns of createDebug2.names) {
          if (matchesTemplate(name, ns)) {
            return true;
          }
        }
        return false;
      }
      function coerce(val) {
        if (val instanceof Error) {
          return val.stack || val.message;
        }
        return val;
      }
      function destroy() {
        console.warn(
          'Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.'
        );
      }
      createDebug2.enable(createDebug2.load());
      return createDebug2;
    }
    module.exports = setup;
  },
});

// ../../node_modules/.pnpm/debug@4.4.1/node_modules/debug/src/browser.js
var require_browser = __commonJS({
  '../../node_modules/.pnpm/debug@4.4.1/node_modules/debug/src/browser.js'(
    exports,
    module
  ) {
    exports.formatArgs = formatArgs;
    exports.save = save;
    exports.load = load;
    exports.useColors = useColors;
    exports.storage = localstorage();
    exports.destroy = /* @__PURE__ */ (() => {
      let warned = false;
      return () => {
        if (!warned) {
          warned = true;
          console.warn(
            'Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.'
          );
        }
      };
    })();
    exports.colors = [
      '#0000CC',
      '#0000FF',
      '#0033CC',
      '#0033FF',
      '#0066CC',
      '#0066FF',
      '#0099CC',
      '#0099FF',
      '#00CC00',
      '#00CC33',
      '#00CC66',
      '#00CC99',
      '#00CCCC',
      '#00CCFF',
      '#3300CC',
      '#3300FF',
      '#3333CC',
      '#3333FF',
      '#3366CC',
      '#3366FF',
      '#3399CC',
      '#3399FF',
      '#33CC00',
      '#33CC33',
      '#33CC66',
      '#33CC99',
      '#33CCCC',
      '#33CCFF',
      '#6600CC',
      '#6600FF',
      '#6633CC',
      '#6633FF',
      '#66CC00',
      '#66CC33',
      '#9900CC',
      '#9900FF',
      '#9933CC',
      '#9933FF',
      '#99CC00',
      '#99CC33',
      '#CC0000',
      '#CC0033',
      '#CC0066',
      '#CC0099',
      '#CC00CC',
      '#CC00FF',
      '#CC3300',
      '#CC3333',
      '#CC3366',
      '#CC3399',
      '#CC33CC',
      '#CC33FF',
      '#CC6600',
      '#CC6633',
      '#CC9900',
      '#CC9933',
      '#CCCC00',
      '#CCCC33',
      '#FF0000',
      '#FF0033',
      '#FF0066',
      '#FF0099',
      '#FF00CC',
      '#FF00FF',
      '#FF3300',
      '#FF3333',
      '#FF3366',
      '#FF3399',
      '#FF33CC',
      '#FF33FF',
      '#FF6600',
      '#FF6633',
      '#FF9900',
      '#FF9933',
      '#FFCC00',
      '#FFCC33',
    ];
    function useColors() {
      if (
        typeof window !== 'undefined' &&
        window.process &&
        (window.process.type === 'renderer' || window.process.__nwjs)
      ) {
        return true;
      }
      if (
        typeof navigator !== 'undefined' &&
        navigator.userAgent &&
        navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)
      ) {
        return false;
      }
      let m;
      return (
        (typeof document !== 'undefined' &&
          document.documentElement &&
          document.documentElement.style &&
          document.documentElement.style.WebkitAppearance) || // Is firebug? http://stackoverflow.com/a/398120/376773
        (typeof window !== 'undefined' &&
          window.console &&
          (window.console.firebug ||
            (window.console.exception && window.console.table))) || // Is firefox >= v31?
        // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
        (typeof navigator !== 'undefined' &&
          navigator.userAgent &&
          (m = navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)) &&
          parseInt(m[1], 10) >= 31) || // Double check webkit in userAgent just in case we are in a worker
        (typeof navigator !== 'undefined' &&
          navigator.userAgent &&
          navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/))
      );
    }
    function formatArgs(args) {
      args[0] =
        (this.useColors ? '%c' : '') +
        this.namespace +
        (this.useColors ? ' %c' : ' ') +
        args[0] +
        (this.useColors ? '%c ' : ' ') +
        '+' +
        module.exports.humanize(this.diff);
      if (!this.useColors) {
        return;
      }
      const c = 'color: ' + this.color;
      args.splice(1, 0, c, 'color: inherit');
      let index2 = 0;
      let lastC = 0;
      args[0].replace(/%[a-zA-Z%]/g, (match) => {
        if (match === '%%') {
          return;
        }
        index2++;
        if (match === '%c') {
          lastC = index2;
        }
      });
      args.splice(lastC, 0, c);
    }
    exports.log = console.debug || console.log || (() => {});
    function save(namespaces) {
      try {
        if (namespaces) {
          exports.storage.setItem('debug', namespaces);
        } else {
          exports.storage.removeItem('debug');
        }
      } catch (error) {}
    }
    function load() {
      let r;
      try {
        r =
          exports.storage.getItem('debug') || exports.storage.getItem('DEBUG');
      } catch (error) {}
      if (!r && typeof process !== 'undefined' && 'env' in process) {
        r = process.env.DEBUG;
      }
      return r;
    }
    function localstorage() {
      try {
        return localStorage;
      } catch (error) {}
    }
    module.exports = require_common()(exports);
    var { formatters } = module.exports;
    formatters.j = function (v) {
      try {
        return JSON.stringify(v);
      } catch (error) {
        return '[UnexpectedJSONParseError]: ' + error.message;
      }
    };
  },
});

// ../../node_modules/.pnpm/micromark@4.0.2/node_modules/micromark/dev/lib/compile.js
var hasOwnProperty = {}.hasOwnProperty;

// ../../node_modules/.pnpm/micromark@4.0.2/node_modules/micromark/dev/lib/initialize/content.js
var content2 = { tokenize: initializeContent };
function initializeContent(effects) {
  const contentStart = effects.attempt(
    this.parser.constructs.contentInitial,
    afterContentStartConstruct,
    paragraphInitial
  );
  let previous;
  return contentStart;
  function afterContentStartConstruct(code) {
    ok(code === codes.eof || markdownLineEnding(code), 'expected eol or eof');
    if (code === codes.eof) {
      effects.consume(code);
      return;
    }
    effects.enter(types.lineEnding);
    effects.consume(code);
    effects.exit(types.lineEnding);
    return factorySpace(effects, contentStart, types.linePrefix);
  }
  function paragraphInitial(code) {
    ok(
      code !== codes.eof && !markdownLineEnding(code),
      'expected anything other than a line ending or EOF'
    );
    effects.enter(types.paragraph);
    return lineStart(code);
  }
  function lineStart(code) {
    const token = effects.enter(types.chunkText, {
      contentType: constants.contentTypeText,
      previous,
    });
    if (previous) {
      previous.next = token;
    }
    previous = token;
    return data(code);
  }
  function data(code) {
    if (code === codes.eof) {
      effects.exit(types.chunkText);
      effects.exit(types.paragraph);
      effects.consume(code);
      return;
    }
    if (markdownLineEnding(code)) {
      effects.consume(code);
      effects.exit(types.chunkText);
      return lineStart;
    }
    effects.consume(code);
    return data;
  }
}

// ../../node_modules/.pnpm/micromark@4.0.2/node_modules/micromark/dev/lib/initialize/document.js
var document2 = { tokenize: initializeDocument };
var containerConstruct = { tokenize: tokenizeContainer };
function initializeDocument(effects) {
  const self = this;
  const stack = [];
  let continued = 0;
  let childFlow;
  let childToken;
  let lineStartOffset;
  return start;
  function start(code) {
    if (continued < stack.length) {
      const item = stack[continued];
      self.containerState = item[1];
      ok(
        item[0].continuation,
        'expected `continuation` to be defined on container construct'
      );
      return effects.attempt(
        item[0].continuation,
        documentContinue,
        checkNewContainers
      )(code);
    }
    return checkNewContainers(code);
  }
  function documentContinue(code) {
    ok(
      self.containerState,
      'expected `containerState` to be defined after continuation'
    );
    continued++;
    if (self.containerState._closeFlow) {
      self.containerState._closeFlow = void 0;
      if (childFlow) {
        closeFlow();
      }
      const indexBeforeExits = self.events.length;
      let indexBeforeFlow = indexBeforeExits;
      let point3;
      while (indexBeforeFlow--) {
        if (
          self.events[indexBeforeFlow][0] === 'exit' &&
          self.events[indexBeforeFlow][1].type === types.chunkFlow
        ) {
          point3 = self.events[indexBeforeFlow][1].end;
          break;
        }
      }
      ok(point3, 'could not find previous flow chunk');
      exitContainers(continued);
      let index2 = indexBeforeExits;
      while (index2 < self.events.length) {
        self.events[index2][1].end = { ...point3 };
        index2++;
      }
      splice(
        self.events,
        indexBeforeFlow + 1,
        0,
        self.events.slice(indexBeforeExits)
      );
      self.events.length = index2;
      return checkNewContainers(code);
    }
    return start(code);
  }
  function checkNewContainers(code) {
    if (continued === stack.length) {
      if (!childFlow) {
        return documentContinued(code);
      }
      if (childFlow.currentConstruct && childFlow.currentConstruct.concrete) {
        return flowStart(code);
      }
      self.interrupt = Boolean(
        childFlow.currentConstruct && !childFlow._gfmTableDynamicInterruptHack
      );
    }
    self.containerState = {};
    return effects.check(
      containerConstruct,
      thereIsANewContainer,
      thereIsNoNewContainer
    )(code);
  }
  function thereIsANewContainer(code) {
    if (childFlow) closeFlow();
    exitContainers(continued);
    return documentContinued(code);
  }
  function thereIsNoNewContainer(code) {
    self.parser.lazy[self.now().line] = continued !== stack.length;
    lineStartOffset = self.now().offset;
    return flowStart(code);
  }
  function documentContinued(code) {
    self.containerState = {};
    return effects.attempt(
      containerConstruct,
      containerContinue,
      flowStart
    )(code);
  }
  function containerContinue(code) {
    ok(
      self.currentConstruct,
      'expected `currentConstruct` to be defined on tokenizer'
    );
    ok(
      self.containerState,
      'expected `containerState` to be defined on tokenizer'
    );
    continued++;
    stack.push([self.currentConstruct, self.containerState]);
    return documentContinued(code);
  }
  function flowStart(code) {
    if (code === codes.eof) {
      if (childFlow) closeFlow();
      exitContainers(0);
      effects.consume(code);
      return;
    }
    childFlow = childFlow || self.parser.flow(self.now());
    effects.enter(types.chunkFlow, {
      _tokenizer: childFlow,
      contentType: constants.contentTypeFlow,
      previous: childToken,
    });
    return flowContinue(code);
  }
  function flowContinue(code) {
    if (code === codes.eof) {
      writeToChild(effects.exit(types.chunkFlow), true);
      exitContainers(0);
      effects.consume(code);
      return;
    }
    if (markdownLineEnding(code)) {
      effects.consume(code);
      writeToChild(effects.exit(types.chunkFlow));
      continued = 0;
      self.interrupt = void 0;
      return start;
    }
    effects.consume(code);
    return flowContinue;
  }
  function writeToChild(token, endOfFile) {
    ok(childFlow, 'expected `childFlow` to be defined when continuing');
    const stream = self.sliceStream(token);
    if (endOfFile) stream.push(null);
    token.previous = childToken;
    if (childToken) childToken.next = token;
    childToken = token;
    childFlow.defineSkip(token.start);
    childFlow.write(stream);
    if (self.parser.lazy[token.start.line]) {
      let index2 = childFlow.events.length;
      while (index2--) {
        if (
          // The token starts before the line ending…
          childFlow.events[index2][1].start.offset < lineStartOffset && // …and either is not ended yet…
          (!childFlow.events[index2][1].end || // …or ends after it.
            childFlow.events[index2][1].end.offset > lineStartOffset)
        ) {
          return;
        }
      }
      const indexBeforeExits = self.events.length;
      let indexBeforeFlow = indexBeforeExits;
      let seen;
      let point3;
      while (indexBeforeFlow--) {
        if (
          self.events[indexBeforeFlow][0] === 'exit' &&
          self.events[indexBeforeFlow][1].type === types.chunkFlow
        ) {
          if (seen) {
            point3 = self.events[indexBeforeFlow][1].end;
            break;
          }
          seen = true;
        }
      }
      ok(point3, 'could not find previous flow chunk');
      exitContainers(continued);
      index2 = indexBeforeExits;
      while (index2 < self.events.length) {
        self.events[index2][1].end = { ...point3 };
        index2++;
      }
      splice(
        self.events,
        indexBeforeFlow + 1,
        0,
        self.events.slice(indexBeforeExits)
      );
      self.events.length = index2;
    }
  }
  function exitContainers(size) {
    let index2 = stack.length;
    while (index2-- > size) {
      const entry = stack[index2];
      self.containerState = entry[1];
      ok(entry[0].exit, 'expected `exit` to be defined on container construct');
      entry[0].exit.call(self, effects);
    }
    stack.length = size;
  }
  function closeFlow() {
    ok(
      self.containerState,
      'expected `containerState` to be defined when closing flow'
    );
    ok(childFlow, 'expected `childFlow` to be defined when closing it');
    childFlow.write([codes.eof]);
    childToken = void 0;
    childFlow = void 0;
    self.containerState._closeFlow = void 0;
  }
}
function tokenizeContainer(effects, ok2, nok) {
  ok(
    this.parser.constructs.disable.null,
    'expected `disable.null` to be populated'
  );
  return factorySpace(
    effects,
    effects.attempt(this.parser.constructs.document, ok2, nok),
    types.linePrefix,
    this.parser.constructs.disable.null.includes('codeIndented')
      ? void 0
      : constants.tabSize
  );
}

// ../../node_modules/.pnpm/micromark@4.0.2/node_modules/micromark/dev/lib/initialize/flow.js
var flow = { tokenize: initializeFlow };
function initializeFlow(effects) {
  const self = this;
  const initial = effects.attempt(
    // Try to parse a blank line.
    blankLine,
    atBlankEnding,
    // Try to parse initial flow (essentially, only code).
    effects.attempt(
      this.parser.constructs.flowInitial,
      afterConstruct,
      factorySpace(
        effects,
        effects.attempt(
          this.parser.constructs.flow,
          afterConstruct,
          effects.attempt(content, afterConstruct)
        ),
        types.linePrefix
      )
    )
  );
  return initial;
  function atBlankEnding(code) {
    ok(code === codes.eof || markdownLineEnding(code), 'expected eol or eof');
    if (code === codes.eof) {
      effects.consume(code);
      return;
    }
    effects.enter(types.lineEndingBlank);
    effects.consume(code);
    effects.exit(types.lineEndingBlank);
    self.currentConstruct = void 0;
    return initial;
  }
  function afterConstruct(code) {
    ok(code === codes.eof || markdownLineEnding(code), 'expected eol or eof');
    if (code === codes.eof) {
      effects.consume(code);
      return;
    }
    effects.enter(types.lineEnding);
    effects.consume(code);
    effects.exit(types.lineEnding);
    self.currentConstruct = void 0;
    return initial;
  }
}

// ../../node_modules/.pnpm/micromark@4.0.2/node_modules/micromark/dev/lib/initialize/text.js
var resolver = { resolveAll: createResolver() };
var string = initializeFactory('string');
var text = initializeFactory('text');
function initializeFactory(field) {
  return {
    resolveAll: createResolver(
      field === 'text' ? resolveAllLineSuffixes : void 0
    ),
    tokenize: initializeText,
  };
  function initializeText(effects) {
    const self = this;
    const constructs = this.parser.constructs[field];
    const text3 = effects.attempt(constructs, start, notText);
    return start;
    function start(code) {
      return atBreak(code) ? text3(code) : notText(code);
    }
    function notText(code) {
      if (code === codes.eof) {
        effects.consume(code);
        return;
      }
      effects.enter(types.data);
      effects.consume(code);
      return data;
    }
    function data(code) {
      if (atBreak(code)) {
        effects.exit(types.data);
        return text3(code);
      }
      effects.consume(code);
      return data;
    }
    function atBreak(code) {
      if (code === codes.eof) {
        return true;
      }
      const list2 = constructs[code];
      let index2 = -1;
      if (list2) {
        ok(Array.isArray(list2), 'expected `disable.null` to be populated');
        while (++index2 < list2.length) {
          const item = list2[index2];
          if (!item.previous || item.previous.call(self, self.previous)) {
            return true;
          }
        }
      }
      return false;
    }
  }
}
function createResolver(extraResolver) {
  return resolveAllText;
  function resolveAllText(events, context) {
    let index2 = -1;
    let enter;
    while (++index2 <= events.length) {
      if (enter === void 0) {
        if (events[index2] && events[index2][1].type === types.data) {
          enter = index2;
          index2++;
        }
      } else if (!events[index2] || events[index2][1].type !== types.data) {
        if (index2 !== enter + 2) {
          events[enter][1].end = events[index2 - 1][1].end;
          events.splice(enter + 2, index2 - enter - 2);
          index2 = enter + 2;
        }
        enter = void 0;
      }
    }
    return extraResolver ? extraResolver(events, context) : events;
  }
}
function resolveAllLineSuffixes(events, context) {
  let eventIndex = 0;
  while (++eventIndex <= events.length) {
    if (
      (eventIndex === events.length ||
        events[eventIndex][1].type === types.lineEnding) &&
      events[eventIndex - 1][1].type === types.data
    ) {
      const data = events[eventIndex - 1][1];
      const chunks = context.sliceStream(data);
      let index2 = chunks.length;
      let bufferIndex = -1;
      let size = 0;
      let tabs;
      while (index2--) {
        const chunk = chunks[index2];
        if (typeof chunk === 'string') {
          bufferIndex = chunk.length;
          while (chunk.charCodeAt(bufferIndex - 1) === codes.space) {
            size++;
            bufferIndex--;
          }
          if (bufferIndex) break;
          bufferIndex = -1;
        } else if (chunk === codes.horizontalTab) {
          tabs = true;
          size++;
        } else if (chunk === codes.virtualSpace) {
        } else {
          index2++;
          break;
        }
      }
      if (context._contentTypeTextTrailing && eventIndex === events.length) {
        size = 0;
      }
      if (size) {
        const token = {
          type:
            eventIndex === events.length ||
            tabs ||
            size < constants.hardBreakPrefixSizeMin
              ? types.lineSuffix
              : types.hardBreakTrailing,
          start: {
            _bufferIndex: index2
              ? bufferIndex
              : data.start._bufferIndex + bufferIndex,
            _index: data.start._index + index2,
            line: data.end.line,
            column: data.end.column - size,
            offset: data.end.offset - size,
          },
          end: { ...data.end },
        };
        data.end = { ...token.start };
        if (data.start.offset === data.end.offset) {
          Object.assign(data, token);
        } else {
          events.splice(
            eventIndex,
            0,
            ['enter', token, context],
            ['exit', token, context]
          );
          eventIndex += 2;
        }
      }
      eventIndex++;
    }
  }
  return events;
}

// ../../node_modules/.pnpm/micromark@4.0.2/node_modules/micromark/dev/lib/constructs.js
var constructs_exports = {};
__export(constructs_exports, {
  attentionMarkers: () => attentionMarkers,
  contentInitial: () => contentInitial,
  disable: () => disable,
  document: () => document3,
  flow: () => flow2,
  flowInitial: () => flowInitial,
  insideSpan: () => insideSpan,
  string: () => string2,
  text: () => text2,
});
var document3 = {
  [codes.asterisk]: list,
  [codes.plusSign]: list,
  [codes.dash]: list,
  [codes.digit0]: list,
  [codes.digit1]: list,
  [codes.digit2]: list,
  [codes.digit3]: list,
  [codes.digit4]: list,
  [codes.digit5]: list,
  [codes.digit6]: list,
  [codes.digit7]: list,
  [codes.digit8]: list,
  [codes.digit9]: list,
  [codes.greaterThan]: blockQuote,
};
var contentInitial = {
  [codes.leftSquareBracket]: definition,
};
var flowInitial = {
  [codes.horizontalTab]: codeIndented,
  [codes.virtualSpace]: codeIndented,
  [codes.space]: codeIndented,
};
var flow2 = {
  [codes.numberSign]: headingAtx,
  [codes.asterisk]: thematicBreak,
  [codes.dash]: [setextUnderline, thematicBreak],
  [codes.lessThan]: htmlFlow,
  [codes.equalsTo]: setextUnderline,
  [codes.underscore]: thematicBreak,
  [codes.graveAccent]: codeFenced,
  [codes.tilde]: codeFenced,
};
var string2 = {
  [codes.ampersand]: characterReference,
  [codes.backslash]: characterEscape,
};
var text2 = {
  [codes.carriageReturn]: lineEnding,
  [codes.lineFeed]: lineEnding,
  [codes.carriageReturnLineFeed]: lineEnding,
  [codes.exclamationMark]: labelStartImage,
  [codes.ampersand]: characterReference,
  [codes.asterisk]: attention,
  [codes.lessThan]: [autolink, htmlText],
  [codes.leftSquareBracket]: labelStartLink,
  [codes.backslash]: [hardBreakEscape, characterEscape],
  [codes.rightSquareBracket]: labelEnd,
  [codes.underscore]: attention,
  [codes.graveAccent]: codeText,
};
var insideSpan = { null: [attention, resolver] };
var attentionMarkers = { null: [codes.asterisk, codes.underscore] };
var disable = { null: [] };

// ../../node_modules/.pnpm/micromark@4.0.2/node_modules/micromark/dev/lib/create-tokenizer.js
var import_debug = __toESM(require_browser(), 1);
var debug = (0, import_debug.default)('micromark');
function createTokenizer(parser, initialize, from) {
  let point3 = {
    _bufferIndex: -1,
    _index: 0,
    line: (from && from.line) || 1,
    column: (from && from.column) || 1,
    offset: (from && from.offset) || 0,
  };
  const columnStart = {};
  const resolveAllConstructs = [];
  let chunks = [];
  let stack = [];
  let consumed = true;
  const effects = {
    attempt: constructFactory(onsuccessfulconstruct),
    check: constructFactory(onsuccessfulcheck),
    consume,
    enter,
    exit,
    interrupt: constructFactory(onsuccessfulcheck, { interrupt: true }),
  };
  const context = {
    code: codes.eof,
    containerState: {},
    defineSkip,
    events: [],
    now,
    parser,
    previous: codes.eof,
    sliceSerialize,
    sliceStream,
    write,
  };
  let state = initialize.tokenize.call(context, effects);
  let expectedCode;
  if (initialize.resolveAll) {
    resolveAllConstructs.push(initialize);
  }
  return context;
  function write(slice) {
    chunks = push(chunks, slice);
    main();
    if (chunks[chunks.length - 1] !== codes.eof) {
      return [];
    }
    addResult(initialize, 0);
    context.events = resolveAll(resolveAllConstructs, context.events, context);
    return context.events;
  }
  function sliceSerialize(token, expandTabs) {
    return serializeChunks(sliceStream(token), expandTabs);
  }
  function sliceStream(token) {
    return sliceChunks(chunks, token);
  }
  function now() {
    const { _bufferIndex, _index, line, column, offset } = point3;
    return { _bufferIndex, _index, line, column, offset };
  }
  function defineSkip(value) {
    columnStart[value.line] = value.column;
    accountForPotentialSkip();
    debug('position: define skip: `%j`', point3);
  }
  function main() {
    let chunkIndex;
    while (point3._index < chunks.length) {
      const chunk = chunks[point3._index];
      if (typeof chunk === 'string') {
        chunkIndex = point3._index;
        if (point3._bufferIndex < 0) {
          point3._bufferIndex = 0;
        }
        while (
          point3._index === chunkIndex &&
          point3._bufferIndex < chunk.length
        ) {
          go(chunk.charCodeAt(point3._bufferIndex));
        }
      } else {
        go(chunk);
      }
    }
  }
  function go(code) {
    ok(consumed === true, 'expected character to be consumed');
    consumed = void 0;
    debug('main: passing `%s` to %s', code, state && state.name);
    expectedCode = code;
    ok(typeof state === 'function', 'expected state');
    state = state(code);
  }
  function consume(code) {
    ok(code === expectedCode, 'expected given code to equal expected code');
    debug('consume: `%s`', code);
    ok(
      consumed === void 0,
      'expected code to not have been consumed: this might be because `return x(code)` instead of `return x` was used'
    );
    ok(
      code === null
        ? context.events.length === 0 ||
            context.events[context.events.length - 1][0] === 'exit'
        : context.events[context.events.length - 1][0] === 'enter',
      'expected last token to be open'
    );
    if (markdownLineEnding(code)) {
      point3.line++;
      point3.column = 1;
      point3.offset += code === codes.carriageReturnLineFeed ? 2 : 1;
      accountForPotentialSkip();
      debug('position: after eol: `%j`', point3);
    } else if (code !== codes.virtualSpace) {
      point3.column++;
      point3.offset++;
    }
    if (point3._bufferIndex < 0) {
      point3._index++;
    } else {
      point3._bufferIndex++;
      if (
        point3._bufferIndex === // Points w/ non-negative `_bufferIndex` reference
        // strings.
        /** @type {string} */
        chunks[point3._index].length
      ) {
        point3._bufferIndex = -1;
        point3._index++;
      }
    }
    context.previous = code;
    consumed = true;
  }
  function enter(type, fields) {
    const token = fields || {};
    token.type = type;
    token.start = now();
    ok(typeof type === 'string', 'expected string type');
    ok(type.length > 0, 'expected non-empty string');
    debug('enter: `%s`', type);
    context.events.push(['enter', token, context]);
    stack.push(token);
    return token;
  }
  function exit(type) {
    ok(typeof type === 'string', 'expected string type');
    ok(type.length > 0, 'expected non-empty string');
    const token = stack.pop();
    ok(token, 'cannot close w/o open tokens');
    token.end = now();
    ok(type === token.type, 'expected exit token to match current token');
    ok(
      !(
        token.start._index === token.end._index &&
        token.start._bufferIndex === token.end._bufferIndex
      ),
      'expected non-empty token (`' + type + '`)'
    );
    debug('exit: `%s`', token.type);
    context.events.push(['exit', token, context]);
    return token;
  }
  function onsuccessfulconstruct(construct, info) {
    addResult(construct, info.from);
  }
  function onsuccessfulcheck(_, info) {
    info.restore();
  }
  function constructFactory(onreturn, fields) {
    return hook;
    function hook(constructs, returnState, bogusState) {
      let listOfConstructs;
      let constructIndex;
      let currentConstruct;
      let info;
      return Array.isArray(constructs)
        ? /* c8 ignore next 1 */
          handleListOfConstructs(constructs)
        : 'tokenize' in constructs
          ? // Looks like a construct.
            handleListOfConstructs([
              /** @type {Construct} */
              constructs,
            ])
          : handleMapOfConstructs(constructs);
      function handleMapOfConstructs(map) {
        return start;
        function start(code) {
          const left = code !== null && map[code];
          const all = code !== null && map.null;
          const list2 = [
            // To do: add more extension tests.
            /* c8 ignore next 2 */
            ...(Array.isArray(left) ? left : left ? [left] : []),
            ...(Array.isArray(all) ? all : all ? [all] : []),
          ];
          return handleListOfConstructs(list2)(code);
        }
      }
      function handleListOfConstructs(list2) {
        listOfConstructs = list2;
        constructIndex = 0;
        if (list2.length === 0) {
          ok(bogusState, 'expected `bogusState` to be given');
          return bogusState;
        }
        return handleConstruct(list2[constructIndex]);
      }
      function handleConstruct(construct) {
        return start;
        function start(code) {
          info = store();
          currentConstruct = construct;
          if (!construct.partial) {
            context.currentConstruct = construct;
          }
          ok(
            context.parser.constructs.disable.null,
            'expected `disable.null` to be populated'
          );
          if (
            construct.name &&
            context.parser.constructs.disable.null.includes(construct.name)
          ) {
            return nok(code);
          }
          return construct.tokenize.call(
            // If we do have fields, create an object w/ `context` as its
            // prototype.
            // This allows a “live binding”, which is needed for `interrupt`.
            fields ? Object.assign(Object.create(context), fields) : context,
            effects,
            ok2,
            nok
          )(code);
        }
      }
      function ok2(code) {
        ok(code === expectedCode, 'expected code');
        consumed = true;
        onreturn(currentConstruct, info);
        return returnState;
      }
      function nok(code) {
        ok(code === expectedCode, 'expected code');
        consumed = true;
        info.restore();
        if (++constructIndex < listOfConstructs.length) {
          return handleConstruct(listOfConstructs[constructIndex]);
        }
        return bogusState;
      }
    }
  }
  function addResult(construct, from2) {
    if (construct.resolveAll && !resolveAllConstructs.includes(construct)) {
      resolveAllConstructs.push(construct);
    }
    if (construct.resolve) {
      splice(
        context.events,
        from2,
        context.events.length - from2,
        construct.resolve(context.events.slice(from2), context)
      );
    }
    if (construct.resolveTo) {
      context.events = construct.resolveTo(context.events, context);
    }
    ok(
      construct.partial ||
        context.events.length === 0 ||
        context.events[context.events.length - 1][0] === 'exit',
      'expected last token to end'
    );
  }
  function store() {
    const startPoint = now();
    const startPrevious = context.previous;
    const startCurrentConstruct = context.currentConstruct;
    const startEventsIndex = context.events.length;
    const startStack = Array.from(stack);
    return { from: startEventsIndex, restore };
    function restore() {
      point3 = startPoint;
      context.previous = startPrevious;
      context.currentConstruct = startCurrentConstruct;
      context.events.length = startEventsIndex;
      stack = startStack;
      accountForPotentialSkip();
      debug('position: restore: `%j`', point3);
    }
  }
  function accountForPotentialSkip() {
    if (point3.line in columnStart && point3.column < 2) {
      point3.column = columnStart[point3.line];
      point3.offset += columnStart[point3.line] - 1;
    }
  }
}
function sliceChunks(chunks, token) {
  const startIndex = token.start._index;
  const startBufferIndex = token.start._bufferIndex;
  const endIndex = token.end._index;
  const endBufferIndex = token.end._bufferIndex;
  let view;
  if (startIndex === endIndex) {
    ok(endBufferIndex > -1, 'expected non-negative end buffer index');
    ok(startBufferIndex > -1, 'expected non-negative start buffer index');
    view = [chunks[startIndex].slice(startBufferIndex, endBufferIndex)];
  } else {
    view = chunks.slice(startIndex, endIndex);
    if (startBufferIndex > -1) {
      const head = view[0];
      if (typeof head === 'string') {
        view[0] = head.slice(startBufferIndex);
      } else {
        ok(startBufferIndex === 0, 'expected `startBufferIndex` to be `0`');
        view.shift();
      }
    }
    if (endBufferIndex > 0) {
      view.push(chunks[endIndex].slice(0, endBufferIndex));
    }
  }
  return view;
}
function serializeChunks(chunks, expandTabs) {
  let index2 = -1;
  const result = [];
  let atTab;
  while (++index2 < chunks.length) {
    const chunk = chunks[index2];
    let value;
    if (typeof chunk === 'string') {
      value = chunk;
    } else
      switch (chunk) {
        case codes.carriageReturn: {
          value = values.cr;
          break;
        }
        case codes.lineFeed: {
          value = values.lf;
          break;
        }
        case codes.carriageReturnLineFeed: {
          value = values.cr + values.lf;
          break;
        }
        case codes.horizontalTab: {
          value = expandTabs ? values.space : values.ht;
          break;
        }
        case codes.virtualSpace: {
          if (!expandTabs && atTab) continue;
          value = values.space;
          break;
        }
        default: {
          ok(typeof chunk === 'number', 'expected number');
          value = String.fromCharCode(chunk);
        }
      }
    atTab = chunk === codes.horizontalTab;
    result.push(value);
  }
  return result.join('');
}

// ../../node_modules/.pnpm/micromark@4.0.2/node_modules/micromark/dev/lib/parse.js
function parse(options) {
  const settings = options || {};
  const constructs =
    /** @type {FullNormalizedExtension} */
    combineExtensions([constructs_exports, ...(settings.extensions || [])]);
  const parser = {
    constructs,
    content: create(content2),
    defined: [],
    document: create(document2),
    flow: create(flow),
    lazy: {},
    string: create(string),
    text: create(text),
  };
  return parser;
  function create(initial) {
    return creator;
    function creator(from) {
      return createTokenizer(parser, initial, from);
    }
  }
}

// ../../node_modules/.pnpm/micromark@4.0.2/node_modules/micromark/dev/lib/postprocess.js
function postprocess(events) {
  while (!subtokenize(events)) {}
  return events;
}

// ../../node_modules/.pnpm/micromark@4.0.2/node_modules/micromark/dev/lib/preprocess.js
var search = /[\0\t\n\r]/g;
function preprocess() {
  let column = 1;
  let buffer = '';
  let start = true;
  let atCarriageReturn;
  return preprocessor;
  function preprocessor(value, encoding, end) {
    const chunks = [];
    let match;
    let next;
    let startPosition;
    let endPosition;
    let code;
    value =
      buffer +
      (typeof value === 'string'
        ? value.toString()
        : new TextDecoder(encoding || void 0).decode(value));
    startPosition = 0;
    buffer = '';
    if (start) {
      if (value.charCodeAt(0) === codes.byteOrderMarker) {
        startPosition++;
      }
      start = void 0;
    }
    while (startPosition < value.length) {
      search.lastIndex = startPosition;
      match = search.exec(value);
      endPosition =
        match && match.index !== void 0 ? match.index : value.length;
      code = value.charCodeAt(endPosition);
      if (!match) {
        buffer = value.slice(startPosition);
        break;
      }
      if (
        code === codes.lf &&
        startPosition === endPosition &&
        atCarriageReturn
      ) {
        chunks.push(codes.carriageReturnLineFeed);
        atCarriageReturn = void 0;
      } else {
        if (atCarriageReturn) {
          chunks.push(codes.carriageReturn);
          atCarriageReturn = void 0;
        }
        if (startPosition < endPosition) {
          chunks.push(value.slice(startPosition, endPosition));
          column += endPosition - startPosition;
        }
        switch (code) {
          case codes.nul: {
            chunks.push(codes.replacementCharacter);
            column++;
            break;
          }
          case codes.ht: {
            next = Math.ceil(column / constants.tabSize) * constants.tabSize;
            chunks.push(codes.horizontalTab);
            while (column++ < next) chunks.push(codes.virtualSpace);
            break;
          }
          case codes.lf: {
            chunks.push(codes.lineFeed);
            column = 1;
            break;
          }
          default: {
            atCarriageReturn = true;
            column = 1;
          }
        }
      }
      startPosition = endPosition + 1;
    }
    if (end) {
      if (atCarriageReturn) chunks.push(codes.carriageReturn);
      if (buffer) chunks.push(buffer);
      chunks.push(codes.eof);
    }
    return chunks;
  }
}

// ../../node_modules/.pnpm/unist-util-stringify-position@4.0.0/node_modules/unist-util-stringify-position/lib/index.js
function stringifyPosition(value) {
  if (!value || typeof value !== 'object') {
    return '';
  }
  if ('position' in value || 'type' in value) {
    return position(value.position);
  }
  if ('start' in value || 'end' in value) {
    return position(value);
  }
  if ('line' in value || 'column' in value) {
    return point(value);
  }
  return '';
}
function point(point3) {
  return index(point3 && point3.line) + ':' + index(point3 && point3.column);
}
function position(pos) {
  return point(pos && pos.start) + '-' + point(pos && pos.end);
}
function index(value) {
  return value && typeof value === 'number' ? value : 1;
}

// ../../node_modules/.pnpm/mdast-util-from-markdown@2.0.2/node_modules/mdast-util-from-markdown/dev/lib/index.js
var own = {}.hasOwnProperty;
function fromMarkdown(value, encoding, options) {
  if (typeof encoding !== 'string') {
    options = encoding;
    encoding = void 0;
  }
  return compiler(options)(
    postprocess(
      parse(options)
        .document()
        .write(preprocess()(value, encoding, true))
    )
  );
}
function compiler(options) {
  const config = {
    transforms: [],
    canContainEols: ['emphasis', 'fragment', 'heading', 'paragraph', 'strong'],
    enter: {
      autolink: opener(link),
      autolinkProtocol: onenterdata,
      autolinkEmail: onenterdata,
      atxHeading: opener(heading),
      blockQuote: opener(blockQuote2),
      characterEscape: onenterdata,
      characterReference: onenterdata,
      codeFenced: opener(codeFlow),
      codeFencedFenceInfo: buffer,
      codeFencedFenceMeta: buffer,
      codeIndented: opener(codeFlow, buffer),
      codeText: opener(codeText2, buffer),
      codeTextData: onenterdata,
      data: onenterdata,
      codeFlowValue: onenterdata,
      definition: opener(definition2),
      definitionDestinationString: buffer,
      definitionLabelString: buffer,
      definitionTitleString: buffer,
      emphasis: opener(emphasis),
      hardBreakEscape: opener(hardBreak),
      hardBreakTrailing: opener(hardBreak),
      htmlFlow: opener(html, buffer),
      htmlFlowData: onenterdata,
      htmlText: opener(html, buffer),
      htmlTextData: onenterdata,
      image: opener(image),
      label: buffer,
      link: opener(link),
      listItem: opener(listItem),
      listItemValue: onenterlistitemvalue,
      listOrdered: opener(list2, onenterlistordered),
      listUnordered: opener(list2),
      paragraph: opener(paragraph),
      reference: onenterreference,
      referenceString: buffer,
      resourceDestinationString: buffer,
      resourceTitleString: buffer,
      setextHeading: opener(heading),
      strong: opener(strong),
      thematicBreak: opener(thematicBreak2),
    },
    exit: {
      atxHeading: closer(),
      atxHeadingSequence: onexitatxheadingsequence,
      autolink: closer(),
      autolinkEmail: onexitautolinkemail,
      autolinkProtocol: onexitautolinkprotocol,
      blockQuote: closer(),
      characterEscapeValue: onexitdata,
      characterReferenceMarkerHexadecimal: onexitcharacterreferencemarker,
      characterReferenceMarkerNumeric: onexitcharacterreferencemarker,
      characterReferenceValue: onexitcharacterreferencevalue,
      characterReference: onexitcharacterreference,
      codeFenced: closer(onexitcodefenced),
      codeFencedFence: onexitcodefencedfence,
      codeFencedFenceInfo: onexitcodefencedfenceinfo,
      codeFencedFenceMeta: onexitcodefencedfencemeta,
      codeFlowValue: onexitdata,
      codeIndented: closer(onexitcodeindented),
      codeText: closer(onexitcodetext),
      codeTextData: onexitdata,
      data: onexitdata,
      definition: closer(),
      definitionDestinationString: onexitdefinitiondestinationstring,
      definitionLabelString: onexitdefinitionlabelstring,
      definitionTitleString: onexitdefinitiontitlestring,
      emphasis: closer(),
      hardBreakEscape: closer(onexithardbreak),
      hardBreakTrailing: closer(onexithardbreak),
      htmlFlow: closer(onexithtmlflow),
      htmlFlowData: onexitdata,
      htmlText: closer(onexithtmltext),
      htmlTextData: onexitdata,
      image: closer(onexitimage),
      label: onexitlabel,
      labelText: onexitlabeltext,
      lineEnding: onexitlineending,
      link: closer(onexitlink),
      listItem: closer(),
      listOrdered: closer(),
      listUnordered: closer(),
      paragraph: closer(),
      referenceString: onexitreferencestring,
      resourceDestinationString: onexitresourcedestinationstring,
      resourceTitleString: onexitresourcetitlestring,
      resource: onexitresource,
      setextHeading: closer(onexitsetextheading),
      setextHeadingLineSequence: onexitsetextheadinglinesequence,
      setextHeadingText: onexitsetextheadingtext,
      strong: closer(),
      thematicBreak: closer(),
    },
  };
  configure(config, (options || {}).mdastExtensions || []);
  const data = {};
  return compile2;
  function compile2(events) {
    let tree = { type: 'root', children: [] };
    const context = {
      stack: [tree],
      tokenStack: [],
      config,
      enter,
      exit,
      buffer,
      resume,
      data,
    };
    const listStack = [];
    let index2 = -1;
    while (++index2 < events.length) {
      if (
        events[index2][1].type === types.listOrdered ||
        events[index2][1].type === types.listUnordered
      ) {
        if (events[index2][0] === 'enter') {
          listStack.push(index2);
        } else {
          const tail = listStack.pop();
          ok(typeof tail === 'number', 'expected list ot be open');
          index2 = prepareList(events, tail, index2);
        }
      }
    }
    index2 = -1;
    while (++index2 < events.length) {
      const handler = config[events[index2][0]];
      if (own.call(handler, events[index2][1].type)) {
        handler[events[index2][1].type].call(
          Object.assign(
            { sliceSerialize: events[index2][2].sliceSerialize },
            context
          ),
          events[index2][1]
        );
      }
    }
    if (context.tokenStack.length > 0) {
      const tail = context.tokenStack[context.tokenStack.length - 1];
      const handler = tail[1] || defaultOnError;
      handler.call(context, void 0, tail[0]);
    }
    tree.position = {
      start: point2(
        events.length > 0
          ? events[0][1].start
          : { line: 1, column: 1, offset: 0 }
      ),
      end: point2(
        events.length > 0
          ? events[events.length - 2][1].end
          : { line: 1, column: 1, offset: 0 }
      ),
    };
    index2 = -1;
    while (++index2 < config.transforms.length) {
      tree = config.transforms[index2](tree) || tree;
    }
    return tree;
  }
  function prepareList(events, start, length) {
    let index2 = start - 1;
    let containerBalance = -1;
    let listSpread = false;
    let listItem2;
    let lineIndex;
    let firstBlankLineIndex;
    let atMarker;
    while (++index2 <= length) {
      const event = events[index2];
      switch (event[1].type) {
        case types.listUnordered:
        case types.listOrdered:
        case types.blockQuote: {
          if (event[0] === 'enter') {
            containerBalance++;
          } else {
            containerBalance--;
          }
          atMarker = void 0;
          break;
        }
        case types.lineEndingBlank: {
          if (event[0] === 'enter') {
            if (
              listItem2 &&
              !atMarker &&
              !containerBalance &&
              !firstBlankLineIndex
            ) {
              firstBlankLineIndex = index2;
            }
            atMarker = void 0;
          }
          break;
        }
        case types.linePrefix:
        case types.listItemValue:
        case types.listItemMarker:
        case types.listItemPrefix:
        case types.listItemPrefixWhitespace: {
          break;
        }
        default: {
          atMarker = void 0;
        }
      }
      if (
        (!containerBalance &&
          event[0] === 'enter' &&
          event[1].type === types.listItemPrefix) ||
        (containerBalance === -1 &&
          event[0] === 'exit' &&
          (event[1].type === types.listUnordered ||
            event[1].type === types.listOrdered))
      ) {
        if (listItem2) {
          let tailIndex = index2;
          lineIndex = void 0;
          while (tailIndex--) {
            const tailEvent = events[tailIndex];
            if (
              tailEvent[1].type === types.lineEnding ||
              tailEvent[1].type === types.lineEndingBlank
            ) {
              if (tailEvent[0] === 'exit') continue;
              if (lineIndex) {
                events[lineIndex][1].type = types.lineEndingBlank;
                listSpread = true;
              }
              tailEvent[1].type = types.lineEnding;
              lineIndex = tailIndex;
            } else if (
              tailEvent[1].type === types.linePrefix ||
              tailEvent[1].type === types.blockQuotePrefix ||
              tailEvent[1].type === types.blockQuotePrefixWhitespace ||
              tailEvent[1].type === types.blockQuoteMarker ||
              tailEvent[1].type === types.listItemIndent
            ) {
            } else {
              break;
            }
          }
          if (
            firstBlankLineIndex &&
            (!lineIndex || firstBlankLineIndex < lineIndex)
          ) {
            listItem2._spread = true;
          }
          listItem2.end = Object.assign(
            {},
            lineIndex ? events[lineIndex][1].start : event[1].end
          );
          events.splice(lineIndex || index2, 0, ['exit', listItem2, event[2]]);
          index2++;
          length++;
        }
        if (event[1].type === types.listItemPrefix) {
          const item = {
            type: 'listItem',
            _spread: false,
            start: Object.assign({}, event[1].start),
            // @ts-expect-error: we’ll add `end` in a second.
            end: void 0,
          };
          listItem2 = item;
          events.splice(index2, 0, ['enter', item, event[2]]);
          index2++;
          length++;
          firstBlankLineIndex = void 0;
          atMarker = true;
        }
      }
    }
    events[start][1]._spread = listSpread;
    return length;
  }
  function opener(create, and) {
    return open;
    function open(token) {
      enter.call(this, create(token), token);
      if (and) and.call(this, token);
    }
  }
  function buffer() {
    this.stack.push({ type: 'fragment', children: [] });
  }
  function enter(node, token, errorHandler) {
    const parent = this.stack[this.stack.length - 1];
    ok(parent, 'expected `parent`');
    ok('children' in parent, 'expected `parent`');
    const siblings = parent.children;
    siblings.push(node);
    this.stack.push(node);
    this.tokenStack.push([token, errorHandler || void 0]);
    node.position = {
      start: point2(token.start),
      // @ts-expect-error: `end` will be patched later.
      end: void 0,
    };
  }
  function closer(and) {
    return close;
    function close(token) {
      if (and) and.call(this, token);
      exit.call(this, token);
    }
  }
  function exit(token, onExitError) {
    const node = this.stack.pop();
    ok(node, 'expected `node`');
    const open = this.tokenStack.pop();
    if (!open) {
      throw new Error(
        'Cannot close `' +
          token.type +
          '` (' +
          stringifyPosition({ start: token.start, end: token.end }) +
          '): it’s not open'
      );
    } else if (open[0].type !== token.type) {
      if (onExitError) {
        onExitError.call(this, token, open[0]);
      } else {
        const handler = open[1] || defaultOnError;
        handler.call(this, token, open[0]);
      }
    }
    ok(node.type !== 'fragment', 'unexpected fragment `exit`ed');
    ok(node.position, 'expected `position` to be defined');
    node.position.end = point2(token.end);
  }
  function resume() {
    return toString(this.stack.pop());
  }
  function onenterlistordered() {
    this.data.expectingFirstListItemValue = true;
  }
  function onenterlistitemvalue(token) {
    if (this.data.expectingFirstListItemValue) {
      const ancestor = this.stack[this.stack.length - 2];
      ok(ancestor, 'expected nodes on stack');
      ok(ancestor.type === 'list', 'expected list on stack');
      ancestor.start = Number.parseInt(
        this.sliceSerialize(token),
        constants.numericBaseDecimal
      );
      this.data.expectingFirstListItemValue = void 0;
    }
  }
  function onexitcodefencedfenceinfo() {
    const data2 = this.resume();
    const node = this.stack[this.stack.length - 1];
    ok(node, 'expected node on stack');
    ok(node.type === 'code', 'expected code on stack');
    node.lang = data2;
  }
  function onexitcodefencedfencemeta() {
    const data2 = this.resume();
    const node = this.stack[this.stack.length - 1];
    ok(node, 'expected node on stack');
    ok(node.type === 'code', 'expected code on stack');
    node.meta = data2;
  }
  function onexitcodefencedfence() {
    if (this.data.flowCodeInside) return;
    this.buffer();
    this.data.flowCodeInside = true;
  }
  function onexitcodefenced() {
    const data2 = this.resume();
    const node = this.stack[this.stack.length - 1];
    ok(node, 'expected node on stack');
    ok(node.type === 'code', 'expected code on stack');
    node.value = data2.replace(/^(\r?\n|\r)|(\r?\n|\r)$/g, '');
    this.data.flowCodeInside = void 0;
  }
  function onexitcodeindented() {
    const data2 = this.resume();
    const node = this.stack[this.stack.length - 1];
    ok(node, 'expected node on stack');
    ok(node.type === 'code', 'expected code on stack');
    node.value = data2.replace(/(\r?\n|\r)$/g, '');
  }
  function onexitdefinitionlabelstring(token) {
    const label = this.resume();
    const node = this.stack[this.stack.length - 1];
    ok(node, 'expected node on stack');
    ok(node.type === 'definition', 'expected definition on stack');
    node.label = label;
    node.identifier = normalizeIdentifier(
      this.sliceSerialize(token)
    ).toLowerCase();
  }
  function onexitdefinitiontitlestring() {
    const data2 = this.resume();
    const node = this.stack[this.stack.length - 1];
    ok(node, 'expected node on stack');
    ok(node.type === 'definition', 'expected definition on stack');
    node.title = data2;
  }
  function onexitdefinitiondestinationstring() {
    const data2 = this.resume();
    const node = this.stack[this.stack.length - 1];
    ok(node, 'expected node on stack');
    ok(node.type === 'definition', 'expected definition on stack');
    node.url = data2;
  }
  function onexitatxheadingsequence(token) {
    const node = this.stack[this.stack.length - 1];
    ok(node, 'expected node on stack');
    ok(node.type === 'heading', 'expected heading on stack');
    if (!node.depth) {
      const depth = this.sliceSerialize(token).length;
      ok(
        depth === 1 ||
          depth === 2 ||
          depth === 3 ||
          depth === 4 ||
          depth === 5 ||
          depth === 6,
        'expected `depth` between `1` and `6`'
      );
      node.depth = depth;
    }
  }
  function onexitsetextheadingtext() {
    this.data.setextHeadingSlurpLineEnding = true;
  }
  function onexitsetextheadinglinesequence(token) {
    const node = this.stack[this.stack.length - 1];
    ok(node, 'expected node on stack');
    ok(node.type === 'heading', 'expected heading on stack');
    node.depth =
      this.sliceSerialize(token).codePointAt(0) === codes.equalsTo ? 1 : 2;
  }
  function onexitsetextheading() {
    this.data.setextHeadingSlurpLineEnding = void 0;
  }
  function onenterdata(token) {
    const node = this.stack[this.stack.length - 1];
    ok(node, 'expected node on stack');
    ok('children' in node, 'expected parent on stack');
    const siblings = node.children;
    let tail = siblings[siblings.length - 1];
    if (!tail || tail.type !== 'text') {
      tail = text3();
      tail.position = {
        start: point2(token.start),
        // @ts-expect-error: we’ll add `end` later.
        end: void 0,
      };
      siblings.push(tail);
    }
    this.stack.push(tail);
  }
  function onexitdata(token) {
    const tail = this.stack.pop();
    ok(tail, 'expected a `node` to be on the stack');
    ok('value' in tail, 'expected a `literal` to be on the stack');
    ok(tail.position, 'expected `node` to have an open position');
    tail.value += this.sliceSerialize(token);
    tail.position.end = point2(token.end);
  }
  function onexitlineending(token) {
    const context = this.stack[this.stack.length - 1];
    ok(context, 'expected `node`');
    if (this.data.atHardBreak) {
      ok('children' in context, 'expected `parent`');
      const tail = context.children[context.children.length - 1];
      ok(tail.position, 'expected tail to have a starting position');
      tail.position.end = point2(token.end);
      this.data.atHardBreak = void 0;
      return;
    }
    if (
      !this.data.setextHeadingSlurpLineEnding &&
      config.canContainEols.includes(context.type)
    ) {
      onenterdata.call(this, token);
      onexitdata.call(this, token);
    }
  }
  function onexithardbreak() {
    this.data.atHardBreak = true;
  }
  function onexithtmlflow() {
    const data2 = this.resume();
    const node = this.stack[this.stack.length - 1];
    ok(node, 'expected node on stack');
    ok(node.type === 'html', 'expected html on stack');
    node.value = data2;
  }
  function onexithtmltext() {
    const data2 = this.resume();
    const node = this.stack[this.stack.length - 1];
    ok(node, 'expected node on stack');
    ok(node.type === 'html', 'expected html on stack');
    node.value = data2;
  }
  function onexitcodetext() {
    const data2 = this.resume();
    const node = this.stack[this.stack.length - 1];
    ok(node, 'expected node on stack');
    ok(node.type === 'inlineCode', 'expected inline code on stack');
    node.value = data2;
  }
  function onexitlink() {
    const node = this.stack[this.stack.length - 1];
    ok(node, 'expected node on stack');
    ok(node.type === 'link', 'expected link on stack');
    if (this.data.inReference) {
      const referenceType = this.data.referenceType || 'shortcut';
      node.type += 'Reference';
      node.referenceType = referenceType;
      delete node.url;
      delete node.title;
    } else {
      delete node.identifier;
      delete node.label;
    }
    this.data.referenceType = void 0;
  }
  function onexitimage() {
    const node = this.stack[this.stack.length - 1];
    ok(node, 'expected node on stack');
    ok(node.type === 'image', 'expected image on stack');
    if (this.data.inReference) {
      const referenceType = this.data.referenceType || 'shortcut';
      node.type += 'Reference';
      node.referenceType = referenceType;
      delete node.url;
      delete node.title;
    } else {
      delete node.identifier;
      delete node.label;
    }
    this.data.referenceType = void 0;
  }
  function onexitlabeltext(token) {
    const string3 = this.sliceSerialize(token);
    const ancestor = this.stack[this.stack.length - 2];
    ok(ancestor, 'expected ancestor on stack');
    ok(
      ancestor.type === 'image' || ancestor.type === 'link',
      'expected image or link on stack'
    );
    ancestor.label = decodeString(string3);
    ancestor.identifier = normalizeIdentifier(string3).toLowerCase();
  }
  function onexitlabel() {
    const fragment = this.stack[this.stack.length - 1];
    ok(fragment, 'expected node on stack');
    ok(fragment.type === 'fragment', 'expected fragment on stack');
    const value = this.resume();
    const node = this.stack[this.stack.length - 1];
    ok(node, 'expected node on stack');
    ok(
      node.type === 'image' || node.type === 'link',
      'expected image or link on stack'
    );
    this.data.inReference = true;
    if (node.type === 'link') {
      const children = fragment.children;
      node.children = children;
    } else {
      node.alt = value;
    }
  }
  function onexitresourcedestinationstring() {
    const data2 = this.resume();
    const node = this.stack[this.stack.length - 1];
    ok(node, 'expected node on stack');
    ok(
      node.type === 'image' || node.type === 'link',
      'expected image or link on stack'
    );
    node.url = data2;
  }
  function onexitresourcetitlestring() {
    const data2 = this.resume();
    const node = this.stack[this.stack.length - 1];
    ok(node, 'expected node on stack');
    ok(
      node.type === 'image' || node.type === 'link',
      'expected image or link on stack'
    );
    node.title = data2;
  }
  function onexitresource() {
    this.data.inReference = void 0;
  }
  function onenterreference() {
    this.data.referenceType = 'collapsed';
  }
  function onexitreferencestring(token) {
    const label = this.resume();
    const node = this.stack[this.stack.length - 1];
    ok(node, 'expected node on stack');
    ok(
      node.type === 'image' || node.type === 'link',
      'expected image reference or link reference on stack'
    );
    node.label = label;
    node.identifier = normalizeIdentifier(
      this.sliceSerialize(token)
    ).toLowerCase();
    this.data.referenceType = 'full';
  }
  function onexitcharacterreferencemarker(token) {
    ok(
      token.type === 'characterReferenceMarkerNumeric' ||
        token.type === 'characterReferenceMarkerHexadecimal'
    );
    this.data.characterReferenceType = token.type;
  }
  function onexitcharacterreferencevalue(token) {
    const data2 = this.sliceSerialize(token);
    const type = this.data.characterReferenceType;
    let value;
    if (type) {
      value = decodeNumericCharacterReference(
        data2,
        type === types.characterReferenceMarkerNumeric
          ? constants.numericBaseDecimal
          : constants.numericBaseHexadecimal
      );
      this.data.characterReferenceType = void 0;
    } else {
      const result = decodeNamedCharacterReference(data2);
      ok(result !== false, 'expected reference to decode');
      value = result;
    }
    const tail = this.stack[this.stack.length - 1];
    ok(tail, 'expected `node`');
    ok('value' in tail, 'expected `node.value`');
    tail.value += value;
  }
  function onexitcharacterreference(token) {
    const tail = this.stack.pop();
    ok(tail, 'expected `node`');
    ok(tail.position, 'expected `node.position`');
    tail.position.end = point2(token.end);
  }
  function onexitautolinkprotocol(token) {
    onexitdata.call(this, token);
    const node = this.stack[this.stack.length - 1];
    ok(node, 'expected node on stack');
    ok(node.type === 'link', 'expected link on stack');
    node.url = this.sliceSerialize(token);
  }
  function onexitautolinkemail(token) {
    onexitdata.call(this, token);
    const node = this.stack[this.stack.length - 1];
    ok(node, 'expected node on stack');
    ok(node.type === 'link', 'expected link on stack');
    node.url = 'mailto:' + this.sliceSerialize(token);
  }
  function blockQuote2() {
    return { type: 'blockquote', children: [] };
  }
  function codeFlow() {
    return { type: 'code', lang: null, meta: null, value: '' };
  }
  function codeText2() {
    return { type: 'inlineCode', value: '' };
  }
  function definition2() {
    return {
      type: 'definition',
      identifier: '',
      label: null,
      title: null,
      url: '',
    };
  }
  function emphasis() {
    return { type: 'emphasis', children: [] };
  }
  function heading() {
    return {
      type: 'heading',
      // @ts-expect-error `depth` will be set later.
      depth: 0,
      children: [],
    };
  }
  function hardBreak() {
    return { type: 'break' };
  }
  function html() {
    return { type: 'html', value: '' };
  }
  function image() {
    return { type: 'image', title: null, url: '', alt: null };
  }
  function link() {
    return { type: 'link', title: null, url: '', children: [] };
  }
  function list2(token) {
    return {
      type: 'list',
      ordered: token.type === 'listOrdered',
      start: null,
      spread: token._spread,
      children: [],
    };
  }
  function listItem(token) {
    return {
      type: 'listItem',
      spread: token._spread,
      checked: null,
      children: [],
    };
  }
  function paragraph() {
    return { type: 'paragraph', children: [] };
  }
  function strong() {
    return { type: 'strong', children: [] };
  }
  function text3() {
    return { type: 'text', value: '' };
  }
  function thematicBreak2() {
    return { type: 'thematicBreak' };
  }
}
function point2(d) {
  return { line: d.line, column: d.column, offset: d.offset };
}
function configure(combined, extensions) {
  let index2 = -1;
  while (++index2 < extensions.length) {
    const value = extensions[index2];
    if (Array.isArray(value)) {
      configure(combined, value);
    } else {
      extension(combined, value);
    }
  }
}
function extension(combined, extension2) {
  let key;
  for (key in extension2) {
    if (own.call(extension2, key)) {
      switch (key) {
        case 'canContainEols': {
          const right = extension2[key];
          if (right) {
            combined[key].push(...right);
          }
          break;
        }
        case 'transforms': {
          const right = extension2[key];
          if (right) {
            combined[key].push(...right);
          }
          break;
        }
        case 'enter':
        case 'exit': {
          const right = extension2[key];
          if (right) {
            Object.assign(combined[key], right);
          }
          break;
        }
      }
    }
  }
}
function defaultOnError(left, right) {
  if (left) {
    throw new Error(
      'Cannot close `' +
        left.type +
        '` (' +
        stringifyPosition({ start: left.start, end: left.end }) +
        '): a different token (`' +
        right.type +
        '`, ' +
        stringifyPosition({ start: right.start, end: right.end }) +
        ') is open'
    );
  } else {
    throw new Error(
      'Cannot close document, a token (`' +
        right.type +
        '`, ' +
        stringifyPosition({ start: right.start, end: right.end }) +
        ') is still open'
    );
  }
}

// ../../node_modules/.pnpm/remark-parse@11.0.0/node_modules/remark-parse/lib/index.js
function remarkParse(options) {
  const self = this;
  self.parser = parser;
  function parser(doc) {
    return fromMarkdown(doc, {
      ...self.data('settings'),
      ...options,
      // Note: these options are not in the readme.
      // The goal is for them to be set by plugins on `data` instead of being
      // passed by users.
      extensions: self.data('micromarkExtensions') || [],
      mdastExtensions: self.data('fromMarkdownExtensions') || [],
    });
  }
}

export { stringifyPosition, remarkParse };
//# sourceMappingURL=chunk-GLKJXOMW.js.map
