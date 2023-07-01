# App Template

This is my personal favorite way to setup an app. The master branch here is dedicated to the core features of the template. This is designed for MVPs and other quick start applications, not necessarily the most secure or scalable.

## Features

- [x] User Auth Backend
- [x] User Auth Frontend
- [x] React SPA
- [x] Express Backend
- [x] Sqlite3 Database, with TypeORM
- [x] Migration Support
- [x] Detailed Logs
- [x] Easy to use Controllers
- [x] Rebuild Script

## Getting Started

Simply clone the repo, then copy `.env.example` into a new `.env` file, filling the values as you see fit. Then run `pnpm install`, and `pnpm run dev` to start the app in development mode. Then go on customizing from there.

## Scripts

### Reset Git

This script, located at `./scripts/resetGit.sh`, will remove the current git history, and initilize a new repo for you. You should run this after cloning the repo, and before you start making changes.

### Rebuild

The rebuild script, located at `./scripts/rebuild.sh`, will pull the latest changes from the remote repo, then run `pnpm install`, and `pnpm run build`. Then, it will run migrations, and restart the pm2 instance. Keep in mind this is intended for use in production, and not development mode. All of your development needs are taken care of with `pnpm run dev`.
