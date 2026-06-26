# Backend Casa-Fleur

## How to use this repo

- Run database

```bash
cp .env.example .env
docker compose up -d
```

- Run backend

```bash
pnpm install
npm migrate:dev
pnpm generated:dev
pnpm dev
```
