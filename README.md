# Terabat & Vorada — Wedding invitation

Mobile-first editorial wedding invitation, built with Next.js App Router, React, TypeScript and Tailwind CSS. Date: **Saturday 10 July 2027, 18:00–22:00, Asia/Bangkok**. Venue: **Mellow Garden Restaurant & Bakery**.

## Run

```sh
npm ci
npm run dev
npm run typecheck
npm run build
npm start
```

## Personalize

Edit `src/config/wedding.ts` for the couple’s names, date, venue, Google Maps links, dress colors, schedule, story, photos and contacts. Dates use explicit `+07:00` offsets, and all displayed dates use `Asia/Bangkok` regardless of a guest’s device time zone.

- Current photography comes from Unsplash and is **sample imagery**, not the couple’s own photos. Add approved photographs under `public/images/`, change the image paths in the config and set `photosAreSamples` to `false`.
- Story milestones are **examples from the brief**. Replace them with the couple’s actual story and set `storyIsSample` to `false`.
- Phone numbers and LINE URLs are empty intentionally; no fake contact buttons are shown. Add real values in `contact`.
- Set `musicUrl` to a licensed audio path to use a particular song. With no path, the button plays a simple original synthesized chime sequence. Audio never starts automatically.

## RSVP delivery

**RSVP is in explicit preview mode until a real receiving service is connected.** No response is stored or sent in preview mode. The UI displays this before submission and after previewing a response.

Set the following server-only environment variables on Vercel and redeploy:

- `RSVP_WEBHOOK_URL`: an HTTPS endpoint that validates and persists each RSVP before responding with a 2xx status.
- `RSVP_WEBHOOK_TOKEN`: optional bearer token for that endpoint.

The endpoint receives:

```json
{"name":"Guest name","attending":true,"guests":2,"message":"Congratulations!","submittedAt":"2026-09-12T00:00:00.000Z"}
```

Declined invitations use `attending: false` and `guests: 0`. The route validates the payload, rejects cross-origin browser submissions, includes a bot honeypot and returns a delivery error rather than a false confirmation when the webhook fails. Do not put tokens in the public wedding config. Configure production rate limiting at the receiving service or Vercel when enabling public RSVP.

## Interaction and accessibility

- Real-time countdown to 18:00 Bangkok time; stops at zero.
- Downloadable calendar event with UTC start/end timestamps.
- Native modal photo gallery with focus containment, Escape, arrow keys and return focus.
- Reduced-motion preference respected; content remains available without scroll animations.
- Optional background music starts only on a click, with labeled play/pause controls.
- Labeled Thai/English form, keyboard focus styles, lazy gallery and map loading.

## Deployment

The existing `paneaktae/wedding-card` project used Vite. This branch migrates it to Next.js. For an existing Vercel project, change **Framework Preset to Next.js**, clear the old `dist` output directory and Vite-specific build settings, and use `npm run build`. A separate Next.js preview project can be used to review before merging.

Search indexing is disabled for this personal invitation. Fonts are fetched at build time and self-hosted by Next.js.
