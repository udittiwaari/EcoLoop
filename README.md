# Ecoloop.01

♻️ EcoLoop is a smart waste management and sustainability platform that helps people reduce waste, report garbage problems, discover ways to reuse everyday items, and promote responsible recycling for a cleaner, greener future.

EcoLoop is a single-page guide for smart waste management, reuse ideas, sample scrap rates, and personal collection planning.

## Project layout

```text
ecoloop/
├── assets/          # Styles, images, browser application and local sign-in
├── backend/         # Node.js static server, account API and local account data
├── edge/            # Minimal Python edge health handler
├── .github/workflows/ # GitHub Pages deployment automation
├── index.html
├── .gitignore
└── README.md
```

## Run locally

1. Install Node.js 18 or later.
2. Open a terminal in `backend/`.
3. Run `npm start` (or `npm run start:backup` to use port 4174).
4. Visit `http://localhost:4173`.

EcoLoop account registration and sign-in run through this local backend. It
stores up to 50 accounts in `backend/data/accounts.json`; passwords are stored
as salted scrypt hashes, not plaintext. A signed-in browser receives an
HTTP-only session cookie that lasts 30 days. The account data file is ignored
by Git and is created the first time the server starts.

The backend exposes:

- `GET /api/health`
- `GET /api/info`
- `GET /api/auth/session` to restore the current sign-in
- `POST /api/auth/register` with `{ "name", "email", "password" }`
- `POST /api/auth/login` with `{ "email", "password" }`
- `POST /api/auth/logout`

Collection plans are stored in the browser. The separate video-library features
can still use Supabase when configured.

## Backup server

If port 4173 is already in use, run `npm run start:backup` from `backend/`. It
starts EcoLoop on port 4174; open `http://localhost:4174`.

## Publish on GitHub Pages

1. Create an empty repository on GitHub, such as `ecoloop`.
2. Push this folder's `main` branch to that repository.
3. In the repository **Settings → Pages**, set the source to **GitHub Actions**.
4. Every push to `main` deploys the static frontend.

GitHub Pages hosts static files only, so account registration and sign-in
require the Node.js backend and are available when running EcoLoop locally (or
when deploying the backend to a Node.js-capable host).
