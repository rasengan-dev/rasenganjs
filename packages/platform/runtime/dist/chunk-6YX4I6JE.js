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

export {
  parseEnv,
  getEnvFileNames,
  detectRuntime
};
