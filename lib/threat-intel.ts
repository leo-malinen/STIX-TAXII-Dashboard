/**
 * Mock STIX 2.1 domain objects aggregated from the connected TAXII collections,
 * MISP instances and the OpenCTI knowledge graph.
 *
 * Shapes mirror the OpenCTI entity model so the cards can be swapped onto a live
 * GraphQL query without changing their markup.
 */

export type Confidence = "low" | "moderate" | "high";
export type Severity = "low" | "medium" | "high" | "critical";
export type TlpMarking = "CLEAR" | "GREEN" | "AMBER" | "AMBER+STRICT" | "RED";

/** Reporting window shared by every card header. */
export const REPORTING_WINDOW = "last 12 months";

/* -------------------------------------------------------------------------- */
/* Targeting — shared by the world map and the country table                   */
/* -------------------------------------------------------------------------- */

export type TargetedCountry = {
	/** ISO 3166-1 alpha-2, used for the flag asset. */
	code: string;
	/** Natural Earth name, used to join against the map geometry. */
	worldName: string;
	/** Relationship count: `targets` edges resolved to this country. */
	sightings: number;
	/** Distinct intrusion sets with an active `targets` edge. */
	intrusionSets: number;
	delta: number;
};

export const TARGETED_COUNTRIES: TargetedCountry[] = [
	{ code: "US", worldName: "United States of America", sightings: 18_420, intrusionSets: 61, delta: 4.1 },
	{ code: "UA", worldName: "Ukraine", sightings: 11_260, intrusionSets: 44, delta: 18.7 },
	{ code: "DE", worldName: "Germany", sightings: 7840, intrusionSets: 33, delta: 8.1 },
	{ code: "GB", worldName: "United Kingdom", sightings: 6910, intrusionSets: 31, delta: -1.4 },
	{ code: "IN", worldName: "India", sightings: 6180, intrusionSets: 28, delta: 12.2 },
	{ code: "IL", worldName: "Israel", sightings: 5720, intrusionSets: 26, delta: 22.4 },
	{ code: "KR", worldName: "South Korea", sightings: 4960, intrusionSets: 24, delta: 6.5 },
	{ code: "JP", worldName: "Japan", sightings: 4310, intrusionSets: 22, delta: 3.6 },
	{ code: "TW", worldName: "Taiwan", sightings: 4020, intrusionSets: 21, delta: 16.9 },
	{ code: "FR", worldName: "France", sightings: 3680, intrusionSets: 19, delta: 2.8 },
	{ code: "PL", worldName: "Poland", sightings: 3240, intrusionSets: 18, delta: 14.3 },
	{ code: "SA", worldName: "Saudi Arabia", sightings: 2810, intrusionSets: 15, delta: 9.2 },
	{ code: "CA", worldName: "Canada", sightings: 2540, intrusionSets: 14, delta: 0.9 },
	{ code: "AU", worldName: "Australia", sightings: 2260, intrusionSets: 13, delta: 5.4 },
	{ code: "BR", worldName: "Brazil", sightings: 1980, intrusionSets: 12, delta: 7.7 },
	{ code: "NL", worldName: "Netherlands", sightings: 1740, intrusionSets: 11, delta: 11.5 },
	{ code: "IT", worldName: "Italy", sightings: 1520, intrusionSets: 10, delta: -3.1 },
	{ code: "ES", worldName: "Spain", sightings: 1360, intrusionSets: 9, delta: 1.7 },
	{ code: "SE", worldName: "Sweden", sightings: 1180, intrusionSets: 9, delta: 6.1 },
	{ code: "NO", worldName: "Norway", sightings: 980, intrusionSets: 8, delta: 4.8 },
	{ code: "AE", worldName: "United Arab Emirates", sightings: 910, intrusionSets: 8, delta: 13.6 },
	{ code: "SG", worldName: "Singapore", sightings: 860, intrusionSets: 7, delta: 8.9 },
	{ code: "VN", worldName: "Vietnam", sightings: 780, intrusionSets: 7, delta: 10.2 },
	{ code: "TR", worldName: "Turkey", sightings: 720, intrusionSets: 6, delta: 2.2 },
	{ code: "MX", worldName: "Mexico", sightings: 640, intrusionSets: 6, delta: 5.9 },
	{ code: "ZA", worldName: "South Africa", sightings: 520, intrusionSets: 5, delta: 3.3 },
	{ code: "FI", worldName: "Finland", sightings: 480, intrusionSets: 5, delta: 7.4 },
	{ code: "CH", worldName: "Switzerland", sightings: 430, intrusionSets: 4, delta: -0.6 },
	{ code: "PH", worldName: "Philippines", sightings: 390, intrusionSets: 4, delta: 9.8 },
	{ code: "EG", worldName: "Egypt", sightings: 310, intrusionSets: 3, delta: 4.4 },
];

export const MAX_COUNTRY_SIGHTINGS = Math.max(
	...TARGETED_COUNTRIES.map((c) => c.sightings)
);

/**
 * Natural Earth name -> targeting record, for the choropleth join.
 *
 * Note: a handful of micro-states (Singapore among them) have no polygon in the
 * 1:110m geometry, so they appear in the tables but cannot be shaded on the map.
 */
export const TARGETING_BY_WORLD_NAME = new Map(
	TARGETED_COUNTRIES.map((c) => [c.worldName, c])
);

export type TargetedRegion = {
	name: string;
	/** Share of all `targets` relationships, in percent. */
	share: number;
};

export const TARGETED_REGIONS: TargetedRegion[] = [
	{ name: "Europe", share: 34 },
	{ name: "Northern America", share: 26 },
	{ name: "Asia-Pacific", share: 21 },
	{ name: "Middle East", share: 11 },
	{ name: "Latin America", share: 5 },
	{ name: "Africa", share: 3 },
];

export type TargetedSector = {
	name: string;
	/** Distinct campaigns with a `targets` edge to this sector. */
	campaigns: number;
};

export const TARGETED_SECTORS: TargetedSector[] = [
	{ name: "Government", campaigns: 412 },
	{ name: "Defense", campaigns: 348 },
	{ name: "Financial services", campaigns: 296 },
	{ name: "Energy & utilities", campaigns: 241 },
	{ name: "Healthcare", campaigns: 188 },
	{ name: "Technology", campaigns: 164 },
	{ name: "Telecommunications", campaigns: 131 },
	{ name: "Manufacturing", campaigns: 97 },
];
