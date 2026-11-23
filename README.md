# Departures

A Next.js app for tracking live train departures from nearby stations.

## What this app does

- Shows departures for a selected station
- Uses the Deutsche Bahn timetable API as the primary source
- Keeps the data aligned with live service changes and disruptions
- Falls back to Entur if the primary data source is unavailable

## Tech stack

- Next.js 16
- React 19
- TypeScript
- App Router

## Getting started

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Then open http://localhost:3000 in your browser.

## Environment variables

Create a `.env.local` file with:

```env
DB_CLIENT_ID=your_client_id
DB_API_KEY=your_api_key
```

## Data source

This project uses DB Timetables because it is the official Deutsche Bahn feed, is free to use, and includes real-time changes. The decision and constraints are documented in [docs/adr/001-data-source.md](docs/adr/001-data-source.md).

## Available scripts

```bash
npm run dev   # start app locally
npm run build # production build
npm run start # run production build
npm run lint  # run ESLint
```

## Notes

- DB Timetables is beta and rate-limited to 60 calls/minute.
- Derived outputs must credit “Deutsche Bahn AG”.
- The project prefers the official source and keeps Entur as a fallback option.

## JS Speed Before vs After:

Before: 789 kB / 881 kB transferred
