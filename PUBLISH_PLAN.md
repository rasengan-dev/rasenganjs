# Publish Plan

A repeatable process for publishing packages in this monorepo without
publishing something before an internal dependency it needs. This is not a
snapshot of "what's changed right now" — it's the general procedure to run
any time one or more packages have pending changes.

## Dependency graph (internal `workspace:` references)

This is the full graph across every publishable package, derived from
`workspace:*`/`workspace:^` references in `packages/*/package.json`. It only
changes when a package adds or drops an internal dependency — re-derive it
(grep for `workspace:` across `packages/*/package.json`) if that happens.

```
Group A — no internal deps
  create-rasengan   rasengan   @rasenganjs/futon   @rasenganjs/theme
  @rasenganjs/image   @rasenganjs/kage-demo   @rasenganjs/kurama
  @rasenganjs/mdx   @rasenganjs/shuriken

Group B — depend only on Group A
  @rasenganjs/runtime      → futon
  @rasenganjs/validators   → futon
  @rasenganjs/i18n         → rasengan (peer)
  @rasenganjs/serve        → rasengan (peer)
  @rasenganjs/vercel       → rasengan (peer)

Group C — depend on Group A/B
  @rasenganjs/server       → futon, runtime, validators

Group D — depend on Group C (and A/B)
  @rasenganjs/ws           → server, runtime
  @rasenganjs/queue        → server
  @rasenganjs/drizzle      → server

Group E — depends on Group D
  @rasenganjs/io           → runtime, server, ws
```

**The rule:** a package can be published once everything it points to via
`workspace:*`/`workspace:^` is already published at the version its range
requires. Walking the groups A → E in order guarantees that.

Packages with no arrow pointing at them from a later group (most of Group A)
have no one downstream in this batch either — they're not blocking anything,
just publish them whenever they have changes.

## Step-by-step

**1. Find out which packages actually have unpublished changes.**

For each package, compare its local version against what's live:

```bash
npm view <package-name> version        # published
grep '"version"' packages/.../package.json   # local
```

If they match but the source has changed since the last publish, it needs a
version bump before it can be published again (npm rejects re-publishing an
existing version). If the package has never been published, `npm view`
returns nothing — first publish, no bump required.

To see what actually changed, diff since that package's last release tag
(tag convention is in `scripts/release.ts`: `<slug>@<version>`, or `v<version>`
for `rasengan` itself):

```bash
git log <tag>..HEAD -- packages/<path-to-package>
```

**2. Place each changed package in its group** using the graph above.

**3. Walk the groups in order, A → E.** Within a group, order doesn't matter
— publish in any order, or in parallel. Skip any package in a group that has
no pending changes; you only need to touch it if a dependent's version range
genuinely requires the bump (uncommon with `workspace:*`/`workspace:^`,
since pnpm rewrites those to the dependency's _current_ version at publish
time regardless of whether you bumped it).

**4. For each package being published:** bump its version (patch for
tooling/internal fixes, minor for new functionality, none for a first
publish), build it, then publish.

**5. Move to the next group only after every changed package in the current
one is live on npm** — a later group's `workspace:*` reference needs to
resolve to a real, published version.

## Note on `scripts/release.ts`

The `packages: [...]` array in `scripts/release.ts` (used by
`pnpm run release`) is **not** ordered to match this graph — e.g. it lists
`rasengan-server` before `rasengan-runtime`, which it depends on. That's only
safe today because releases haven't been done as one full sweep with hard
interdependencies unresolved. If it ever needs reordering, use the group
order above (A → E) rather than the array's current order.
