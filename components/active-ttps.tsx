import { formatCompactNumber } from "@/components/formater";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	ShareBarList,
	ShareBarListContent,
	ShareBarListFill,
	ShareBarListItem,
	ShareBarListLabel,
	ShareBarListValue,
} from "@/components/share-bar-list";

/** Attack patterns (MITRE ATT&CK techniques) by sightings. */
const techniques = [
	{ id: "T1566.001", name: "Spearphishing Attachment", tactic: "initial-access", sightings: 7840 },
	{ id: "T1059.001", name: "PowerShell", tactic: "execution", sightings: 6910 },
	{ id: "T1078", name: "Valid Accounts", tactic: "persistence", sightings: 5230 },
	{ id: "T1486", name: "Data Encrypted for Impact", tactic: "impact", sightings: 4120 },
	{ id: "T1071.001", name: "Web Protocols", tactic: "command-and-control", sightings: 3480 },
	{ id: "T1567.002", name: "Exfil to Cloud Storage", tactic: "exfiltration", sightings: 2260 },
] as const;

const maxSightings = Math.max(...techniques.map((t) => t.sightings));

export function ActiveTtps() {
	return (
		<Card className="dark:bg-transparent">
			<CardHeader className="border-b">
				<CardTitle className="text-balance">Active TTPs</CardTitle>
				<CardDescription className="text-pretty">
					ATT&amp;CK techniques seen across active campaigns.
				</CardDescription>
			</CardHeader>
			<CardContent className="p-0 py-1">
				<ShareBarList aria-label="Attack patterns by sightings">
					{techniques.map((row) => (
						<ShareBarListItem
							key={row.id}
							value={(row.sightings / maxSightings) * 78}
						>
							<ShareBarListContent>
								<ShareBarListLabel className="flex min-w-0 flex-col gap-0.5">
									<span className="truncate">{row.name}</span>
									<span className="truncate font-mono text-[10px] text-muted-foreground">
										{row.id} · {row.tactic}
									</span>
								</ShareBarListLabel>
								<ShareBarListValue>
									{formatCompactNumber(row.sightings)}
								</ShareBarListValue>
							</ShareBarListContent>
							<ShareBarListFill />
						</ShareBarListItem>
					))}
				</ShareBarList>
			</CardContent>
		</Card>
	);
}
