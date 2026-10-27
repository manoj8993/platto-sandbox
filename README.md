# Platto Sandbox

The starter app for **Product in a Day**, the HEC Paris PM Club simulation. Participants remix it in Google AI Studio and add one feature each. Platto and all its data are fictional.

- **Coding assistants:** read `BUILDER_BRIEF.md` first.
- **Participants:** use the prompt template at the end of this file.

## What's inside

Three apps that share one set of orders: a customer app (phone), a restaurant tablet and a rider app (phone). Everything runs in the browser on mock data. There is no backend, no login and no API key, so a remix cannot leak data or run up costs.

- `?view=gallery` shows every screen side by side. Use it for the Figma starter.
- `main` is the starter. Branches `reference-a` to `reference-f` hold one finished minimum build per feature family, for crew fallback only.

## For organisers

### Run it locally

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build in dist/
npm run typecheck  # optional type check
```

### Put it in Google AI Studio (Engineering Lead)

1. Push this repository to GitHub as a public repository, `main` branch only for the starter.
2. In Google AI Studio, open **Build**, start a new app, then use **Add files (+) → Import from GitHub** and pick the repository.
3. Check the preview: switch between the three apps, place an order, and open `?view=gallery`.
4. **Share** the app with "anyone with the link". This is the link participants **remix** during pre-work.
5. Repeat for each `reference-*` branch as a separate, **private** app. Share those links only with floaters.

### Fallback builder: Bolt

Open `bolt.new`, choose **Import from GitHub** and paste the repository URL. Same app, same brief.

### Figma starter (Design Lead)

1. Open the shared app with `?view=gallery` at the end of the URL.
2. In Figma, run the free **html.to.design** plugin, choose **Import from URL**, paste the gallery URL, width 1600.
3. Rename the page "Platto starter", check every frame imported, and share the file with "can view" so teams can duplicate it.

## Participant prompt template

Paste this into AI Studio, fill in the brackets from your team's Notion stories, and send one story at a time.

```text
Read BUILDER_BRIEF.md and follow its rules.

Feature: [feature name]
Problem it solves: [one sentence from your discovery brief]
Change only: [the screens, e.g. restaurant tablet OrderDetailScreen]

User story: As a [user], I want [capability], so that [outcome].

Acceptance criteria:
1. Given [situation], when [action], then [result].
2. Given [situation], when [action], then [result].

Edge cases: [what should happen when ...]

When you're done, list the files you changed and tell me how to test each acceptance criterion in the app.
```
