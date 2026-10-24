# Releasing Rasengan.js

This document describes how releases are cut in this monorepo: the package
map, the order packages must be released in, the pre-flight checks to run
first, and the exact commands that take a change from merged code to a
published npm package.

It complements [CONTRIBUTING.md](CONTRIBUTING.md), which covers day-to-day
contribution workflow, not releasing.

## 1. Package map

| Release slug (git tag)  | npm package              | Directory                            |
| ----------------------- | ------------------------ | ------------------------------------ |
| `v*`                    | `rasengan`               | `packages/framework/rasengan`        |
| `rasengan-futon@*`      | `@rasenganjs/futon`      | `packages/framework/futon`           |
| `rasengan-mdx@*`        | `@rasenganjs/mdx`        | `packages/framework/mdx`             |
| `rasengan-server@*`     | `@rasenganjs/server`     | `packages/framework/rasengan-server` |
| `rasengan-runtime@*`    | `@rasenganjs/runtime`    | `packages/platform/runtime`          |
| `rasengan-image@*`      | `@rasenganjs/image`      | `packages/ecosystem/image`           |
| `rasengan-i18n@*`       | `@rasenganjs/i18n`       | `packages/ecosystem/i18n`            |
| `rasengan-theme@*`      | `@rasenganjs/theme`      | `packages/ecosystem/theme`           |
| `rasengan-kurama@*`     | `@rasenganjs/kurama`     | `packages/ecosystem/kurama`          |
| `rasengan-kage-demo@*`  | `@rasenganjs/kage-demo`  | `packages/ecosystem/kage-demo`       |
| `rasengan-io@*`         | `@rasenganjs/io`         | `packages/ecosystem/io`              |
| `rasengan-ws@*`         | `@rasenganjs/ws`         | `packages/ecosystem/ws`              |
| `rasengan-validators@*` | `@rasenganjs/validators` | `packages/ecosystem/validators`      |
| `rasengan-drizzle@*`    | `@rasenganjs/drizzle`    | `packages/ecosystem/drizzle`         |
| `rasengan-queue@*`      | `@rasenganjs/queue`      | `packages/ecosystem/queue`           |
| `rasengan-sitemap@*`    | `@rasenganjs/sitemap`    | `packages/ecosystem/sitemap`         |
| `rasengan-serve@*`      | `@rasenganjs/serve`      | `packages/deploy/serve`              |
| `rasengan-vercel@*`     | `@rasenganjs/vercel`     | `packages/deploy/vercel`             |
| `rasengan-netlify@*`    | `@rasenganjs/netlify`    | `packages/deploy/netlify`            |
| `rasengan-cloudflare@*` | `@rasenganjs/cloudflare` | `packages/deploy/cloudflare`         |
| `rasengan-shuriken@*`   | `@rasenganjs/shuriken`   | `packages/cli/shuriken`              |
| `create-rasengan*`      | `create-rasengan`        | `packages/cli/create-rasengan`       |

The slug on the left is what `scripts/release.ts`, `scripts/publishCI.ts` and
the two CI workflows (`.github/workflows/publish.yml`,
`.github/workflows/release-tag.yml`) all key off. It is decoupled from both
the directory name and the npm package name on purpose (see the comment at
the top of `scripts/pkg-path.ts`), renaming a directory only ever means
updating that one map, never the slug used everywhere else.

`@rasenganjs/uzubase` and `@rasenganjs/openapi` exist in the workspace but
are not yet in `scripts/release.ts`'s `packages` list, add them there
before their first release.

## 2. Dependency graph and release order

Packages must be released bottom-up: a package can only be released once
every workspace dependency it resolves via `workspace:*` has itself been
published at the version the release is about to stamp. Releasing
out of order ships a package whose `workspace:*` deps get resolved to
whatever was last published, not what you just built.

```
Tier 0 (no workspace deps, release anytime)
  @rasenganjs/futon
  @rasenganjs/mdx
  @rasenganjs/vercel
  @rasenganjs/netlify
  @rasenganjs/cloudflare
  @rasenganjs/uzubase
  @rasenganjs/shuriken
  @rasenganjs/i18n
  @rasenganjs/image
  @rasenganjs/kage-demo
  @rasenganjs/kurama
  @rasenganjs/theme
  create-rasengan        (no workspace deps, but see §2.1, release last anyway)

Tier 1 (depend on futon)
  @rasenganjs/runtime     <- futon
  @rasenganjs/validators  <- futon

Tier 2 (depend on tier 0/1)
  rasengan                <- futon, runtime
  @rasenganjs/serve       <- futon, runtime
  @rasenganjs/server      <- futon, runtime, (validators as peerDependency only)

Tier 3 (depend on tier 2)
  @rasenganjs/sitemap     <- rasengan
  @rasenganjs/drizzle     <- futon, server
  @rasenganjs/openapi     <- futon, server, validators
  @rasenganjs/queue       <- server
  @rasenganjs/ws          <- server, runtime

Tier 4 (depend on tier 3)
  @rasenganjs/io          <- runtime, server, ws
```

Within a tier, order between packages doesn't matter, only across tiers.
`@rasenganjs/server`'s dependency on `@rasenganjs/validators` is a
`peerDependency`, not a hard `dependency`, so `server` can go stable without
forcing `validators` to go stable too; apps that don't use validation never
install it.

### 2.1 Why `create-rasengan` goes last

`create-rasengan` has no `workspace:*` dependency in its own `package.json`
(its templates live in the separate `rasenganjs-starter` repo and pin
version ranges as plain strings), but it is the thing new users run first.
Releasing it before the packages its templates reference means
`npx create-rasengan` scaffolds a project pointing at versions that don't
exist on npm yet. Always release it after everything its current templates
depend on.

## 3. Versioning and tagging

- `rasengan` itself tags as `v<version>` (e.g. `v2.0.0`, `v2.0.0-beta.6`).
- Every other package tags as `<slug>@<version>` (e.g.
  `rasengan-futon@1.0.0`, `rasengan-queue@1.0.0-beta.3`).
- `create-rasengan` tags as `create-rasengan@<version>`.
- Alpha tags (`*-alpha.*`) are skipped by `release-tag.yml`, no GitHub
  Release is created for them, though they still publish to npm.
- Packages version independently. There is no monorepo-wide version number;
  "v2" refers to `rasengan` crossing `2.0.0`, not a synchronized bump across
  every package.

## 4. CHANGELOG convention

Every package's `CHANGELOG.md` keeps an `## Unreleased` section at the top.

- Day-to-day: when you land a user-facing change, add a bullet under
  `## Unreleased` in that package's `CHANGELOG.md` in the same PR (or a
  follow-up `docs:` commit), don't wait for release day to reconstruct it
  from commit messages.
- At release time: `scripts/release.ts` auto-generates additional entries
  from conventional commits since the package's last tag
  (`generateAutoEntries`), prepends them into `## Unreleased`, then renames
  `## Unreleased` to `## <version> (<date>)` and adds a fresh empty
  `## Unreleased` above it. This happens automatically when you run the
  release script, you don't edit this by hand during the release itself.
- `scripts/release.ts`'s `logChangelog` refuses to run if a package's
  `CHANGELOG.md` has no `## Unreleased` heading at all, every package must
  keep that heading present even when the section is empty.

## 5. Pre-flight checklist

Run this before cutting any release, and especially before a stable
(non-beta) cut:

- [ ] `pnpm run build` from the repo root, must exit 0 with no TS or build
      errors across every workspace package.
- [ ] Each core package's own test suite is green (`pnpm run test` inside
      `packages/framework/rasengan`, `packages/framework/futon`,
      `packages/framework/rasengan-server`, `packages/platform/runtime`,
      `packages/deploy/serve`, `packages/deploy/vercel`,
      `packages/deploy/netlify` and `packages/cli/create-rasengan`).
      `serve`'s suite builds a real fixture app
      (`packages/deploy/serve/__tests__/fixture`) and boots the CLI against
      it, so it exercises the production SSR path end to end.
- [ ] Manual smoke test against a fresh project: `rasengan build` then
      `rasengan-serve ./dist`, and diff the SSR output against what
      `rasengan dev` renders for the same routes. Don't rely on
      type-checking or unit tests alone to prove a rendering change
      actually works, build output is a different code path than dev mode
      (Vite's SSR module runner vs a real Rolldown SSR bundle) and bugs can
      live in that gap. This is exactly how the empty-`<div id="root">`
      production SSR bug was found: `tsc` and the unit suite were clean,
      only a real `build` + `serve` + `curl` showed it. That bug only
      appeared in an app without its own `react-router` dependency, so
      also check a project as users actually create it
      (`npx create-rasengan@latest`), not only the monorepo fixtures.
- [ ] Every package being released has a non-empty `## Unreleased` section
      in its `CHANGELOG.md`, or has zero commits since its last tag for
      that package's directory (check with
      `git log <last-tag>..HEAD -- <package-dir>`).
- [ ] If this is a stable (non-beta) cut: decide and record which packages
      are in scope. Going stable does not have to mean every package in the
      workspace goes stable at once, see §6 for how that decision was made
      for v2.0.0.
- [ ] If this is a stable cut crossing a major framework version (e.g. v1 →
      v2): the docs site's upgrade guide
      (`apps/docs/src/app/_routes/(documentation)/docs/getting-started/upgrading.page.mdx`)
      must cover the new major version's breaking changes before
      announcing. Check it's not stuck documenting only the previous major
      bump.

## 6. How a "stable only for some packages" decision gets made

Not every package needs to be stable for `rasengan` itself to go stable.
For v2.0.0, the scope was decided explicitly rather than defaulted to
"everything":

- **In scope for v2.0.0 stable**: `rasengan`, `@rasenganjs/futon`,
  `@rasenganjs/runtime`, `@rasenganjs/server`, `@rasenganjs/serve`,
  `@rasenganjs/vercel`, `@rasenganjs/netlify`, `create-rasengan`, the
  packages `rasengan` itself needs at runtime or that ship with every
  scaffolded app.
- **Deliberately left on beta**: the ecosystem add-ons
  (`@rasenganjs/ws`, `@rasenganjs/drizzle`, `@rasenganjs/queue`,
  `@rasenganjs/validators`, `@rasenganjs/sitemap`, `@rasenganjs/cloudflare`,
  `@rasenganjs/uzubase`, `@rasenganjs/io`, `@rasenganjs/openapi`), newer,
  less battle-tested, and not required for a basic app to run.

Record this kind of scope decision in the release PR/commit description
when it happens again, so a future release doesn't have to re-derive it
from scratch.

## 7. Release procedure

1. **Pre-flight.** Run everything in §5. Fix or explicitly accept any
   failing item before continuing, don't cut a release with an unresolved
   red item.
2. **Clean working tree.** The release script runs `git add -A` before
   committing, so anything uncommitted ends up inside the
   `release: <tag>` commit. Commit or stash everything first.
3. **Pick the release order.** Using §2, list the packages you're
   releasing this round in dependency order (dependencies first).
4. **Dry run the first package** (optional but recommended):

   ```bash
   pnpm run release --dry
   ```

   Same prompts, same version bump and `CHANGELOG.md` update, but no
   commit, no tag and no push. Inspect `git diff`, then discard it with
   `git checkout -- .` before the real run.

5. **Release each package, in that order:**

   ```bash
   pnpm run release
   ```

   This runs `scripts/release.ts`, an interactive wrapper around
   `@vitejs/release-scripts`' `release()`. For each run it will:
   - Ask which package to release (pick the next one in your ordered list).
   - Run `publint` on the package and ask to continue if it reports
     anything.
   - Ask for the release type; pick `custom` and type the version
     explicitly (e.g. `2.0.0`, or `1.0.0-beta.6`).
   - Ask you to confirm the tag (`v2.0.0`, `rasengan-futon@1.0.0`, …).
   - Bump `package.json`, update `CHANGELOG.md` per §4, commit
     `release: <tag>` and create the annotated tag.
   - **Push the tag and the current branch immediately.** The tag push
     triggers CI (see §8), so the package is published to npm within
     minutes of confirming. There is no separate "review then push" step:
     the confirm prompt is the last chance to back out.

   Run it once per package, in the order from §3. A version containing
   `beta`/`alpha` is published under that dist-tag; anything else is
   published as `latest`.

6. **Watch CI.** `publish.yml` runs once per pushed tag; confirm each one
   goes green. A failed publish for one package in the middle of a
   release round still leaves earlier packages published, don't re-run
   the whole batch, just fix and re-tag the one that failed.
7. **Post-release:**
   - Confirm `release-tag.yml` created a GitHub Release for each
     non-alpha tag.
   - Update the docs site if this release includes user-facing or
     breaking changes (new config options, migration steps, deprecations).
   - Announce (community channels, changelog page) once everything is
     green.

## 8. What CI does after a tag is pushed

- **`publish.yml`** triggers on tags matching `v*`, `create-rasengan*`,
  `rasengan-*`. It runs `pnpm run ci-publish`
  (`scripts/publishCI.ts`, a thin wrapper around `@vitejs/release-scripts`'
  `publish()`), authenticating with `MAIN_NPM_TOKEN`/`SECONDARY_NPM_TOKEN`
  depending on which npm org the package publishes under. This is the only
  thing that actually pushes a package to the npm registry.
- **`release-tag.yml`** triggers on the same tag patterns and creates the
  corresponding GitHub Release, skipping alpha tags.

Both workflows only run when `github.repository == 'rasengan-dev/rasenganjs'`
so they never run on forks.

## 9. If something goes wrong

- **Wrong version published**: npm does not allow overwriting a published
  version. Publish a corrected version bump (e.g. a quick patch) instead of
  trying to unpublish, except within npm's own unpublish grace window for
  a genuinely broken release.
- **Tag pushed but CI failed before publishing**: fix the underlying issue,
  then either delete and recreate the tag (if nothing published yet, check
  npm first) or bump to the next version and tag again.
- **Released out of dependency order and a downstream package now points
  at a stale `workspace:*` resolution**: release a patch of the downstream
  package to pick up the correct version.
