# Harshith V C · Netflix-Style Intelligence Portfolio

The Netflix experience, upgraded with an AI intelligence layer. Six profiles,
each with its own auto-curated briefing, insight panels, and browse rows.

## Run it

No build step. Open index.html in any browser, or in VS Code:
right-click index.html → Open with Live Server.

Or: python -m http.server 8000 → http://localhost:8000

## Experience

1. Who's Watching? Six avatars for instant entry, plus a Profile Spotlight
   carousel that auto-rotates every 5 seconds with per-dot progress bars,
   pause on hover, arrows, dots, and keyboard control (← → Enter).
2. Each profile opens a Netflix-style browse page tinted in that profile's
   color: HVC intro, cinematic hero with a typed "AI Original Briefing",
   then an Intelligence Report grid unique to that persona:
   - Recruiter: hiring gauge, career timeline, skill maturity, interview
     focus, promotion readiness, risk assessment
   - Developer: credibility gauge, interactive knowledge graph, problem
     patterns, skill velocity sparkline, open source stats
   - Sales: receptivity gauge, influence network map, buying signals,
     engagement playbook, decision power
   - Founder: builder quotient, capability radar, execution evidence,
     investment readout
   - Researcher: rigor gauge, knowledge constellation, honest publications
     index, research impact, innovation score
   - Stalker: market standing, competitive positioning map, full SWOT,
     threat indicators, the everything file
3. Below the report: the classic Netflix rows (Top Picks, projects,
   Top 10 Skills with giant rank numbers, etc.), all profile-curated,
   with detail modals for every project.

## Structure

    index.html        Who's Watching + spotlight carousel
    browse.html       Browse page shell
    css/style.css     Netflix theme + intelligence panel styles
    js/data.js        PROFILES, ITEMS, ROWS, BRIEFINGS, INTEL (edit content here)
    js/components.js  Viz builders: gauge, graph, radar, scatter, bars...
    js/picker.js      Spotlight carousel logic
    js/browse.js      Browse rendering: hero, intel grid, rows, modals

## Customize

All content lives in js/data.js. Each profile's intelligence panels are in
the INTEL object; supported module types: gauge, summary, insights, bars,
stats, timeline, list, tags, graph, radar, scatter, spark.
