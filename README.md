# Degree Progress — WGU B.S. Computer Science Tracker

A small, gamified tracker for a WGU B.S. Computer Science degree plan. Mark
courses as not started / in progress / completed and watch your level, XP
bar, category progress, and badges update live. All data is saved to your
browser's `localStorage` — nothing leaves your machine.

## Editing your courses

The app ships with 34 placeholder courses (117 credits total) across four
categories: General Education, IT Fundamentals, Core Computer Science, and
Capstone & Electives. They're meant to be replaced with your actual plan:

- **In the UI:** click the pencil icon on any course to edit its code,
  title, credits, category, or status; use "+ Add Course" to add one, the
  trash icon to remove one, or "Reset to defaults" to start over.
- **In code:** edit the seed list directly in
  [`src/data/courses.ts`](src/data/courses.ts). This only affects what
  loads for a brand-new visitor (or after "Reset to defaults") — once
  you've made changes in the browser, your edits live in `localStorage`
  under the key `wgu-degree-courses`.

Categories are defined in [`src/types.ts`](src/types.ts). Leveling and
badge rules live in [`src/lib/gamification.ts`](src/lib/gamification.ts) —
1 level per 15 completed credits, plus milestone and category badges.

## Local development

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build   # outputs to dist/
npm run preview # serve the production build locally to sanity-check it
```

## Hosting

This is a static single-page app (Vite + React) — `dist/` can be deployed
to any static host. Two of the easiest options:

**Vercel**
```bash
npm i -g vercel
vercel --prod
```
(Framework preset "Vite" is auto-detected; build command `npm run build`,
output directory `dist`.)

**Netlify**
```bash
npm i -g netlify-cli
netlify deploy --prod --dir=dist
```

Both also support "connect your Git repo and auto-deploy on push" from
their dashboards — push this project to GitHub/GitLab and import it there
if you'd rather not use the CLI.
