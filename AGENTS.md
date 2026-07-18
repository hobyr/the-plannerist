# AGENTS.md

## Repo structure

Two independent packages (no monorepo tooling, no shared workspace):

- **`client/`** — Astro 6 frontend, deployed to Netlify. Fetches content from Strapi.
- **`server/`** — Strapi 5 backend (CMS), SQLite database. Admin panel at `localhost:1337/admin`.

Each has its own `package.json`, lockfile, and `node_modules`. Always run commands from within the specific package directory.

## Dev commands

### Client (`client/`)
```
npm run dev       # Astro dev server on localhost:4321
npm run build     # Production build to dist/
npm run preview   # Preview production build
```

### Server (`server/`)
```
npm run dev          # Strapi dev with autoReload on localhost:1337
npm run build        # Build admin panel
npm run start        # Strapi production mode (no autoReload)
npm run seed:example # Import seed data from data/data.json (first run only)
```

## Environment setup

- `server/.env` — copy from `server/.env.example`. Must have real secrets (JWT_SECRET, APP_KEYS, etc.), not placeholder values.
- `client/.env` — `STRAPI_URL` points to Strapi instance (default `http://127.0.0.1:1337`).
- Database is SQLite at `server/.tmp/data.db` by default.

## Data flow

1. **Strapi CMS** defines content types in `server/src/api/` (article, blog, about, global, accompagnement, author, category, business-case).
2. **Shared components** in `server/src/components/` (shared/*, business-cases/*) define reusable blocks (rich-text, media, heading, faq, etc.).
3. **Client** fetches via `client/src/lib/strapi.ts` → `fetchApi()` utility that hits `{STRAPI_URL}/api/{endpoint}`.
4. Client pages are in `client/src/pages/` — flat Astro files, no routing library.

## Key content types (server/src/api/)

| API endpoint       | Description |
|--------------------|-------------|
| `article`          | Blog articles with rich blocks |
| `blog`             | Blog landing/settings |
| `global`           | Site-wide SEO, favicon, nav |
| `about`            | About page with blocks |
| `accompagnement`   | Service offerings |
| `business-case`    | Case studies |
| `author`           | Blog authors |
| `category`         | Blog categories |

## Strapi API defaults

- REST default limit: 100, max: 250, `withCount: true` (see `server/config/api.ts`).
- Strapi v5 document API uses `documentId` (not numeric id) for entries.

## Client conventions

- Astro 6 with `@astrojs/netlify` adapter, `@astrojs/sitemap`, `@astrojs/partytown`.
- Fonts loaded via Astro font API (Fontsource): Google Sans Flex, Instrument Serif, Outfit.
- Remote images allowed from `**.strapiapp.com` and HTTP hosts.
- TypeScript strict mode (`astro/tsconfigs/strict`).
- Content from `.md` pages rendered via `marked`.

## Server conventions

- Strapi v5 with `@strapi/plugin-users-permissions` and `strapi-plugin-publisher`.
- CKEditor plugin (`@ckeditor/strapi-plugin-ckeditor`) for rich text editing.
- `@sensinum/strapi-table-field` for table blocks.
- TypeScript: `strict: false`, CommonJS modules, `src/admin/` excluded from compilation.
- Node engine: `>=20.0.0 <=24.x.x`.

## Things to watch out for

- **No test suites exist** in either package — no unit, integration, or e2e tests.
- **No linting or formatting config** (no ESLint, Prettier, or similar).
- **No CI/CD workflows** (no `.github/workflows/`).
- `server/.env` contains real secrets — never commit it (already in `.gitignore`).
- `server/data/` and `server/database/` contain seed data and backups — do not modify without understanding the seed flow in `server/scripts/seed.js`.
- The seed script runs as a standalone Strapi instance (`compileStrapi` → `createStrapi`) and only imports on first run.
- Client `dist/` and server `dist/` / `build/` are build artifacts — do not edit directly.
- Strapi transfer logs (`server/transfer_*.log`) are safe to ignore.
