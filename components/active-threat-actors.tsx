import { formatInteger } from "@/components/formater";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { CardTableFooter } from "@/components/card-table-footer";
import { ConfidenceBadge } from "@/components/severity-badge";
import type { Confidence } from "@/lib/threat-intel";

const rows: {
	name: string;
	motivation: string;
	sightings: number;
	confidence: Confidence;
	delta: number;
}[] = [
	{ name: "APT29", motivation: "espionage", sightings: 4820, confidence: "high", delta: 12.4 },
	{ name: "Sandworm Team", motivation: "sabotage", sightings: 3960, confidence: "high", delta: 24.1 },
	{ name: "APT41", motivation: "espionage", sightings: 3210, confidence: "high", delta: -2.8 },
	{ name: "Lazarus Group", motivation: "financial-gain", sightings: 2870, confidence: "high", delta: 8.6 },
	{ name: "FIN7", motivation: "financial-gain", sightings: 2140, confidence: "moderate", delta: 5.2 },
	{ name: "Charming Kitten", motivation: "espionage", sightings: 1680, confidence: "moderate", delta: 17.3 },
];

export function ActiveThreatActors() {
	return (
		<Card className="relative md:col-span-2 dark:bg-transparent">
			<CardHeader>
				<CardTitle className="text-balance">Active threat actors</CardTitle>
				<CardDescription className="text-pretty">
					Ranked by sightings across all collections in the last 90 days.
				</CardDescription>
			</CardHeader>
			<CardContent className="mask-b-from-50% mask-b-to-100% p-0 pb-2">
				<Table className="border-t">
					<TableCaption className="sr-only">
						Threat actors by sightings, primary motivation and attribution
						confidence.
					</TableCaption>
					<TableHeader>
						<TableRow>
							<TableHead className="pl-6" scope="col">
								Actor
							</TableHead>
							<TableHead scope="col">Confidence</TableHead>
							<TableHead className="text-end tabular-nums" scope="col">
								Sightings
							</TableHead>
							<TableHead className="pr-6 text-end" scope="col">
								Change
							</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{rows.map((row) => (
							<TableRow className="hover:bg-transparent" key={row.name}>
								<TableCell className="max-w-[200px] truncate pl-6 font-medium">
									<span className="flex min-w-0 flex-col gap-0.5">
										<span className="truncate">{row.name}</span>
										<span className="truncate font-mono text-[10px] text-muted-foreground">
											{row.motivation}
										</span>
									</span>
								</TableCell>
								<TableCell>
									<ConfidenceBadge confidence={row.confidence} />
								</TableCell>
								<TableCell className="text-end text-muted-foreground text-xs tabular-nums">
									{formatInteger(row.sightings)}
								</TableCell>
								<TableCell className="pr-6 text-end text-muted-foreground text-xs">
									<span className="tabular-nums">
										{row.delta > 0 ? "+" : ""}
										{row.delta}%
									</span>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</CardContent>
			<CardTableFooter />
		</Card>
	);
}
