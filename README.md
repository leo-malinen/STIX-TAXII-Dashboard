# Sentinel (Version 1.0), the threat intelligence dashboard

A STIX/TAXII, MISP and OpenCTI overview dashboard built on Next.js + shadcn/ui.
Every card is currently backed by mock data shaped like the OpenCTI entity model,
so a card can be pointed at a live GraphQL query without changing its markup.

## Stack

| | |
| --- | --- |
| Framework | Next.js 16 (App Router, RSC) |
| UI | shadcn/ui — `base-nova` style, Base UI primitives |
| Charts | Recharts, via the shadcn `chart` wrapper |
| Icons | `lucide-react` |
| Styling | Tailwind CSS v4 (`app/globals.css`) |

## Getting started

```bash
npm run dev
```

Other scripts: `npm run build`, `npm run typecheck`, `npm run format`.

## Layout

The dashboard is a 4-column grid (`components/dashboard.tsx`) that collapses to 2
columns on tablet and 1 on mobile.

| Card | File | Span |
| --- | --- | --- |
| Knowledge graph (SDO counts) | `knowledge-graph-summary.tsx` | 4 |
| Indicator + observable volume | `indicator-volume-chart.tsx` | 3 |
| Live ingest rate | `live-ingest.tsx` | 1 |
| Global targeting (world map) | `threat-map.tsx` | 4 |
| Active threat actors | `active-threat-actors.tsx` | 2 |
| Active intrusion sets | `active-intrusion-sets.tsx` | 2 |
| Targeted countries | `targeted-countries.tsx` | 2 |
| Targeted sectors (bar chart) | `targeted-sectors-chart.tsx` | 2 |
| Active malware | `active-malware.tsx` | 1 |
| Active tools | `active-tools.tsx` | 1 |
| Active TTPs | `active-ttps.tsx` | 1 |
| Targeted regions | `targeted-regions.tsx` | 1 |
| Active vulnerabilities | `active-vulnerabilities.tsx` | 2 |
| Latest campaigns | `latest-campaigns.tsx` | 2 |
| Indicator sources | `indicator-sources.tsx` | 4 |
| Latest reports | `latest-reports.tsx` | 4 |

## Data

Targeting data shared between the map and the country/region/sector cards lives in
`lib/threat-intel.ts`. Card-local data (actors, malware, CVEs, reports…) sits at the
top of each component, matching the upstream block's convention.

## The world map

`components/world-map-geo.ts` is **generated** — do not hand-edit. It holds SVG path
data for 176 countries, projected from Natural Earth 1:110m with `geoNaturalEarth1`
into an 800x392 viewBox. This keeps the map dependency-free at runtime (no topojson
fetch, no mapping library).

Regenerate with:

```bash
npm run generate:map
```

Countries join to targeting data by Natural Earth name via `TARGETING_BY_WORLD_NAME`.
A few micro-states (Singapore among them) have no polygon at 1:110m, so they appear
in the tables but cannot be shaded.

The choropleth ramp is monochrome — `color-mix(in oklab, var(--foreground) …,
var(--muted))` — so it inverts correctly between light and dark themes. Colour is
reserved for the scales that carry meaning: severity, confidence and TLP
(`components/severity-badge.tsx`).

## Provenance

Built on `@efferd/dashboard-5` from the `@efferd` registry (configured in
`components.json`). Four defects in the published block were fixed locally:

- `online-now.tsx` imported `StatusIndicator` from `@/components/../../components/indicator`, a path that resolved nowhere, and the `indicator` component was not pulled in as a dependency.
- `app-sidebar.tsx` passed `collapsible="offExamples"`, which is not a valid value (`offcanvas` was intended).
- `nav-user.tsx` rendered a non-`<button>` through `DropdownMenuTrigger` while leaving `nativeButton` at its default `true`, which Base UI rejects at runtime.
- Three Natural Earth features with no ISO numeric code collided on a `"undefined"` React key.

## Known issue

`npm run lint` does not run. The scaffold pairs `eslint@^10` with
`eslint-config-next@16.3.4`, whose bundled `eslint-plugin-react` still uses the
ESLint 9 rule-context API and throws while loading `react/display-name`. This is
inherited from `shadcn init`, not from application code. Pin `eslint` to `^9` in
`devDependencies` and reinstall if you need linting before the upstream fix lands.
