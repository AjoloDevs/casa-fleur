# Backend Casa-Fleur

## How to use this repo

- Run database

```bash
docker compose up -d
```

- Run backend

```bash
pnpm install
cp .env.example .env
npm migrate:dev
pnpm generated:dev
pnpm dev
```
