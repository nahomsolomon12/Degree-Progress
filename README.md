# Degree Progress — WGU B.S. Computer Science Tracker

A small, gamified tracker for a WGU B.S. Computer Science degree plan. Track
course status, study-plan progress, level, XP, category progress, and badges
in one place. All data is saved to your browser's `localStorage` — nothing
leaves your machine.

## Editing your courses

The app ships with 37 courses (117 credits total) across four categories:
General Education, IT Fundamentals, Core Computer Science, and Capstone &
Electives. Edit them to match your actual plan:

- **In the UI:** click the pencil icon on any course to edit its code,
  title, credits, category, or status; use "+ Add Course" to add one, the
  checklist icon to open its study plan, the trash icon to remove one, or
  "Reset to defaults" to start over. A course can only be marked complete
  after all seven study-plan steps are checked.
- **In code:** edit the seed list directly in
  [`src/data/courses.ts`](src/data/courses.ts). This only affects what
  loads for a brand-new visitor (or after "Reset to defaults") — once
  you've made changes in the browser, your edits live in `localStorage`
  under the key `wgu-degree-courses`.

## Course study plans

Each course has its own study-plan page. Open it with the checklist icon on
the course card. The study plan contains these seven steps:

1. Take a practice test.
2. Study one section per day for approximately 5–7 days, completing 150
   practice questions per day or 300 questions with a review of every question.
3. Schedule the objective assessment (OA).
4. If needed, schedule time with an instructor and confirm competency.
5. If the OA is not passed, begin the failed-section plan within one week and
   complete 150 questions for each failed section.
6. Finish the retake study plan within three days.
7. Retake and pass the OA.

Checklist progress is stored separately under the `wgu-course-checklists`
`localStorage` key. The course completion checkbox stays disabled until all
seven steps are complete. Marking a course complete changes its status to
`completed` and includes its credits in the overall progress percentage.

Categories are defined in [`src/types.ts`](src/types.ts). The seed course list
is in [`src/data/courses.ts`](src/data/courses.ts), checklist text is in
[`src/data/courseChecklist.ts`](src/data/courseChecklist.ts), and leveling and
badge rules live in [`src/lib/gamification.ts`](src/lib/gamification.ts).
The tracker awards one level per 15 completed credits, plus milestone and
category badges.

## Local data

The app uses two browser-local storage keys:

| Key | Contents |
| --- | --- |
| `wgu-degree-courses` | Course details, credits, categories, and statuses |
| `wgu-course-checklists` | Checklist completion state for each course |

Local storage is tied to the browser and site origin. A local development
site, deployed site, and different browser profile each have separate data.
To move data between origins, export the values from the browser developer
console and import them into the other origin.

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
