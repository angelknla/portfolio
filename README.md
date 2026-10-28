# Angel Canela — Portfolio

My personal site, bringing together my engineering work, background, and interactive experiments.

[Visit angelcanela.com](https://angelcanela.com)

## Tech stack

Next.js 16 · React 19 · TypeScript · CSS Modules · Formspree · Biome

## What it includes

- Project showcase and content in English, Spanish, and Japanese.
- Browser games with keyboard and on-screen controls.
- A sports-booking interface demo with step validation and calendar export.
- A contact form with submission feedback and reCAPTCHA.

## Engineering decisions

- **Static delivery.** [Next.js static export](next.config.ts) keeps hosting simple; interactive features run in client components.
- **Content separated from presentation.** [Typed content modules](src/data) and a shared language context keep translations out of component markup.
- **Accessible interactions.** The [booking demo](src/components/SportsBooking/SportsBooking.tsx) uses focus management, live announcements, labelled controls, and reduced-motion styling.
- **Optional integrations.** The contact form loads reCAPTCHA after interaction. Games and the booking demo work without a backend; booking confirmations are local demonstrations.

## Run locally

Use Node 26.4 or later and pnpm with the committed lockfile.

```sh
nvm use
pnpm install --frozen-lockfile
pnpm dev
```

The contact form uses project-specific Formspree and reCAPTCHA settings in [Form.tsx](src/components/Form/Form.tsx); replace them for your own deployment.

## Checks and build

```sh
pnpm exec tsc --noEmit
pnpm exec biome check .
pnpm build
```

The production build writes the static site to `out/`. The repository currently has no automated test suite.
