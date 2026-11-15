## Unreleased

## 1.1.0 (2026-11-15)

### Features

- **i18n:** interpolation, plurals and a locale outside the URL b518281

feat: `t(key, values)` interpolates `{name}` placeholders; plural messages (`one`, `other`, `=0`…) pick their form from `count` with `Intl.PluralRules`; `routing: 'none'` keeps the locale out of the URL, detected from `localStorage` then the browser languages, and saved by `setLocale`

## 1.0.0 (2026-06-11)

## 1.0.0-beta.3 (2025-08-16)

## 1.0.0-beta.2 (2025-08-15)
