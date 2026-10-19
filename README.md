# EcoLoop

EcoLoop is a single-page guide for smart waste management, reuse ideas, sample scrap rates, and personal collection planning.

## Project layout

```text
ecoloop/
├── frontend/        # Static website and visual assets
├── backend/         # Node.js static server and small JSON API
├── edge/            # Minimal Python edge health handler
├── .github/workflows/ # GitHub Pages deployment automation
├── .gitignore
└── README.md
```

## Run locally

1. Install Node.js 18 or later.
2. Open a terminal in `backend/`.
3. Run `npm start`.
4. Visit `http://localhost:4173`.

The backend also exposes:

- `GET /api/health`
- `GET /api/info`

The frontend currently stores collection plans in the browser, so it works without a database.

## Backup server

If port 4173 is already in use, run `npm run start:backup` from `backend/`. It starts EcoLoop on port 4174.

## Publish on GitHub Pages

1. Create an empty repository on GitHub, such as `ecoloop`.
2. Push this folder's `main` branch to that repository.
3. In the repository **Settings → Pages**, set the source to **GitHub Actions**.
4. Every push to `main` deploys the `frontend/` folder automatically.

The backend and edge handler are included in the repository for later hosting on a Node/Python-capable service. GitHub Pages hosts the static frontend only.
