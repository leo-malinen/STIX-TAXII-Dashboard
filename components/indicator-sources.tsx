import { formatCompactNumber } from "@/components/formater";
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
import { StatusIndicator } from "@/components/indicator";

const rows = [
	{ name: "MISP — CIRCL", protocol: "MISP 2.4", indicators: 28_410, status: "online", delta: 6.2 },
	{ name: "Anomali Limo", protocol: "TAXII 2.1", indicators: 19_260, status: "online", delta: 11.8 },
	{ name: "AlienVault OTX", protocol: "TAXII 2.0", indicators: 14_930, status: "online", delta: -3.4 },
	{ name: "Abuse.ch ThreatFox", protocol: "TAXII 2.1", indicators: 11_180, status: "online", delta: 9.1 },
	{ name: "CISA AIS", protocol: "TAXII 2.1", indicators: 6840, status: "degraded", delta: -12.7 },
	{ name: "Internal sensors", protocol: "STIX 2.1", indicators: 4380, status: "online", delta: 22.5 },
] as const;

export function IndicatorSources() {
	return (
		<Card className="relative md:col-span-2 lg:col-span-4 dark:bg-transparent">
			<CardHeader>
				<CardTitle className="text-balance">Indicator sources</CardTitle>
				<CardDescription className="text-pretty">
					Connected collections ranked by indicators contributed.
				</CardDescription>
			</CardHeader>
			<CardContent className="mask-b-from-50% mask-b-to-100% p-0 pb-2">
				<Table className="border-t">
					<TableCaption className="sr-only">
						Feeds with transport protocol, indicator volume and change against
						the prior period.
					</TableCaption>
					<TableHeader>
						<TableRow>
							<TableHead className="pl-6" scope="col">
								Collection
							</TableHead>
							<TableHead scope="col">Protocol</TableHead>
							<TableHead className="text-end tabular-nums" scope="col">
								Indicators
							</TableHead>
							<TableHead className="pr-6 text-end" scope="col">
								Change
							</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{rows.map((row) => (
							<TableRow className="hover:bg-transparent" key={row.name}>
								<TableCell className="max-w-[220px] truncate pl-6 font-medium">
									<span className="inline-flex max-w-full items-center gap-2">
										<StatusIndicator
											color={row.status === "online" ? "emerald" : "amber"}
											pulse={row.status !== "online"}
										/>
										<span className="min-w-0 truncate text-xs">{row.name}</span>
									</span>
								</TableCell>
								<TableCell className="text-muted-foreground">
									<span className="w-max rounded border border-border bg-muted/50 px-1 py-px font-mono text-[10px]">
										{row.protocol}
									</span>
								</TableCell>
								<TableCell className="text-end text-muted-foreground text-xs tabular-nums">
									{formatCompactNumber(row.indicators)}
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
