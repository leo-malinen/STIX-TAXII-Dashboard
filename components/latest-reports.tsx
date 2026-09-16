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
import { TlpBadge } from "@/components/severity-badge";
import type { TlpMarking } from "@/lib/threat-intel";

const rows: {
	title: string;
	source: string;
	reportClass: string;
	objects: number;
	tlp: TlpMarking;
	published: string;
}[] = [
	{ title: "Seashell Blizzard shifts to OT-adjacent staging", source: "Internal CTI", reportClass: "threat-report", objects: 214, tlp: "AMBER+STRICT", published: "15 Sep 2026" },
	{ title: "SilentQuill spear-phishing infrastructure teardown", source: "MISP — CIRCL", reportClass: "threat-report", objects: 168, tlp: "GREEN", published: "13 Sep 2026" },
	{ title: "LockBit 3.0 affiliate tooling overlap", source: "TAXII — Anomali", reportClass: "malware-analysis", objects: 96, tlp: "AMBER", published: "11 Sep 2026" },
	{ title: "Exploitation of CVE-2025-31324 in the wild", source: "CISA KEV", reportClass: "vulnerability", objects: 74, tlp: "CLEAR", published: "09 Sep 2026" },
	{ title: "Volt Typhoon living-off-the-land refresh", source: "Internal CTI", reportClass: "threat-report", objects: 142, tlp: "RED", published: "06 Sep 2026" },
];

export function LatestReports() {
	return (
		<Card className="relative md:col-span-2 lg:col-span-4 dark:bg-transparent">
			<CardHeader>
				<CardTitle className="text-balance">Latest reports</CardTitle>
				<CardDescription className="text-pretty">
					Finished intelligence ingested from analysts and upstream feeds.
				</CardDescription>
			</CardHeader>
			<CardContent className="mask-b-from-50% mask-b-to-100% p-0 pb-2">
				<Table className="border-t">
					<TableCaption className="sr-only">
						Reports with source, classification, contained object count, TLP
						marking and publication date.
					</TableCaption>
					<TableHeader>
						<TableRow>
							<TableHead className="pl-6" scope="col">
								Report
							</TableHead>
							<TableHead className="hidden sm:table-cell" scope="col">
								Source
							</TableHead>
							<TableHead scope="col">Marking</TableHead>
							<TableHead className="text-end tabular-nums" scope="col">
								Objects
							</TableHead>
							<TableHead className="pr-6 text-end" scope="col">
								Published
							</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{rows.map((row) => (
							<TableRow className="hover:bg-transparent" key={row.title}>
								<TableCell className="max-w-[320px] truncate pl-6 font-medium">
									<span className="flex min-w-0 flex-col gap-0.5">
										<span className="truncate">{row.title}</span>
										<span className="truncate font-mono text-[10px] text-muted-foreground">
											{row.reportClass}
										</span>
									</span>
								</TableCell>
								<TableCell className="hidden max-w-[160px] truncate text-muted-foreground text-xs sm:table-cell">
									{row.source}
								</TableCell>
								<TableCell>
									<TlpBadge marking={row.tlp} />
								</TableCell>
								<TableCell className="text-end text-muted-foreground text-xs tabular-nums">
									{row.objects}
								</TableCell>
								<TableCell className="pr-6 text-end text-muted-foreground text-xs tabular-nums">
									{row.published}
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
