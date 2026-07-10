# AGENTS.md

Angular 18 LTS frontend for a chess-tournament management system (`chsystem`). Talks to a
separate backend REST API (see `src/environments`).

## Toolchain

- **Angular 18.2**, TypeScript 5.4, RxJS 7.8. Pinned in `package.json`.
- **Node 20.20.2** is the supported runtime (see `Dockerfile`). Node 20 LTS is recommended.
  Install deps with `npm ci` (lockfile is committed).
- **ESLint** for linting. `npm run lint` runs `ng lint`. Configuration in `.eslintrc.json`.
- **Karma + Jasmine** for unit tests; launcher is `karma-chrome-launcher` (needs
  Chrome installed). `karma.conf.js` sets `singleRun: false`, so `npm test` runs
  in **watch mode**. For a single CI-style run:
  `ng test --watch=false --browsers=ChromeHeadless`
- There is **no `typecheck` script**; type errors surface via `ng build`
  (AOT is on by default) and `ng test`. To typecheck in isolation:
  `npx tsc -p tsconfig.app.json --noEmit`.

## Commands

| Task | Command |
| --- | --- |
| Dev server (http://localhost:4200) | `npm start` or `ng serve` |
| Build (output `dist/chsystem-frontend`) | `npm run build` |
| Production build | `ng build --configuration production` |
| Lint | `npm run lint` |
| Unit tests (watch) | `npm test` |
| Unit tests (single run, headless) | `ng test --watch=false --browsers=ChromeHeadless` |
| Run in Docker | `docker build -t chsystem-frontend:1.0 . && docker run -p 4200:80 chsystem-frontend:1.0` |

Recommended order before considering a change done: **lint → build → test**.

## Backend integration

- Base URL lives in `src/environments/environment.ts` as `backendBaseUrl`
  (default `http://localhost:8080`). `angular.json` swaps in
  `environment.prod.ts` for production builds.
- `environment.prod.ts` now includes `backendBaseUrl` (previously was missing,
  which broke API calls in production).
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

## Code style (enforced by ESLint)

- Single quotes; max line length 140; 2-space indent (`.editorconfig`).
- Component selectors: element + `app-` prefix + kebab-case. Directive
  selectors: attribute + `app` prefix + camelCase.
- Component/directive classes must use the `Component`/`Directive` suffix;
  use lifecycle interfaces (`OnInit`, not bare method names).
- Components use SCSS (`style: 'scss'` in `angular.json` schematics).
- Angular Material components: Material Icons and Roboto font are loaded in
  `index.html` from Google Fonts CDN.

## Notes

- No CI workflows; no pre-commit hooks. Lint/build/test must be run manually.
- Default branch is `master` (`origin/main` also exists but `origin/HEAD`
  points at `master`).
- `dist/` is committed in history but is a build artifact — regenerate rather
  than edit by hand.
- e2e tests (Protractor) have been removed; if e2e testing is needed,
  consider using Cypress or Playwright.
