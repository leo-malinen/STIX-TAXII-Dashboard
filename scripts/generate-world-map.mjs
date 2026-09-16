import { geoNaturalEarth1, geoPath } from "d3-geo";
import { feature } from "topojson-client";
import fs from "node:fs";

const URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";
const W = 800, H = 392;

const topo = await fetch(URL).then((r) => r.json());
const fc = feature(topo, topo.objects.countries);

const projection = geoNaturalEarth1().fitExtent(
  [[4, 4], [W - 4, H - 4]],
  fc
);
// round coords to 1dp to keep the payload small
const path = geoPath(projection).pointRadius(1);

const out = [];
for (const f of fc.features) {
  if (f.properties?.name === "Antarctica") continue;
  const d = path(f);
  if (!d) continue;
  const rounded = d.replace(/-?\d+\.?\d*/g, (n) => {
    const v = Math.round(Number(n) * 10) / 10;
    return String(v);
  });
  // A few de-facto territories (Kosovo, N. Cyprus, Somaliland) carry no ISO
  // numeric code, so fall back to a slug of the name to keep ids unique.
  const id =
    f.id == null
      ? f.properties.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")
      : String(f.id);
  out.push({ id, name: f.properties.name, d: rounded });
}

out.sort((a, b) => a.name.localeCompare(b.name));

const body = `// AUTO-GENERATED from world-atlas@2 countries-110m (Natural Earth 1:110m).
// Projection: geoNaturalEarth1 fitted to a ${W}x${H} viewBox. Antarctica omitted.
// Regenerate with scripts/generate-world-map.mjs — do not hand-edit.

export const WORLD_MAP_VIEWBOX = "0 0 ${W} ${H}";

export type WorldMapFeature = {
	/** ISO 3166-1 numeric code. */
	id: string;
	/** Natural Earth country name. */
	name: string;
	/** SVG path data in the ${W}x${H} viewBox. */
	d: string;
};

export const WORLD_MAP_FEATURES: WorldMapFeature[] = ${JSON.stringify(out, null, 1)};
`;

fs.mkdirSync("components", { recursive: true });
fs.writeFileSync("components/world-map-geo.ts", body);
console.log("features:", out.length, "bytes:", body.length);
