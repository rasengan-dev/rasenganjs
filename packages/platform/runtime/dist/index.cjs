var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  detectRuntime: () => detectRuntime,
  getEnvFileNames: () => getEnvFileNames,
  parseEnv: () => parseEnv
});
module.exports = __toCommonJS(src_exports);

// src/env.ts
function parseEnv(text) {
  const env = {};
  for (const rawLine of text.split("\n")) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) continue;
    const withoutExport = line.startsWith("export ") ? line.slice(7).trimStart() : line;
    const eqIdx = withoutExport.indexOf("=");
    if (eqIdx === -1) continue;
    const key = withoutExport.slice(0, eqIdx).trim();
    if (!key) continue;
    let value = withoutExport.slice(eqIdx + 1).trim();
    if (value.startsWith('"') && value.endsWith('"') || value.startsWith("'") && value.endsWith("'")) {
      value = value.slice(1, -1);
    }
    env[key] = value;
  }
  return env;
}
function getEnvFileNames(mode) {
  return [".env", ".env.local", `.env.${mode}`, `.env.${mode}.local`];
}
function detectRuntime() {
  if (typeof process !== "undefined" && process.versions?.bun) {
    return "bun";
  }
  if (typeof process !== "undefined" && typeof process.versions?.node === "string") {
    return "node";
  }
  if (typeof self !== "undefined" && typeof FetchEvent !== "undefined") {
    return "workerd";
  }
  return "unknown";
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  detectRuntime,
  getEnvFileNames,
  parseEnv
});
