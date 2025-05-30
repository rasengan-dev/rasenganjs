import { visit } from './chunk-6GFY52XF.js';
import { normalizeUri, ok } from './chunk-W3RG5IXQ.js';

// ../../node_modules/.pnpm/mdast-util-to-hast@13.2.0/node_modules/mdast-util-to-hast/lib/handlers/blockquote.js
function blockquote(state, node) {
  const result = {
    type: 'element',
    tagName: 'blockquote',
    properties: {},
    children: state.wrap(state.all(node), true),
  };
  state.patch(node, result);
  return state.applyData(node, result);
}

// ../../node_modules/.pnpm/mdast-util-to-hast@13.2.0/node_modules/mdast-util-to-hast/lib/handlers/break.js
function hardBreak(state, node) {
  const result = {
    type: 'element',
    tagName: 'br',
    properties: {},
    children: [],
  };
  state.patch(node, result);
  return [state.applyData(node, result), { type: 'text', value: '\n' }];
}

// ../../node_modules/.pnpm/mdast-util-to-hast@13.2.0/node_modules/mdast-util-to-hast/lib/handlers/code.js
function code(state, node) {
  const value = node.value ? node.value + '\n' : '';
  const properties = {};
  if (node.lang) {
    properties.className = ['language-' + node.lang];
  }
  let result = {
    type: 'element',
    tagName: 'code',
    properties,
    children: [{ type: 'text', value }],
  };
  if (node.meta) {
    result.data = { meta: node.meta };
  }
  state.patch(node, result);
  result = state.applyData(node, result);
  result = {
    type: 'element',
    tagName: 'pre',
    properties: {},
    children: [result],
  };
  state.patch(node, result);
  return result;
}

// ../../node_modules/.pnpm/mdast-util-to-hast@13.2.0/node_modules/mdast-util-to-hast/lib/handlers/delete.js
function strikethrough(state, node) {
  const result = {
    type: 'element',
    tagName: 'del',
    properties: {},
    children: state.all(node),
  };
  state.patch(node, result);
  return state.applyData(node, result);
}

// ../../node_modules/.pnpm/mdast-util-to-hast@13.2.0/node_modules/mdast-util-to-hast/lib/handlers/emphasis.js
function emphasis(state, node) {
  const result = {
    type: 'element',
    tagName: 'em',
    properties: {},
    children: state.all(node),
  };
  state.patch(node, result);
  return state.applyData(node, result);
}

// ../../node_modules/.pnpm/mdast-util-to-hast@13.2.0/node_modules/mdast-util-to-hast/lib/handlers/footnote-reference.js
function footnoteReference(state, node) {
  const clobberPrefix =
    typeof state.options.clobberPrefix === 'string'
      ? state.options.clobberPrefix
      : 'user-content-';
  const id = String(node.identifier).toUpperCase();
  const safeId = normalizeUri(id.toLowerCase());
  const index = state.footnoteOrder.indexOf(id);
  let counter;
  let reuseCounter = state.footnoteCounts.get(id);
  if (reuseCounter === void 0) {
    reuseCounter = 0;
    state.footnoteOrder.push(id);
    counter = state.footnoteOrder.length;
  } else {
    counter = index + 1;
  }
  reuseCounter += 1;
  state.footnoteCounts.set(id, reuseCounter);
  const link2 = {
    type: 'element',
    tagName: 'a',
    properties: {
      href: '#' + clobberPrefix + 'fn-' + safeId,
      id:
        clobberPrefix +
        'fnref-' +
        safeId +
        (reuseCounter > 1 ? '-' + reuseCounter : ''),
      dataFootnoteRef: true,
      ariaDescribedBy: ['footnote-label'],
    },
    children: [{ type: 'text', value: String(counter) }],
  };
  state.patch(node, link2);
  const sup = {
    type: 'element',
    tagName: 'sup',
    properties: {},
    children: [link2],
  };
  state.patch(node, sup);
  return state.applyData(node, sup);
}

// ../../node_modules/.pnpm/mdast-util-to-hast@13.2.0/node_modules/mdast-util-to-hast/lib/handlers/heading.js
function heading(state, node) {
  const result = {
    type: 'element',
    tagName: 'h' + node.depth,
    properties: {},
    children: state.all(node),
  };
  state.patch(node, result);
  return state.applyData(node, result);
}

// ../../node_modules/.pnpm/mdast-util-to-hast@13.2.0/node_modules/mdast-util-to-hast/lib/handlers/html.js
function html(state, node) {
  if (state.options.allowDangerousHtml) {
    const result = { type: 'raw', value: node.value };
    state.patch(node, result);
    return state.applyData(node, result);
  }
  return void 0;
}

// ../../node_modules/.pnpm/mdast-util-to-hast@13.2.0/node_modules/mdast-util-to-hast/lib/revert.js
function revert(state, node) {
  const subtype = node.referenceType;
  let suffix = ']';
  if (subtype === 'collapsed') {
    suffix += '[]';
  } else if (subtype === 'full') {
    suffix += '[' + (node.label || node.identifier) + ']';
  }
  if (node.type === 'imageReference') {
    return [{ type: 'text', value: '![' + node.alt + suffix }];
  }
  const contents = state.all(node);
  const head = contents[0];
  if (head && head.type === 'text') {
    head.value = '[' + head.value;
  } else {
    contents.unshift({ type: 'text', value: '[' });
  }
  const tail = contents[contents.length - 1];
  if (tail && tail.type === 'text') {
    tail.value += suffix;
  } else {
    contents.push({ type: 'text', value: suffix });
  }
  return contents;
}

// ../../node_modules/.pnpm/mdast-util-to-hast@13.2.0/node_modules/mdast-util-to-hast/lib/handlers/image-reference.js
function imageReference(state, node) {
  const id = String(node.identifier).toUpperCase();
  const definition = state.definitionById.get(id);
  if (!definition) {
    return revert(state, node);
  }
  const properties = { src: normalizeUri(definition.url || ''), alt: node.alt };
  if (definition.title !== null && definition.title !== void 0) {
    properties.title = definition.title;
  }
  const result = { type: 'element', tagName: 'img', properties, children: [] };
  state.patch(node, result);
  return state.applyData(node, result);
}

// ../../node_modules/.pnpm/mdast-util-to-hast@13.2.0/node_modules/mdast-util-to-hast/lib/handlers/image.js
function image(state, node) {
  const properties = { src: normalizeUri(node.url) };
  if (node.alt !== null && node.alt !== void 0) {
    properties.alt = node.alt;
  }
  if (node.title !== null && node.title !== void 0) {
    properties.title = node.title;
  }
  const result = { type: 'element', tagName: 'img', properties, children: [] };
  state.patch(node, result);
  return state.applyData(node, result);
}

// ../../node_modules/.pnpm/mdast-util-to-hast@13.2.0/node_modules/mdast-util-to-hast/lib/handlers/inline-code.js
function inlineCode(state, node) {
  const text2 = { type: 'text', value: node.value.replace(/\r?\n|\r/g, ' ') };
  state.patch(node, text2);
  const result = {
    type: 'element',
    tagName: 'code',
    properties: {},
    children: [text2],
  };
  state.patch(node, result);
  return state.applyData(node, result);
}

// ../../node_modules/.pnpm/mdast-util-to-hast@13.2.0/node_modules/mdast-util-to-hast/lib/handlers/link-reference.js
function linkReference(state, node) {
  const id = String(node.identifier).toUpperCase();
  const definition = state.definitionById.get(id);
  if (!definition) {
    return revert(state, node);
  }
  const properties = { href: normalizeUri(definition.url || '') };
  if (definition.title !== null && definition.title !== void 0) {
    properties.title = definition.title;
  }
  const result = {
    type: 'element',
    tagName: 'a',
    properties,
    children: state.all(node),
  };
  state.patch(node, result);
  return state.applyData(node, result);
}

// ../../node_modules/.pnpm/mdast-util-to-hast@13.2.0/node_modules/mdast-util-to-hast/lib/handlers/link.js
function link(state, node) {
  const properties = { href: normalizeUri(node.url) };
  if (node.title !== null && node.title !== void 0) {
    properties.title = node.title;
  }
  const result = {
    type: 'element',
    tagName: 'a',
    properties,
    children: state.all(node),
  };
  state.patch(node, result);
  return state.applyData(node, result);
}

// ../../node_modules/.pnpm/mdast-util-to-hast@13.2.0/node_modules/mdast-util-to-hast/lib/handlers/list-item.js
function listItem(state, node, parent) {
  const results = state.all(node);
  const loose = parent ? listLoose(parent) : listItemLoose(node);
  const properties = {};
  const children = [];
  if (typeof node.checked === 'boolean') {
    const head = results[0];
    let paragraph2;
    if (head && head.type === 'element' && head.tagName === 'p') {
      paragraph2 = head;
    } else {
      paragraph2 = {
        type: 'element',
        tagName: 'p',
        properties: {},
        children: [],
      };
      results.unshift(paragraph2);
    }
    if (paragraph2.children.length > 0) {
      paragraph2.children.unshift({ type: 'text', value: ' ' });
    }
    paragraph2.children.unshift({
      type: 'element',
      tagName: 'input',
      properties: { type: 'checkbox', checked: node.checked, disabled: true },
      children: [],
    });
    properties.className = ['task-list-item'];
  }
  let index = -1;
  while (++index < results.length) {
    const child = results[index];
    if (
      loose ||
      index !== 0 ||
      child.type !== 'element' ||
      child.tagName !== 'p'
    ) {
      children.push({ type: 'text', value: '\n' });
    }
    if (child.type === 'element' && child.tagName === 'p' && !loose) {
      children.push(...child.children);
    } else {
      children.push(child);
    }
  }
  const tail = results[results.length - 1];
  if (tail && (loose || tail.type !== 'element' || tail.tagName !== 'p')) {
    children.push({ type: 'text', value: '\n' });
  }
  const result = { type: 'element', tagName: 'li', properties, children };
  state.patch(node, result);
  return state.applyData(node, result);
}
function listLoose(node) {
  let loose = false;
  if (node.type === 'list') {
    loose = node.spread || false;
    const children = node.children;
    let index = -1;
    while (!loose && ++index < children.length) {
      loose = listItemLoose(children[index]);
    }
  }
  return loose;
}
function listItemLoose(node) {
  const spread = node.spread;
  return spread === null || spread === void 0
    ? node.children.length > 1
    : spread;
}

// ../../node_modules/.pnpm/mdast-util-to-hast@13.2.0/node_modules/mdast-util-to-hast/lib/handlers/list.js
function list(state, node) {
  const properties = {};
  const results = state.all(node);
  let index = -1;
  if (typeof node.start === 'number' && node.start !== 1) {
    properties.start = node.start;
  }
  while (++index < results.length) {
    const child = results[index];
    if (
      child.type === 'element' &&
      child.tagName === 'li' &&
      child.properties &&
      Array.isArray(child.properties.className) &&
      child.properties.className.includes('task-list-item')
    ) {
      properties.className = ['contains-task-list'];
      break;
    }
  }
  const result = {
    type: 'element',
    tagName: node.ordered ? 'ol' : 'ul',
    properties,
    children: state.wrap(results, true),
  };
  state.patch(node, result);
  return state.applyData(node, result);
}

// ../../node_modules/.pnpm/mdast-util-to-hast@13.2.0/node_modules/mdast-util-to-hast/lib/handlers/paragraph.js
function paragraph(state, node) {
  const result = {
    type: 'element',
    tagName: 'p',
    properties: {},
    children: state.all(node),
  };
  state.patch(node, result);
  return state.applyData(node, result);
}

// ../../node_modules/.pnpm/mdast-util-to-hast@13.2.0/node_modules/mdast-util-to-hast/lib/handlers/root.js
function root(state, node) {
  const result = { type: 'root', children: state.wrap(state.all(node)) };
  state.patch(node, result);
  return state.applyData(node, result);
}

// ../../node_modules/.pnpm/mdast-util-to-hast@13.2.0/node_modules/mdast-util-to-hast/lib/handlers/strong.js
function strong(state, node) {
  const result = {
    type: 'element',
    tagName: 'strong',
    properties: {},
    children: state.all(node),
  };
  state.patch(node, result);
  return state.applyData(node, result);
}

// ../../node_modules/.pnpm/unist-util-position@5.0.0/node_modules/unist-util-position/lib/index.js
var pointEnd = point('end');
var pointStart = point('start');
function point(type) {
  return point2;
  function point2(node) {
    const point3 = (node && node.position && node.position[type]) || {};
    if (
      typeof point3.line === 'number' &&
      point3.line > 0 &&
      typeof point3.column === 'number' &&
      point3.column > 0
    ) {
      return {
        line: point3.line,
        column: point3.column,
        offset:
          typeof point3.offset === 'number' && point3.offset > -1
            ? point3.offset
            : void 0,
      };
    }
  }
}
function position(node) {
  const start = pointStart(node);
  const end = pointEnd(node);
  if (start && end) {
    return { start, end };
  }
}

// ../../node_modules/.pnpm/mdast-util-to-hast@13.2.0/node_modules/mdast-util-to-hast/lib/handlers/table.js
function table(state, node) {
  const rows = state.all(node);
  const firstRow = rows.shift();
  const tableContent = [];
  if (firstRow) {
    const head = {
      type: 'element',
      tagName: 'thead',
      properties: {},
      children: state.wrap([firstRow], true),
    };
    state.patch(node.children[0], head);
    tableContent.push(head);
  }
  if (rows.length > 0) {
    const body = {
      type: 'element',
      tagName: 'tbody',
      properties: {},
      children: state.wrap(rows, true),
    };
    const start = pointStart(node.children[1]);
    const end = pointEnd(node.children[node.children.length - 1]);
    if (start && end) body.position = { start, end };
    tableContent.push(body);
  }
  const result = {
    type: 'element',
    tagName: 'table',
    properties: {},
    children: state.wrap(tableContent, true),
  };
  state.patch(node, result);
  return state.applyData(node, result);
}

// ../../node_modules/.pnpm/mdast-util-to-hast@13.2.0/node_modules/mdast-util-to-hast/lib/handlers/table-row.js
function tableRow(state, node, parent) {
  const siblings = parent ? parent.children : void 0;
  const rowIndex = siblings ? siblings.indexOf(node) : 1;
  const tagName = rowIndex === 0 ? 'th' : 'td';
  const align = parent && parent.type === 'table' ? parent.align : void 0;
  const length = align ? align.length : node.children.length;
  let cellIndex = -1;
  const cells = [];
  while (++cellIndex < length) {
    const cell = node.children[cellIndex];
    const properties = {};
    const alignValue = align ? align[cellIndex] : void 0;
    if (alignValue) {
      properties.align = alignValue;
    }
    let result2 = { type: 'element', tagName, properties, children: [] };
    if (cell) {
      result2.children = state.all(cell);
      state.patch(cell, result2);
      result2 = state.applyData(cell, result2);
    }
    cells.push(result2);
  }
  const result = {
    type: 'element',
    tagName: 'tr',
    properties: {},
    children: state.wrap(cells, true),
  };
  state.patch(node, result);
  return state.applyData(node, result);
}

// ../../node_modules/.pnpm/mdast-util-to-hast@13.2.0/node_modules/mdast-util-to-hast/lib/handlers/table-cell.js
function tableCell(state, node) {
  const result = {
    type: 'element',
    tagName: 'td',
    // Assume body cell.
    properties: {},
    children: state.all(node),
  };
  state.patch(node, result);
  return state.applyData(node, result);
}

// ../../node_modules/.pnpm/trim-lines@3.0.1/node_modules/trim-lines/index.js
var tab = 9;
var space = 32;
function trimLines(value) {
  const source = String(value);
  const search = /\r?\n|\r/g;
  let match = search.exec(source);
  let last = 0;
  const lines = [];
  while (match) {
    lines.push(
      trimLine(source.slice(last, match.index), last > 0, true),
      match[0]
    );
    last = match.index + match[0].length;
    match = search.exec(source);
  }
  lines.push(trimLine(source.slice(last), last > 0, false));
  return lines.join('');
}
function trimLine(value, start, end) {
  let startIndex = 0;
  let endIndex = value.length;
  if (start) {
    let code2 = value.codePointAt(startIndex);
    while (code2 === tab || code2 === space) {
      startIndex++;
      code2 = value.codePointAt(startIndex);
    }
  }
  if (end) {
    let code2 = value.codePointAt(endIndex - 1);
    while (code2 === tab || code2 === space) {
      endIndex--;
      code2 = value.codePointAt(endIndex - 1);
    }
  }
  return endIndex > startIndex ? value.slice(startIndex, endIndex) : '';
}

// ../../node_modules/.pnpm/mdast-util-to-hast@13.2.0/node_modules/mdast-util-to-hast/lib/handlers/text.js
function text(state, node) {
  const result = { type: 'text', value: trimLines(String(node.value)) };
  state.patch(node, result);
  return state.applyData(node, result);
}

// ../../node_modules/.pnpm/mdast-util-to-hast@13.2.0/node_modules/mdast-util-to-hast/lib/handlers/thematic-break.js
function thematicBreak(state, node) {
  const result = {
    type: 'element',
    tagName: 'hr',
    properties: {},
    children: [],
  };
  state.patch(node, result);
  return state.applyData(node, result);
}

// ../../node_modules/.pnpm/mdast-util-to-hast@13.2.0/node_modules/mdast-util-to-hast/lib/handlers/index.js
var handlers = {
  blockquote,
  break: hardBreak,
  code,
  delete: strikethrough,
  emphasis,
  footnoteReference,
  heading,
  html,
  imageReference,
  image,
  inlineCode,
  linkReference,
  link,
  listItem,
  list,
  paragraph,
  // @ts-expect-error: root is different, but hard to type.
  root,
  strong,
  table,
  tableCell,
  tableRow,
  text,
  thematicBreak,
  toml: ignore,
  yaml: ignore,
  definition: ignore,
  footnoteDefinition: ignore,
};
function ignore() {
  return void 0;
}

// ../../node_modules/.pnpm/@ungap+structured-clone@1.3.0/node_modules/@ungap/structured-clone/esm/types.js
var VOID = -1;
var PRIMITIVE = 0;
var ARRAY = 1;
var OBJECT = 2;
var DATE = 3;
var REGEXP = 4;
var MAP = 5;
var SET = 6;
var ERROR = 7;
var BIGINT = 8;

// ../../node_modules/.pnpm/@ungap+structured-clone@1.3.0/node_modules/@ungap/structured-clone/esm/deserialize.js
var env = typeof self === 'object' ? self : globalThis;
var deserializer = ($, _) => {
  const as = (out, index) => {
    $.set(index, out);
    return out;
  };
  const unpair = (index) => {
    if ($.has(index)) return $.get(index);
    const [type, value] = _[index];
    switch (type) {
      case PRIMITIVE:
      case VOID:
        return as(value, index);
      case ARRAY: {
        const arr = as([], index);
        for (const index2 of value) arr.push(unpair(index2));
        return arr;
      }
      case OBJECT: {
        const object = as({}, index);
        for (const [key, index2] of value) object[unpair(key)] = unpair(index2);
        return object;
      }
      case DATE:
        return as(new Date(value), index);
      case REGEXP: {
        const { source, flags } = value;
        return as(new RegExp(source, flags), index);
      }
      case MAP: {
        const map = as(/* @__PURE__ */ new Map(), index);
        for (const [key, index2] of value) map.set(unpair(key), unpair(index2));
        return map;
      }
      case SET: {
        const set = as(/* @__PURE__ */ new Set(), index);
        for (const index2 of value) set.add(unpair(index2));
        return set;
      }
      case ERROR: {
        const { name, message } = value;
        return as(new env[name](message), index);
      }
      case BIGINT:
        return as(BigInt(value), index);
      case 'BigInt':
        return as(Object(BigInt(value)), index);
      case 'ArrayBuffer':
        return as(new Uint8Array(value).buffer, value);
      case 'DataView': {
        const { buffer } = new Uint8Array(value);
        return as(new DataView(buffer), value);
      }
    }
    return as(new env[type](value), index);
  };
  return unpair;
};
var deserialize = (serialized) =>
  deserializer(/* @__PURE__ */ new Map(), serialized)(0);

// ../../node_modules/.pnpm/@ungap+structured-clone@1.3.0/node_modules/@ungap/structured-clone/esm/serialize.js
var EMPTY = '';
var { toString } = {};
var { keys } = Object;
var typeOf = (value) => {
  const type = typeof value;
  if (type !== 'object' || !value) return [PRIMITIVE, type];
  const asString = toString.call(value).slice(8, -1);
  switch (asString) {
    case 'Array':
      return [ARRAY, EMPTY];
    case 'Object':
      return [OBJECT, EMPTY];
    case 'Date':
      return [DATE, EMPTY];
    case 'RegExp':
      return [REGEXP, EMPTY];
    case 'Map':
      return [MAP, EMPTY];
    case 'Set':
      return [SET, EMPTY];
    case 'DataView':
      return [ARRAY, asString];
  }
  if (asString.includes('Array')) return [ARRAY, asString];
  if (asString.includes('Error')) return [ERROR, asString];
  return [OBJECT, asString];
};
var shouldSkip = ([TYPE, type]) =>
  TYPE === PRIMITIVE && (type === 'function' || type === 'symbol');
var serializer = (strict, json, $, _) => {
  const as = (out, value) => {
    const index = _.push(out) - 1;
    $.set(value, index);
    return index;
  };
  const pair = (value) => {
    if ($.has(value)) return $.get(value);
    let [TYPE, type] = typeOf(value);
    switch (TYPE) {
      case PRIMITIVE: {
        let entry = value;
        switch (type) {
          case 'bigint':
            TYPE = BIGINT;
            entry = value.toString();
            break;
          case 'function':
          case 'symbol':
            if (strict) throw new TypeError('unable to serialize ' + type);
            entry = null;
            break;
          case 'undefined':
            return as([VOID], value);
        }
        return as([TYPE, entry], value);
      }
      case ARRAY: {
        if (type) {
          let spread = value;
          if (type === 'DataView') {
            spread = new Uint8Array(value.buffer);
          } else if (type === 'ArrayBuffer') {
            spread = new Uint8Array(value);
          }
          return as([type, [...spread]], value);
        }
        const arr = [];
        const index = as([TYPE, arr], value);
        for (const entry of value) arr.push(pair(entry));
        return index;
      }
      case OBJECT: {
        if (type) {
          switch (type) {
            case 'BigInt':
              return as([type, value.toString()], value);
            case 'Boolean':
            case 'Number':
            case 'String':
              return as([type, value.valueOf()], value);
          }
        }
        if (json && 'toJSON' in value) return pair(value.toJSON());
        const entries = [];
        const index = as([TYPE, entries], value);
        for (const key of keys(value)) {
          if (strict || !shouldSkip(typeOf(value[key])))
            entries.push([pair(key), pair(value[key])]);
        }
        return index;
      }
      case DATE:
        return as([TYPE, value.toISOString()], value);
      case REGEXP: {
        const { source, flags } = value;
        return as([TYPE, { source, flags }], value);
      }
      case MAP: {
        const entries = [];
        const index = as([TYPE, entries], value);
        for (const [key, entry] of value) {
          if (strict || !(shouldSkip(typeOf(key)) || shouldSkip(typeOf(entry))))
            entries.push([pair(key), pair(entry)]);
        }
        return index;
      }
      case SET: {
        const entries = [];
        const index = as([TYPE, entries], value);
        for (const entry of value) {
          if (strict || !shouldSkip(typeOf(entry))) entries.push(pair(entry));
        }
        return index;
      }
    }
    const { message } = value;
    return as([TYPE, { name: type, message }], value);
  };
  return pair;
};
var serialize = (value, { json, lossy } = {}) => {
  const _ = [];
  return (
    serializer(!(json || lossy), !!json, /* @__PURE__ */ new Map(), _)(value), _
  );
};

// ../../node_modules/.pnpm/@ungap+structured-clone@1.3.0/node_modules/@ungap/structured-clone/esm/index.js
var esm_default =
  typeof structuredClone === 'function'
    ? /* c8 ignore start */
      (any, options) =>
        options && ('json' in options || 'lossy' in options)
          ? deserialize(serialize(any, options))
          : structuredClone(any)
    : (any, options) => deserialize(serialize(any, options));

// ../../node_modules/.pnpm/mdast-util-to-hast@13.2.0/node_modules/mdast-util-to-hast/lib/footer.js
function defaultFootnoteBackContent(_, rereferenceIndex) {
  const result = [{ type: 'text', value: '↩' }];
  if (rereferenceIndex > 1) {
    result.push({
      type: 'element',
      tagName: 'sup',
      properties: {},
      children: [{ type: 'text', value: String(rereferenceIndex) }],
    });
  }
  return result;
}
function defaultFootnoteBackLabel(referenceIndex, rereferenceIndex) {
  return (
    'Back to reference ' +
    (referenceIndex + 1) +
    (rereferenceIndex > 1 ? '-' + rereferenceIndex : '')
  );
}
function footer(state) {
  const clobberPrefix =
    typeof state.options.clobberPrefix === 'string'
      ? state.options.clobberPrefix
      : 'user-content-';
  const footnoteBackContent =
    state.options.footnoteBackContent || defaultFootnoteBackContent;
  const footnoteBackLabel =
    state.options.footnoteBackLabel || defaultFootnoteBackLabel;
  const footnoteLabel = state.options.footnoteLabel || 'Footnotes';
  const footnoteLabelTagName = state.options.footnoteLabelTagName || 'h2';
  const footnoteLabelProperties = state.options.footnoteLabelProperties || {
    className: ['sr-only'],
  };
  const listItems = [];
  let referenceIndex = -1;
  while (++referenceIndex < state.footnoteOrder.length) {
    const definition = state.footnoteById.get(
      state.footnoteOrder[referenceIndex]
    );
    if (!definition) {
      continue;
    }
    const content = state.all(definition);
    const id = String(definition.identifier).toUpperCase();
    const safeId = normalizeUri(id.toLowerCase());
    let rereferenceIndex = 0;
    const backReferences = [];
    const counts = state.footnoteCounts.get(id);
    while (counts !== void 0 && ++rereferenceIndex <= counts) {
      if (backReferences.length > 0) {
        backReferences.push({ type: 'text', value: ' ' });
      }
      let children =
        typeof footnoteBackContent === 'string'
          ? footnoteBackContent
          : footnoteBackContent(referenceIndex, rereferenceIndex);
      if (typeof children === 'string') {
        children = { type: 'text', value: children };
      }
      backReferences.push({
        type: 'element',
        tagName: 'a',
        properties: {
          href:
            '#' +
            clobberPrefix +
            'fnref-' +
            safeId +
            (rereferenceIndex > 1 ? '-' + rereferenceIndex : ''),
          dataFootnoteBackref: '',
          ariaLabel:
            typeof footnoteBackLabel === 'string'
              ? footnoteBackLabel
              : footnoteBackLabel(referenceIndex, rereferenceIndex),
          className: ['data-footnote-backref'],
        },
        children: Array.isArray(children) ? children : [children],
      });
    }
    const tail = content[content.length - 1];
    if (tail && tail.type === 'element' && tail.tagName === 'p') {
      const tailTail = tail.children[tail.children.length - 1];
      if (tailTail && tailTail.type === 'text') {
        tailTail.value += ' ';
      } else {
        tail.children.push({ type: 'text', value: ' ' });
      }
      tail.children.push(...backReferences);
    } else {
      content.push(...backReferences);
    }
    const listItem2 = {
      type: 'element',
      tagName: 'li',
      properties: { id: clobberPrefix + 'fn-' + safeId },
      children: state.wrap(content, true),
    };
    state.patch(definition, listItem2);
    listItems.push(listItem2);
  }
  if (listItems.length === 0) {
    return;
  }
  return {
    type: 'element',
    tagName: 'section',
    properties: { dataFootnotes: true, className: ['footnotes'] },
    children: [
      {
        type: 'element',
        tagName: footnoteLabelTagName,
        properties: {
          ...esm_default(footnoteLabelProperties),
          id: 'footnote-label',
        },
        children: [{ type: 'text', value: footnoteLabel }],
      },
      { type: 'text', value: '\n' },
      {
        type: 'element',
        tagName: 'ol',
        properties: {},
        children: state.wrap(listItems, true),
      },
      { type: 'text', value: '\n' },
    ],
  };
}

// ../../node_modules/.pnpm/mdast-util-to-hast@13.2.0/node_modules/mdast-util-to-hast/lib/state.js
var own = {}.hasOwnProperty;
var emptyOptions = {};
function createState(tree, options) {
  const settings = options || emptyOptions;
  const definitionById = /* @__PURE__ */ new Map();
  const footnoteById = /* @__PURE__ */ new Map();
  const footnoteCounts = /* @__PURE__ */ new Map();
  const handlers2 = { ...handlers, ...settings.handlers };
  const state = {
    all,
    applyData,
    definitionById,
    footnoteById,
    footnoteCounts,
    footnoteOrder: [],
    handlers: handlers2,
    one,
    options: settings,
    patch,
    wrap,
  };
  visit(tree, function (node) {
    if (node.type === 'definition' || node.type === 'footnoteDefinition') {
      const map = node.type === 'definition' ? definitionById : footnoteById;
      const id = String(node.identifier).toUpperCase();
      if (!map.has(id)) {
        map.set(id, node);
      }
    }
  });
  return state;
  function one(node, parent) {
    const type = node.type;
    const handle = state.handlers[type];
    if (own.call(state.handlers, type) && handle) {
      return handle(state, node, parent);
    }
    if (state.options.passThrough && state.options.passThrough.includes(type)) {
      if ('children' in node) {
        const { children, ...shallow } = node;
        const result = esm_default(shallow);
        result.children = state.all(node);
        return result;
      }
      return esm_default(node);
    }
    const unknown = state.options.unknownHandler || defaultUnknownHandler;
    return unknown(state, node, parent);
  }
  function all(parent) {
    const values = [];
    if ('children' in parent) {
      const nodes = parent.children;
      let index = -1;
      while (++index < nodes.length) {
        const result = state.one(nodes[index], parent);
        if (result) {
          if (index && nodes[index - 1].type === 'break') {
            if (!Array.isArray(result) && result.type === 'text') {
              result.value = trimMarkdownSpaceStart(result.value);
            }
            if (!Array.isArray(result) && result.type === 'element') {
              const head = result.children[0];
              if (head && head.type === 'text') {
                head.value = trimMarkdownSpaceStart(head.value);
              }
            }
          }
          if (Array.isArray(result)) {
            values.push(...result);
          } else {
            values.push(result);
          }
        }
      }
    }
    return values;
  }
}
function patch(from, to) {
  if (from.position) to.position = position(from);
}
function applyData(from, to) {
  let result = to;
  if (from && from.data) {
    const hName = from.data.hName;
    const hChildren = from.data.hChildren;
    const hProperties = from.data.hProperties;
    if (typeof hName === 'string') {
      if (result.type === 'element') {
        result.tagName = hName;
      } else {
        const children = 'children' in result ? result.children : [result];
        result = { type: 'element', tagName: hName, properties: {}, children };
      }
    }
    if (result.type === 'element' && hProperties) {
      Object.assign(result.properties, esm_default(hProperties));
    }
    if (
      'children' in result &&
      result.children &&
      hChildren !== null &&
      hChildren !== void 0
    ) {
      result.children = hChildren;
    }
  }
  return result;
}
function defaultUnknownHandler(state, node) {
  const data = node.data || {};
  const result =
    'value' in node &&
    !(own.call(data, 'hProperties') || own.call(data, 'hChildren'))
      ? { type: 'text', value: node.value }
      : {
          type: 'element',
          tagName: 'div',
          properties: {},
          children: state.all(node),
        };
  state.patch(node, result);
  return state.applyData(node, result);
}
function wrap(nodes, loose) {
  const result = [];
  let index = -1;
  if (loose) {
    result.push({ type: 'text', value: '\n' });
  }
  while (++index < nodes.length) {
    if (index) result.push({ type: 'text', value: '\n' });
    result.push(nodes[index]);
  }
  if (loose && nodes.length > 0) {
    result.push({ type: 'text', value: '\n' });
  }
  return result;
}
function trimMarkdownSpaceStart(value) {
  let index = 0;
  let code2 = value.charCodeAt(index);
  while (code2 === 9 || code2 === 32) {
    index++;
    code2 = value.charCodeAt(index);
  }
  return value.slice(index);
}

// ../../node_modules/.pnpm/mdast-util-to-hast@13.2.0/node_modules/mdast-util-to-hast/lib/index.js
function toHast(tree, options) {
  const state = createState(tree, options);
  const node = state.one(tree, void 0);
  const foot = footer(state);
  const result = Array.isArray(node)
    ? { type: 'root', children: node }
    : node || { type: 'root', children: [] };
  if (foot) {
    ok('children' in result);
    result.children.push({ type: 'text', value: '\n' }, foot);
  }
  return result;
}

// ../../node_modules/.pnpm/remark-rehype@11.1.1/node_modules/remark-rehype/lib/index.js
function remarkRehype(destination, options) {
  if (destination && 'run' in destination) {
    return async function (tree, file) {
      const hastTree =
        /** @type {HastRoot} */
        toHast(tree, { file, ...options });
      await destination.run(hastTree, file);
    };
  }
  return function (tree, file) {
    return (
      /** @type {HastRoot} */
      toHast(tree, { file, ...(destination || options) })
    );
  };
}

export {
  pointStart,
  handlers,
  defaultFootnoteBackContent,
  defaultFootnoteBackLabel,
  remarkRehype,
};
//# sourceMappingURL=chunk-I46PM5IZ.js.map
