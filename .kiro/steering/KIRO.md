---
inclusion: always
---

# React.TS Working Rules

Rules for AI agents working in this repository. `CLAUDE.md`, `AGENTS.md`, and
`.kiro/steering/KIRO.md` share the same content; when you change one, change the
other two as well.

## Overview

React.TS is a minimal boilerplate built on React + TypeScript + SSG + Yarn
Berry + Vite + ESLint + SCSS. React Router (framework mode) runs as a Vite
plugin and prerenders every route to static HTML at build time. The output
(`dist/client`) is served as-is by a static file server.

## Tech Stack

This combination is the identity of the boilerplate. Do not swap it out or bring
in alternative tools.

| Area                | Choice                                                                 |
| ------------------- | ---------------------------------------------------------------------- |
| UI                  | React 19                                                               |
| Language            | TypeScript (`strict`, `allowJs: false`)                                |
| Routing & rendering | React Router framework mode, `ssr: false` + `prerender` (SSG)          |
| Bundler             | Vite (`@react-router/dev/vite`)                                        |
| Package manager     | Yarn Berry (PnP, no `node_modules`)                                    |
| Lint & format       | ESLint flat config + typescript-eslint + eslint-plugin-react, Prettier |
| Styling             | SCSS (`sass-embedded`) + CSS Modules, `the-new-css-reset`              |

Do not introduce: npm, npx, or pnpm; the `node-modules` linker; other frameworks
such as Next.js or CRA; an SSR runtime server; CSS-in-JS or utility CSS
frameworks such as Tailwind, styled-components, or emotion; `.js`/`.jsx` source
files.

## Philosophy

These principles run through the whole codebase. New code follows them too.

1. **Minimal by default, add only when needed.** The default dependencies are
   only what building and rendering require. Server-state, form, and
   state-machine libraries are listed only as candidates under "Recommend
   Packages" in the README. Add a library only when a feature truly needs it,
   and pick from that list first (vite-plugin-svgr, react-query, XState,
   react-hook-form).
2. **Configuration lives in `config/`.** Every tool config is in `config/`. The
   root holds only thin bridge files for tools that look there
   (`react-router.config.ts` is a one-line re-export, `tsconfig.json` is a
   one-line `extends`). Put any new tool config in `config/` too and pass it
   with `--config` from the `package.json` scripts.
3. **Static output.** The build produces static files only; there is no runtime
   server. Do not write code that runs on a server at request time (`action`,
   per-request `loader`, cookie or session handling).
4. **Define each value in one place.** Design values such as colors, spacing,
   and typography are defined only in `src/styles`; the rest of the code only
   references them. Assets are likewise consumed only through the `index.ts` of
   each `src/assets` folder.
5. **Barrels and the alias.** Each folder's `index.ts` gathers its public API,
   and source files are imported through the `@/` alias (`src/`). Relative paths
   are used only for files in the same folder (`./index.module.scss`,
   `./+types/index`).
6. **Platform features first.** Dark mode uses no library: `html[data-theme]` +
   CSS variables + `useSyncExternalStore`, with an inline script applying the
   theme before first paint to prevent flashing. Reach for web standards and
   built-in React APIs before libraries.
7. **Dependencies stay current.** Dependabot bumps every dependency weekly as
   one group. Do not write workarounds for older versions; follow the API of the
   version currently installed.

## Directory Structure

```
config/                 Tool configs (vite, react-router, tsconfig, eslint, prettier)
public/                 Only files that need a fixed URL (favicon, manifest.json, robots.txt)
src/
  index.tsx             HTML document shell (Document): <html>, <head>, theme script
  root.tsx              Root route: global style imports, meta, App, ErrorBoundary
  routes.ts             Route definitions
  assets/
    fonts/index.ts      Font file exports
    images/index.ts     Image file exports
    icons/index.ts      SVG icon component exports (svgr)
  components/<Name>/    Shared components: index.tsx + index.module.scss
  components/index.ts   export * from "./<Name>";
  hooks/use<Name>.tsx   Custom hooks
  hooks/index.ts        export * from "./use<Name>";
  pages/<Name>/         Route modules: index.tsx + index.module.scss
  styles/               Design tokens and global styles (the only place for static values)
```

Create each `src/assets` folder following this layout the first time it is
needed.

## Styling Rules

### Static values belong only in `src/styles`

Static values such as colors (hex, rgb, hsl), sizes (px, rem, em), font family,
weight, and line height, spacing, radius, shadow, z-index, breakpoints, and
transition durations are written only in files under `src/styles`. Do not write
them directly in component or page `*.module.scss` files or in a TSX `style`
prop; reference the tokens that `src/styles` exposes instead.

Current tokens:

| File            | Defines                                                                                      | How to consume                                                                               |
| --------------- | -------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| `colors.scss`   | `$colors` (light/default/dark of primary, secondary, neutral; success, error, warning, info) | `var(--color-primary)`, `var(--color-primary-light)`, `var(--color-error)`                   |
| `colors.scss`   | `$themes` (light/dark)                                                                       | `var(--theme-background)`, `var(--theme-text)`                                               |
| `spacings.scss` | `$spacings` (xs–xl)                                                                          | Utility classes `m-*`, `mt-*`, `mr-*`, `mb-*`, `ml-*`, `p-*`, `pt-*`, `pr-*`, `pb-*`, `pl-*` |
| `typo.scss`     | `$typography` (h1–h6, body), `$font-family-primary`                                          | Utility classes `typo-h1`–`typo-body`, `var(--font-size-h1)`                                 |

`typo.scss` sets `html { font-size: 62.5% }`, so `1rem` equals 10px.

### Using tokens

In module SCSS, reference tokens through CSS variables.

```scss
.card {
  color: var(--theme-text);
  background: var(--theme-background);
  border: 1px solid var(--color-neutral-light);
}
```

For spacing and typography, prefer utility classes in TSX.

```tsx
<h1 className={`typo-h1 mb-md ${styles.title}`}>{title}</h1>
```

Do not `@use` `colors.scss`, `spacings.scss`, or `typo.scss` from module SCSS.
These files emit `:root`, `html`, and utility-class CSS, so every module that
`@use`s them duplicates the global CSS.

### When a token is missing

1. Do not hardcode the value. Add it to the matching map in `src/styles` first.
2. If the value is not emitted as a CSS variable, add the output too. For
   example, spacing currently emits only utility classes, so if module SCSS
   needs spacing, add `:root { --spacing-#{$name}: #{$size}; }` output to
   `spacings.scss` and then use `var(--spacing-md)`. Add font weight and line
   height to `typo.scss` the same way.
3. For a new category (radius, shadow, z-index, motion, etc.), create
   `src/styles/<name>.scss`, define an SCSS map like the existing files, and
   emit CSS variables or utility classes with `@each`. Then append it to the
   global style imports in `root.tsx`.
4. Values needed where CSS variables cannot be used, such as `@media` conditions
   (breakpoints), and shared mixins go into a partial that emits no CSS
   (`src/styles/_<name>.scss`, containing only variables, maps, mixins, and
   functions). Modules `@use` only such partials.

```scss
@use "@/styles/breakpoints" as bp;

.grid {
  @include bp.up("md") {
    grid-template-columns: repeat(2, 1fr);
  }
}
```

### Theming

- Colors that differ between light and dark are added to `$themes` in
  `colors.scss` under the same key in both `light` and `dark`, and consumed as
  `var(--theme-<key>)`.
- Do not branch on `isDarkMode` in TSX to change colors.
  `useDarkMode().toggleTheme` only changes `html[data-theme]`; CSS variables
  handle the color switch.

### Other styling rules

- Component and page styles go in `index.module.scss` (CSS Modules) in the same
  folder, imported with `import styles from "./index.module.scss";`. Name
  classes in camelCase (`styles.cardTitle`).
- Global styles are imported only in `root.tsx`, in the order reset → `colors` →
  `spacings` → `typo`. New global files are appended after them.
- Do not put static values in `style={{...}}`. Pass only runtime-computed values
  as CSS variables and set the actual styles in module SCSS.

```tsx
<div
  className={styles.bar}
  style={{"--progress": `${ratio * 100}%`} as CSSProperties}
/>
```

- Exceptions to the static-value rule: `0`, `auto`, `none`, `inherit`,
  `currentColor`, `transparent`, layout ratios (`100%`, `50%`, `1fr`,
  `flex: 1`), and hairline widths such as the `1px` above. Places that cannot
  reference CSS (`<meta name="theme-color">` in `src/index.tsx`, `theme_color`
  and `background_color` in `public/manifest.json`) are also exceptions, but
  keep their values in sync with `$themes`.

## Asset Rules

Images, icons, and fonts live in `src/assets/images`, `src/assets/icons`, and
`src/assets/fonts`, and each folder exports them from an `index.ts`. Consumers
never import file paths directly; they import from the barrel.

- File names are kebab-case (`logo.png`, `icon-check.svg`,
  `pretendard-regular.woff2`).
- Export names are PascalCase; icons take the `Icon` prefix.

### images

```ts
// src/assets/images/index.ts
export {default as Logo} from "./logo.png";
```

```tsx
import {Logo} from "@/assets/images";

<img src={Logo} alt="React.TS" />;
```

### icons

Import SVGs as React components with
[vite-plugin-svgr](https://github.com/pd4d10/vite-plugin-svgr), listed under
Recommend Packages in the README.

```ts
// src/assets/icons/index.ts
export {default as IconCheck} from "./icon-check.svg?react";
```

```tsx
import {IconCheck} from "@/assets/icons";

<IconCheck className={styles.icon} aria-hidden />;
```

If svgr is not installed yet, set it up when adding the first icon.

1. `yarn add -D vite-plugin-svgr`
2. In `config/vite.config.ts`, add `import svgr from "vite-plugin-svgr";` and
   put `svgr()` in `plugins`.
3. Add `/// <reference types="vite-plugin-svgr/client" />` to
   `src/react-app-env.d.ts`.

Inside SVG files, change `fill` and `stroke` to `currentColor` and remove fixed
`width` and `height`. Icon color and size are set with tokens in module SCSS.

### fonts

```ts
// src/assets/fonts/index.ts
export {default as PretendardRegular} from "./pretendard-regular.woff2";
```

- Declare `@font-face` in `src/styles/fonts.scss`, referencing files with
  `url("@/assets/fonts/pretendard-regular.woff2")`. Import it in `root.tsx`
  before `typo.scss`.
- Reflect the family name in `$font-family-primary` in `typo.scss`.
- If preloading is needed, use the barrel export in the `links` export of
  `root.tsx`.

```tsx
import {PretendardRegular} from "@/assets/fonts";

export const links: Route.LinksFunction = () => [
  {
    rel: "preload",
    href: PretendardRegular,
    as: "font",
    type: "font/woff2",
    crossOrigin: "anonymous",
  },
];
```

### public/

Do not put assets that code imports in `public/`. `public/` holds only files
that need a fixed URL (favicon, apple-touch-icon, `manifest.json`,
`robots.txt`).

## Routing Rules

Routes are declared in `src/routes.ts`, and `prerender` in
`config/react-router.config.ts` decides which paths are generated as static
HTML. File-based routing is not used.

Current setup:

```ts
// src/routes.ts
export default [
  index("pages/Home/index.tsx"),
  route("example", "pages/Example/index.tsx"),
] satisfies RouteConfig;
```

```ts
// config/react-router.config.ts
export default {
  appDirectory: path.resolve(import.meta.dirname, "../src"),
  buildDirectory: path.resolve(import.meta.dirname, "../dist"),
  ssr: false,
  async prerender({getStaticPaths}) {
    return getStaticPaths();
  },
} satisfies Config;
```

### Adding a static route

1. Create `src/pages/<Name>/index.tsx` and `index.module.scss`.
2. Add `route("<path>", "pages/<Name>/index.tsx")` to `src/routes.ts`. Module
   paths are relative to `src`.
3. Leave `prerender` alone; `getStaticPaths()` collects static paths
   automatically.

### Adding a dynamic route

`getStaticPaths()` does not include paths with dynamic segments. Declare the
route, then list the concrete paths to generate in `prerender`.

```ts
// src/routes.ts
route("posts/:slug", "pages/Post/index.tsx"),
```

```ts
// config/react-router.config.ts
return [...getStaticPaths(), "/posts/hello"];
```

When there are many paths, build the list inside `prerender` (an async function)
from the data source and return it.

### Writing route modules

- Write route modules as a default-exported function declaration, and name the
  component after its folder.
- Import types from `./+types/index`, generated by typegen
  (`import type {Route} from "./+types/index";` → `Route.ComponentProps`,
  `Route.MetaFunction`). If the types are reported missing, run `yarn typegen`.
  `.react-router/` is generated output; never edit it by hand.
- `loader` runs once at build time (prerender), and its result is frozen as
  static data (see `pages/Example`). For data that must be fresh at visit time,
  use `clientLoader` or a client-side fetch. Do not use `action` or server-only
  code.
- Browser APIs such as `window`, `document`, and `localStorage` do not exist
  during prerender. Do not access them during render; handle them in `useEffect`
  or through `getServerSnapshot` of `useSyncExternalStore` (see
  `hooks/useDarkMode.tsx`).
- 404 and error screens are handled by the `ErrorBoundary` in `root.tsx`, which
  renders `pages/NotFound`. When served statically, paths that were not
  generated fall back to `__spa-fallback.html`.
- Navigate with `Link`, `NavLink`, and `useNavigate` from `react-router`.
- UI shared by every page goes around the `<Outlet />` in `components/Layout`.

## Code Conventions

- Keep TypeScript strict. Do not use `any` or `@ts-ignore`; use `import type`
  for type-only imports.
- Write shared components in `src/components/<PascalCase>/index.tsx` as
  named-export arrow functions (`export const Layout = () => ...`) and add
  `export * from "./<Name>";` to `src/components/index.ts`. Consumers import
  them with `import {Layout} from "@/components";`.
- Write hooks in `src/hooks/use<Name>.ts(x)` as named exports and re-export them
  from `src/hooks/index.ts`.
- Use default exports only for route modules (`pages/*`) and `root.tsx`.
- Formatting follows `config/.prettierrc`: double quotes and semicolons, no
  spaces inside braces (`{Foo}`), short objects collapsed onto one line, and
  Markdown wrapped at 80 columns.
- Commit messages follow Conventional Commits (`feat:`, `fix:`,
  `refactor(docs):`, `build(deps):`).

## Yarn Berry

- PnP mode, so there is no `node_modules`. Do not use npm, npx, or pnpm. Add
  packages with `yarn add` / `yarn add -D`, run one-off tools with `yarn dlx`,
  and run installed binaries with `yarn <bin>`.
- Never edit `yarn.lock` by hand. Do not change the Yarn version in the
  `packageManager` field of `package.json` on your own.
- `.yarn/sdks` is generated so editors can use TypeScript, ESLint, and Prettier
  under PnP. If editor integration breaks after upgrading those tools,
  regenerate it with `yarn dlx @yarnpkg/sdks vscode`.

## Commands

| Command        | What it does                                        |
| -------------- | --------------------------------------------------- |
| `yarn`         | Install dependencies                                |
| `yarn start`   | Dev server                                          |
| `yarn typegen` | Generate route types (`.react-router/types`)        |
| `yarn build`   | typegen → `tsc` type check → static build (`dist/`) |
| `yarn serve`   | Serve `dist/client` statically (with SPA fallback)  |
| `yarn lint`    | ESLint                                              |
| `yarn format`  | Prettier                                            |

When you finish a task, confirm that `yarn lint` and `yarn build` pass.
`yarn build` includes the type check.

## Before You Finish

- [ ] No static values such as colors or sizes in `*.module.scss` or TSX (except
      the listed exceptions).
- [ ] Any newly needed value was added as a token in `src/styles`.
- [ ] Assets are imported through the `src/assets/*/index.ts` barrels.
- [ ] New routes are registered in `src/routes.ts`, and dynamic routes have
      their concrete paths listed in `prerender`.
- [ ] No code depends on a server runtime at request time.
- [ ] `yarn lint` and `yarn build` pass.
