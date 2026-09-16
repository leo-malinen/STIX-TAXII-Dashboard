"use client";

import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { formatInteger } from "@/components/formater";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Delta, DeltaIcon, DeltaValue } from "@/components/delta";
import {
	MAX_COUNTRY_SIGHTINGS,
	TARGETING_BY_WORLD_NAME,
	TARGETED_COUNTRIES,
	type TargetedCountry,
} from "@/lib/threat-intel";
import {
	WORLD_MAP_FEATURES,
	WORLD_MAP_VIEWBOX,
} from "@/components/world-map-geo";

const FLAGPACK_BASE = "https://flag.vercel.app";
const regionNames = new Intl.DisplayNames(["en"], { type: "region" });

const totalSightings = TARGETED_COUNTRIES.reduce(
	(sum, row) => sum + row.sightings,
	0
);

/**
 * Sightings are heavily skewed toward the top few countries, so the ramp is
 * square-rooted — otherwise everything below the US collapses into one shade.
 */
function intensity(sightings: number) {
	return Math.sqrt(sightings / MAX_COUNTRY_SIGHTINGS);
}

function fillFor(country: TargetedCountry | undefined) {
	if (!country) {
		return "var(--muted)";
	}
	const mix = 16 + intensity(country.sightings) * 66;
	return `color-mix(in oklab, var(--foreground) ${mix.toFixed(1)}%, var(--muted))`;
}

const LEGEND_STOPS = [0, 0.25, 0.5, 0.75, 1] as const;

export function ThreatMap() {
	const [hovered, setHovered] = useState<string | null>(null);

	const active = useMemo(
		() => (hovered ? TARGETING_BY_WORLD_NAME.get(hovered) : undefined),
		[hovered]
	);

	return (
		<Card className="md:col-span-2 lg:col-span-4 dark:bg-transparent">
			<CardHeader className="flex flex-row items-start justify-between gap-3 border-b">
				<div className="flex flex-col gap-1.5">
					<CardTitle className="text-balance">Global targeting</CardTitle>
					<CardDescription className="text-pretty">
						Countries resolved from <code className="font-mono">targets</code>{" "}
						relationships across all collections.
					</CardDescription>
				</div>
				<div className="flex items-center gap-3">
					<div className="hidden flex-col items-end gap-0.5 sm:flex">
						<span className="font-mono text-lg tabular-nums leading-none">
							{formatInteger(totalSightings)}
						</span>
						<span className="text-muted-foreground text-xs">
							targeting events
						</span>
					</div>
					<Delta value={9.4} variant="badge">
						<DeltaIcon variant="trend" />
						<DeltaValue suffix="%" />
					</Delta>
				</div>
			</CardHeader>

			<CardContent className="flex flex-col gap-4">
				<div className="relative mx-auto w-full max-w-4xl">
					<svg
						aria-label="World map shaded by volume of targeting activity"
						className="h-auto w-full"
						role="img"
						viewBox={WORLD_MAP_VIEWBOX}
					>
						<title>Targeting activity by country</title>
						{WORLD_MAP_FEATURES.map((feature) => {
							const country = TARGETING_BY_WORLD_NAME.get(feature.name);
							const isActive = hovered === feature.name;

							return (
								<path
									className={cn(
										"transition-[fill,stroke] duration-150",
										country && "cursor-pointer"
									)}
									d={feature.d}
									fill={fillFor(country)}
									key={feature.id}
									onMouseEnter={() =>
										setHovered(country ? feature.name : null)
									}
									onMouseLeave={() => setHovered(null)}
									stroke={
										isActive ? "var(--foreground)" : "var(--background)"
									}
									strokeWidth={isActive ? 1 : 0.4}
								/>
							);
						})}
					</svg>

					<div
						aria-live="polite"
						className={cn(
							"pointer-events-none absolute top-0 left-0 flex items-center gap-2",
							"rounded-md border bg-background/95 px-2.5 py-1.5 shadow-sm backdrop-blur",
							"transition-opacity duration-150",
							active ? "opacity-100" : "opacity-0"
						)}
					>
						{active ? (
							<>
								<img
									alt=""
									className="h-3.5 w-5 shrink-0 rounded object-cover"
									height={14}
									src={`${FLAGPACK_BASE}/s/${active.code}.svg`}
									width={20}
								/>
								<span className="font-medium text-xs">
									{regionNames.of(active.code) ?? active.code}
								</span>
								<span className="font-mono text-muted-foreground text-xs tabular-nums">
									{formatInteger(active.sightings)}
								</span>
							</>
						) : null}
					</div>
				</div>

				<div className="flex flex-wrap items-center justify-between gap-3 border-t pt-4">
					<p className="text-muted-foreground text-xs">
						{TARGETED_COUNTRIES.length} countries with active targeting
					</p>
					<div className="flex items-center gap-2">
						<span className="text-muted-foreground text-xs">Lower</span>
						<div className="flex items-center gap-0.5">
							{LEGEND_STOPS.map((stop) => (
								<span
									className="size-3 rounded-[2px]"
									key={stop}
									style={{
										backgroundColor: `color-mix(in oklab, var(--foreground) ${(
											16 +
											stop * 66
										).toFixed(1)}%, var(--muted))`,
									}}
								/>
							))}
						</div>
						<span className="text-muted-foreground text-xs">Higher</span>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
