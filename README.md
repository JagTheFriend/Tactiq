# Tactiq

This is a [T3 Stack](https://create.t3.gg/) project bootstrapped with `create-t3-app`.

## Goal

Creating an AI powered task manager

## Tools Used:

- [Next.js](https://nextjs.org)
- [Prisma](https://prisma.io)
- [PostgreSQL](https://www.postgresql.org/)
- [Tailwind CSS](https://tailwindcss.com)
- [HeroUI](https://www.heroui.com/)
- [Acernity](https://ui.aceternity.com/)

## How To Run

1. Install Dependencies

```bash
pnpm install
```

2. Add all the required env variables into `.env` file

```bash
DATABASE_URL="postgresql://..."

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="..."
CLERK_SECRET_KEY="..."

NEXT_PUBLIC_CLERK_SIGN_UP_URL=/signup
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/login
NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/dashboard
NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=/dashboard

OPENROUTER_API_KEY="..."
```

4. Push schema to database

```bash
pnpm db:push
```

4. Run in dev mode

```bash
pnpm dev
```
