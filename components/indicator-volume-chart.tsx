"use client";

import { useId } from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import { formatInteger } from "@/components/formater";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	type ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart";
import { Delta, DeltaIcon, DeltaValue } from "@/components/delta";

const chartData = [
	{ month: "January", indicators: 4820, observables: 11_240 },
	{ month: "February", indicators: 5310, observables: 12_880 },
	{ month: "March", indicators: 4970, observables: 12_010 },
	{ month: "April", indicators: 6140, observables: 15_320 },
	{ month: "May", indicators: 5880, observables: 14_460 },
	{ month: "June", indicators: 7020, observables: 17_910 },
	{ month: "July", indicators: 6430, observables: 16_240 },
	{ month: "August", indicators: 8110, observables: 20_680 },
	{ month: "September", indicators: 7460, observables: 18_930 },
	{ month: "October", indicators: 9240, observables: 23_470 },
	{ month: "November", indicators: 10_680, observables: 27_150 },
	{ month: "December", indicators: 8940, observables: 22_610 },
];

const totalIndicators = chartData.reduce((sum, row) => sum + row.indicators, 0);

const chartConfig = {
	indicators: {
		label: "Indicators",
		color: "var(--chart-2)",
	},
	observables: {
		label: "Observables",
		color: "var(--chart-4)",
	},
} satisfies ChartConfig;

export function IndicatorVolumeChart() {
	const rawId = useId().replace(/:/g, "");
	const indicatorGradient = `indicators-area-${rawId}`;
	const observableGradient = `observables-area-${rawId}`;

	return (
		<Card className="md:col-span-2 lg:col-span-3 dark:bg-transparent">
			<CardHeader className="flex flex-row items-start justify-between">
				<div className="flex flex-col gap-1.5">
					<CardTitle className="font-mono text-2xl tabular-nums">
						{formatInteger(totalIndicators)}
					</CardTitle>
					<CardDescription className="text-pretty">
						Indicators ingested from TAXII and MISP feeds in the last 12 months.
					</CardDescription>
				</div>
				<Delta value={18.6} variant="badge">
					<DeltaIcon variant="trend" />
					<DeltaValue suffix="%" />
					<span>vs prior 12 months</span>
				</Delta>
			</CardHeader>
			<CardContent>
				<ChartContainer
					className="aspect-auto h-60 w-full"
					config={chartConfig}
				>
					<AreaChart
						accessibilityLayer
						data={chartData}
						margin={{ left: 12, right: 12 }}
					>
						<defs>
							<linearGradient id={indicatorGradient} x1="0" x2="0" y1="0" y2="1">
								<stop
									offset="0%"
									stopColor="var(--color-indicators)"
									stopOpacity={0.35}
								/>
								<stop
									offset="100%"
									stopColor="var(--color-indicators)"
									stopOpacity={0}
								/>
							</linearGradient>
							<linearGradient
								id={observableGradient}
								x1="0"
								x2="0"
								y1="0"
								y2="1"
							>
								<stop
									offset="0%"
									stopColor="var(--color-observables)"
									stopOpacity={0.2}
								/>
								<stop
									offset="100%"
									stopColor="var(--color-observables)"
									stopOpacity={0}
								/>
							</linearGradient>
						</defs>
						<CartesianGrid vertical={false} />
						<XAxis
							axisLine={false}
							dataKey="month"
							tickFormatter={(value) => String(value).slice(0, 3)}
							tickLine={false}
							tickMargin={8}
						/>
						<ChartTooltip
							content={<ChartTooltipContent indicator="dashed" />}
							cursor={{
								stroke: "var(--color-indicators)",
								strokeDasharray: "3 3",
								strokeLinecap: "round",
							}}
							wrapperStyle={{ outline: "none" }}
						/>
						<Area
							dataKey="observables"
							fill={`url(#${observableGradient})`}
							isAnimationActive={false}
							name={chartConfig.observables.label}
							stroke="var(--color-observables)"
							strokeDasharray="4 4"
							strokeWidth={1.5}
							type="linear"
						/>
						<Area
							dataKey="indicators"
							dot={{
								fill: "var(--color-indicators)",
								r: 2.5,
								strokeWidth: 2,
							}}
							fill={`url(#${indicatorGradient})`}
							isAnimationActive={false}
							name={chartConfig.indicators.label}
							stroke="var(--color-indicators)"
							strokeWidth={2}
							type="linear"
						/>
					</AreaChart>
				</ChartContainer>
			</CardContent>
		</Card>
	);
}
