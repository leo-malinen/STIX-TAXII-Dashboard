"use client";

import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from "recharts";
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
import { TARGETED_SECTORS } from "@/lib/threat-intel";

const chartConfig = {
	campaigns: {
		label: "Campaigns",
		color: "var(--chart-2)",
	},
} satisfies ChartConfig;

export function TargetedSectorsChart() {
	return (
		<Card className="md:col-span-2 dark:bg-transparent">
			<CardHeader className="border-b">
				<CardTitle className="text-balance">Targeted sectors</CardTitle>
				<CardDescription className="text-pretty">
					Campaigns with an active <code className="font-mono">targets</code>{" "}
					edge to an identity of class <code className="font-mono">sector</code>.
				</CardDescription>
			</CardHeader>
			<CardContent>
				<ChartContainer
					className="aspect-auto h-72 w-full"
					config={chartConfig}
				>
					<BarChart
						accessibilityLayer
						data={TARGETED_SECTORS}
						layout="vertical"
						margin={{ left: 4, right: 36, top: 4, bottom: 4 }}
					>
						<CartesianGrid horizontal={false} />
						<YAxis
							axisLine={false}
							dataKey="name"
							tickLine={false}
							tickMargin={8}
							type="category"
							width={132}
						/>
						<XAxis dataKey="campaigns" hide type="number" />
						<ChartTooltip
							content={<ChartTooltipContent indicator="dashed" />}
							cursor={{ fill: "var(--muted)", fillOpacity: 0.5 }}
							wrapperStyle={{ outline: "none" }}
						/>
						<Bar
							barSize={18}
							dataKey="campaigns"
							fill="var(--color-campaigns)"
							isAnimationActive={false}
							name={chartConfig.campaigns.label}
							radius={[0, 4, 4, 0]}
						>
							<LabelList
								className="fill-muted-foreground text-xs tabular-nums"
								dataKey="campaigns"
								offset={8}
								position="right"
							/>
						</Bar>
					</BarChart>
				</ChartContainer>
			</CardContent>
		</Card>
	);
}
