## Unreleased

## 1.0.0-beta.1 (2026-07-24)

### Features

- add app-level lifecycle to Futon, propagate through adapters 1a1844e
- adding drizzle package to address the RFC 0006 80220fe
- **runtime:** add Bun WebSocket support (RFC-0001) 507eaa4
- **runtime:** add Node WebSocket upgrade handling (RFC-0001) 7d4906b

### Bug Fixes

- **runtime:** reuse the same WebSocketConnection across a Bun connection d44ec6f
- **runtime:** stop utf8-decoding Node request bodies bf60e3a

### Performance Improvements

- implement RFC-0005 HTTP hot-path phase 3b 3e2f29a
- implement RFC-0005 HTTP hot-path phases 1-3a 37d77e7

## 1.0.0-beta.0 (2026-06-25)
