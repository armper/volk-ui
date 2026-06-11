# Volk UI

Angular front end of the **Volk eDiscovery platform**. Lets you search the users
discovered by [volk-sniffer](https://github.com/armper/volk-sniffer) and browse the
files attributed to them, served by [volk-rest](https://github.com/armper/volk-rest).

```
directories ──> volk-sniffer ──> MongoDB <── volk-rest <── volk-ui (Angular)
                (Camel + POI)     (volk db)   (WebFlux, :8091)   (:4200)
```

## Tech stack

- Angular 20 (standalone components, new control flow)
- Angular Material 20
- RxJS 7

## Features

- **User search** (`/`) — type-ahead search (debounced 300 ms) against
  `GET /searchuser/?name=...`
- **User detail** (`/user-detail/:id`) — user card plus a Material table of every
  file attributed to that user (path, file name)

## Running

Requires Node 20.19+ / 22.12+ / 24+ and the volk-rest API on `http://localhost:8091`.

```bash
npm install
npm start          # dev server on http://localhost:4200
```

The API base URL is set in `src/app/user.service.ts` and `src/app/file.service.ts`.

## Build & test

```bash
npm run build      # production build into dist/volk-ui
npm test           # karma unit tests (ChromeHeadless)
```

## History

Generated in 2018 with Angular CLI 1.7 / Angular 5 ("ExchangeUI"). Rewritten in 2026
for Angular 20: standalone components bootstrapped with `bootstrapApplication`,
`provideRouter`/`provideHttpClient`, `inject()`-based services, `@for`/`@if` control
flow, strict TypeScript, and removal of unused dependencies (mongoose, big-integer,
angular2-uuid).
