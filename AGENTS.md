# AGENTS.md

Angular 10 frontend for a chess-tournament management system (`chsystem`). Talks to a
separate backend REST API (see `src/environments`).

## Toolchain (legacy — do not assume modern defaults)

- **Angular 10.1**, TypeScript 4.0, RxJS 6.6. Pinned in `package.json`.
- **Node 16.13.1** is the supported runtime (see `Dockerfile`). Angular 10 CLI will
  **not** build reliably on Node 18+. Use `nvm use 16` (or equivalent) before
  `npm ci` / `ng` commands. Install deps with `npm ci` (lockfile is committed).
- **TSLint + codelyzer** for linting — there is **no ESLint** config. `npm run lint`
  runs `ng lint` against `tsconfig.app.json`, `tsconfig.spec.json`, and
  `e2e/tsconfig.json`.
- **Karma + Jasmine** for unit tests; launcher is `karma-chrome-launcher` (needs
  Chrome installed). `karma.conf.js` sets `singleRun: false`, so `npm test` runs
  in **watch mode**. For a single CI-style run:
  `ng test --watch=false --browsers=ChromeHeadless`
- **Protractor** for e2e (`npm run e2e`); it starts the dev server automatically
  via `devServerTarget`.
- There is **no separate `typecheck` script**; type errors surface via `ng build`
  (AOT is on by default) and `ng test`. To typecheck in isolation:
  `npx tsc -p tsconfig.app.json --noEmit`.

## Commands

| Task | Command |
| --- | --- |
| Dev server (http://localhost:4200) | `npm start` or `ng serve` |
| Build (output `dist/chsystem-frontend`) | `npm run build` |
| Production build | `ng build --prod` (Angular 10 flag, not `--configuration production`) |
| Lint | `npm run lint` |
| Unit tests (watch) | `npm test` |
| Unit tests (single run, headless) | `ng test --watch=false --browsers=ChromeHeadless` |
| Run in Docker | `docker build -t chsystem-frontend:1.0 . && docker run -p 4200:80 chsystem-frontend:1.0` |

Recommended order before considering a change done: **lint → build → test**.

## Backend integration

- Base URL lives in `src/environments/environment.ts` as `backendBaseUrl`
  (default `http://localhost:8080`). `angular.json` swaps in
  `environment.prod.ts` for `--prod` builds.
- **Gotcha:** `environment.prod.ts` currently does **not** export
  `backendBaseUrl`, so prod builds will resolve it to `undefined` and API calls
  will break. If you touch environments, keep `backendBaseUrl` in sync across
  both files (or inject it another way).
- Services are `providedIn: 'root'` and build URLs by string-concatenating
  `environment.backendBaseUrl` with `/players` (`player.service.ts`) and
  `/tournaments` (`tournament.service.ts`). See those files for the exact
  REST endpoints — do not invent new URL shapes.

## Architecture

- Single Angular app, entrypoint `src/main.ts` → `AppModule`
  (`src/app/app.module.ts`). Routes in `src/app/app-routing.module.ts`:
  `''` → Home, `tournaments`, `players`, `tournaments/:id` → Tournament
  (which has overview/players/matches/standings sub-components under
  `src/app/tournament/`).
- `MaterialModule` (`src/app/material/material.module.ts`) barrels Angular
  Material imports; Material theme is the prebuilt `indigo-pink.css`.
- Dates use `MomentDateAdapter` with `MAT_DATE_LOCALE: 'de-DE'` — keep using
  `moment` for date handling, do not mix in another date library.
- Global error UI is `ErrorSnackBarComponent` in `src/app/common/error-snack-bar`.

## Code style (enforced by TSLint)

- Single quotes; max line length 140; 2-space indent (`tsconfig`/`.editorconfig`).
- `no-non-null-assertion` is on — avoid `!.`.
- `no-console` blocks `debug/info/time/timeEnd/trace` (other console methods
  allowed). Prefer the error snack bar over logging.
- Component selectors: element + `app-` prefix + kebab-case. Directive
  selectors: attribute + `app` prefix + camelCase.
- Component/directive classes must use the `Component`/`Directive` suffix;
  use lifecycle interfaces (`OnInit`, not bare method names).
- Components use SCSS (`style: 'scss'` in `angular.json` schematics).
- `import-blacklist` forbids `rxjs/Rx` — import operators/types from
  `rxjs/operators` and `rxjs` directly.

## Notes

- No CI workflows; no pre-commit hooks. Lint/build/test must be run manually.
- Default branch is `master` (`origin/main` also exists but `origin/HEAD`
  points at `master`).
- `dist/` is committed in history but is a build artifact — regenerate rather
  than edit by hand.
