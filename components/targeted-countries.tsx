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
import { TARGETED_COUNTRIES } from "@/lib/threat-intel";

const FLAGPACK_BASE = "https://flag.vercel.app";

const regionNames = new Intl.DisplayNames(["en"], { type: "region" });

const rows = TARGETED_COUNTRIES.slice(0, 6);

function flagUrl(countryCode: string) {
	return `${FLAGPACK_BASE}/s/${countryCode.toUpperCase()}.svg`;
}

export function TargetedCountries() {
	return (
		<Card className="relative md:col-span-2 dark:bg-transparent">
			<CardHeader>
				<CardTitle className="text-balance">Targeted countries</CardTitle>
				<CardDescription className="text-pretty">
					Most targeted countries in the last 12 months.
				</CardDescription>
			</CardHeader>
			<CardContent className="mask-b-from-50% mask-b-to-100% p-0 pb-2">
				<Table className="border-t">
					<TableCaption className="sr-only">
						Countries by targeting events, distinct intrusion sets and
						year-over-year change.
					</TableCaption>
					<TableHeader>
						<TableRow>
							<TableHead className="pl-6" scope="col">
								Country
							</TableHead>
							<TableHead className="text-end tabular-nums" scope="col">
								Sets
							</TableHead>
							<TableHead className="text-end tabular-nums" scope="col">
								Events
							</TableHead>
							<TableHead className="pr-6 text-end" scope="col">
								Change
							</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{rows.map((row) => (
							<TableRow className="hover:bg-transparent" key={row.code}>
								<TableCell className="max-w-[220px] truncate pl-6 font-medium">
									<span className="inline-flex max-w-full items-center gap-2">
										<img
											alt={`Flag of ${row.code}`}
											className="h-3.5 w-5 shrink-0 rounded object-cover"
											height={14}
											src={flagUrl(row.code)}
											width={20}
										/>
										<span className="min-w-0 truncate text-xs">
											{regionNames.of(row.code) ?? row.code}
										</span>
									</span>
								</TableCell>
								<TableCell className="text-end text-muted-foreground text-xs tabular-nums">
									{row.intrusionSets}
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
