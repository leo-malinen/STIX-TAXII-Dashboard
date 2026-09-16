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
	actor: string;
	objective: string;
	firstSeen: string;
	confidence: Confidence;
}[] = [
	{ name: "Operation Blizzard Relay", actor: "Seashell Blizzard", objective: "sabotage", firstSeen: "12 Sep 2026", confidence: "high" },
	{ name: "SilentQuill", actor: "APT29", objective: "espionage", firstSeen: "04 Sep 2026", confidence: "high" },
	{ name: "Harvest Moon", actor: "Lazarus Group", objective: "financial-gain", firstSeen: "28 Aug 2026", confidence: "moderate" },
	{ name: "Copper Lantern", actor: "Mustang Panda", objective: "espionage", firstSeen: "19 Aug 2026", confidence: "moderate" },
	{ name: "Tidepool", actor: "APT41", objective: "espionage", firstSeen: "07 Aug 2026", confidence: "high" },
	{ name: "Redline Drift", actor: "FIN7", objective: "financial-gain", firstSeen: "25 Jul 2026", confidence: "low" },
];

export function LatestCampaigns() {
	return (
		<Card className="relative md:col-span-2 dark:bg-transparent">
			<CardHeader>
				<CardTitle className="text-balance">Latest campaigns</CardTitle>
				<CardDescription className="text-pretty">
					Newly created campaign objects, most recent first.
				</CardDescription>
			</CardHeader>
			<CardContent className="mask-b-from-50% mask-b-to-100% p-0 pb-2">
				<Table className="border-t">
					<TableCaption className="sr-only">
						Campaigns with the attributed actor, objective and first-seen date.
					</TableCaption>
					<TableHeader>
						<TableRow>
							<TableHead className="pl-6" scope="col">
								Campaign
							</TableHead>
							<TableHead scope="col">Attributed to</TableHead>
							<TableHead scope="col">Confidence</TableHead>
							<TableHead className="pr-6 text-end" scope="col">
								First seen
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
											{row.objective}
										</span>
									</span>
								</TableCell>
								<TableCell className="max-w-[140px] truncate text-muted-foreground text-xs">
									{row.actor}
								</TableCell>
								<TableCell>
									<ConfidenceBadge confidence={row.confidence} />
								</TableCell>
								<TableCell className="pr-6 text-end text-muted-foreground text-xs tabular-nums">
									{row.firstSeen}
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
