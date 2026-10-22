# Security Sentinel (Version 1.0), the threat intelligence dashboard

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

Regenerate with:

```bash
npm run generate:map
```

Countries join to targeting data by Natural Earth name via `TARGETING_BY_WORLD_NAME`.

The choropleth ramp is monochrome — `color-mix(in oklab, var(--foreground) …,
var(--muted))` — so it inverts correctly between light and dark themes. Colour is
reserved for the scales that carry meaning: severity, confidence and TLP
(`components/severity-badge.tsx`).
