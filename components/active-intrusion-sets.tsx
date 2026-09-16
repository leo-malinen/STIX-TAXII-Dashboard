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

const rows = [
	{ name: "UNC2452", attributedTo: "APT29", lastSeen: "2h ago", relationships: 1840 },
	{ name: "UNC4841", attributedTo: "APT41", lastSeen: "6h ago", relationships: 1320 },
	{ name: "Seashell Blizzard", attributedTo: "Sandworm Team", lastSeen: "9h ago", relationships: 1180 },
	{ name: "TA505", attributedTo: "FIN11", lastSeen: "14h ago", relationships: 960 },
	{ name: "Mustang Panda", attributedTo: "—", lastSeen: "1d ago", relationships: 870 },
	{ name: "Volt Typhoon", attributedTo: "—", lastSeen: "1d ago", relationships: 740 },
] as const;

export function ActiveIntrusionSets() {
	return (
		<Card className="relative md:col-span-2 dark:bg-transparent">
			<CardHeader>
				<CardTitle className="text-balance">Active intrusion sets</CardTitle>
				<CardDescription className="text-pretty">
					Sets with new relationships since the last feed synchronisation.
				</CardDescription>
			</CardHeader>
			<CardContent className="mask-b-from-50% mask-b-to-100% p-0 pb-2">
				<Table className="border-t">
					<TableCaption className="sr-only">
						Intrusion sets with attribution, relationship count and time last
						seen.
					</TableCaption>
					<TableHeader>
						<TableRow>
							<TableHead className="pl-6" scope="col">
								Intrusion set
							</TableHead>
							<TableHead scope="col">Attributed to</TableHead>
							<TableHead className="text-end tabular-nums" scope="col">
								Relations
							</TableHead>
							<TableHead className="pr-6 text-end" scope="col">
								Last seen
							</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{rows.map((row) => (
							<TableRow className="hover:bg-transparent" key={row.name}>
								<TableCell className="max-w-[180px] truncate pl-6 font-medium">
									<span className="w-max rounded border border-border bg-muted/50 px-1 py-px font-mono text-xs">
										{row.name}
									</span>
								</TableCell>
								<TableCell className="max-w-[140px] truncate text-muted-foreground text-xs">
									{row.attributedTo}
								</TableCell>
								<TableCell className="text-end text-muted-foreground text-xs tabular-nums">
									{formatInteger(row.relationships)}
								</TableCell>
								<TableCell className="pr-6 text-end text-muted-foreground text-xs tabular-nums">
									{row.lastSeen}
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
