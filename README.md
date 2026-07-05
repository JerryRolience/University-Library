# BookWise — University Library Management System

A full-featured library management platform with separate student and admin
experiences: book borrowing with automated due-date reminders, university ID
verification, profile management, and an admin dashboard for managing books,
users, and account/borrow requests.

## Features

**For students**

- Browse and search the book catalogue, with similar-book recommendations
- Borrow books and track due dates
- Automated email reminders 2 days before a book is due, on the due date,
  and every 5 days while overdue
- Profile management, including university ID card and profile picture upload
- Downloadable PDF borrow receipts

**For admins**

- Dashboard with borrowing analytics
- Manage books (create, edit, delete, cover/video uploads)
- Approve or reject new account requests (with automatic email notification)
- Manage borrow requests and mark books returned
- Manage users and roles

## Architecture

This repository is the **Next.js frontend and workflow/notification layer**.
Core data (users, books, borrow records) is served by a separate backend API —
this app doesn't talk to a database directly. Two things run inside this repo
alongside the UI:

- **Upstash Workflow** (`app/api/workflows/*`) orchestrates long-running,
  delayed tasks — borrow reminders, overdue notices, onboarding, and
  password-reset emails — using QStash to schedule steps over days/weeks.
- **ImageKit** (`app/api/imagekit`) issues signed upload credentials for
  profile pictures, ID cards, and book covers.

Rate limiting is handled via Upstash Redis (`app/too-fast` is the page shown
when a user is rate-limited).

## Tech stack

- [Next.js 15](https://nextjs.org/) (App Router) + React 19 + TypeScript
- Tailwind CSS
- [Upstash Workflow](https://upstash.com/docs/workflow) + QStash (scheduled/delayed jobs)
- [Upstash Redis](https://upstash.com/docs/redis) (rate limiting)
- [ImageKit](https://imagekit.io/) (image/video upload and delivery)
- [@react-pdf/renderer](https://react-pdf.org/) (borrow receipt PDFs)
- Nodemailer (transactional email)

## Getting started

### Prerequisites

- Node.js 18+
- A running instance of the backend API this frontend talks to
- Accounts/credentials for: Upstash (Redis + QStash), ImageKit, and an SMTP
  provider for email

### Installation

```bash
git clone https://github.com/JerryRolience/University-Library.git
cd University-Library
npm install
```

Create a `.env.local` file in the project root (see [Environment
variables](#environment-variables) below), then run:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment variables

| Variable                                       | Description                                                                                             |
| ---------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_API`                              | Base URL of the backend API (e.g. `https://api.example.com`)                                            |
| `NEXT_PUBLIC_PROD_API_ENDPOINT`                | This app's own production URL, used to build links inside emails (e.g. `https://bookwise.example.com/`) |
| `NEXT_PUBLIC_SITE_URL`                         | This app's public site URL                                                                              |
| `UPSTASH_REDIS_URL` / `UPSTASH_REDIS_TOKEN`    | Upstash Redis credentials (rate limiting)                                                               |
| `QSTASH_URL` / `QSTASH_TOKEN`                  | Upstash QStash credentials (scheduled workflow steps)                                                   |
| `NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY`              | ImageKit public key                                                                                     |
| `NEXT_PUBLIC_IMAGEKIT_URI_ENDPOINT`            | ImageKit URL endpoint                                                                                   |
| `IMAGEKIT_PRIVATE_KEY`                         | ImageKit private key (server-side only, never exposed to the client)                                    |
| `EMAIL_SERVICE` / `EMAIL_HOST`                 | Email provider and SMTP host                                                                            |
| `EMAIL_USER` / `EMAIL_PASSWORD` / `EMAIL_FROM` | SMTP credentials and the "from" address for outgoing email                                              |

> **Note:** `drizzle.config.ts` and `DATABASE_URL` are present in this repo
> but currently unused — the app doesn't read from this database directly, it
> calls the backend API for all data. This is left over from earlier
> scaffolding; safe to ignore unless you're wiring the DB layer back in.

### Available scripts

| Script                | Description                                                      |
| --------------------- | ---------------------------------------------------------------- |
| `npm run dev`         | Start the local dev server (Turbopack)                           |
| `npm run build`       | Production build                                                 |
| `npm run start`       | Run the production build locally                                 |
| `npm run lint`        | Run ESLint                                                       |
| `npm run db:generate` | Generate Drizzle migrations _(currently unused, see note above)_ |
| `npm run db:migrate`  | Run Drizzle migrations _(currently unused)_                      |
| `npm run db:studio`   | Open Drizzle Studio _(currently unused)_                         |

## Deploying

This is a standard Next.js app — deploys cleanly to Vercel. Set all the
environment variables above in your Vercel project settings before deploying.

## License

Personal/portfolio project — not currently licensed for reuse.
