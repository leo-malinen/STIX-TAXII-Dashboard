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

/** Dual-use and offensive tooling observed in intrusions, per ATT&CK software. */
const tools = [
	{ name: "Mimikatz", id: "S0002", sightings: 6420 },
	{ name: "Impacket", id: "S0357", sightings: 5180 },
	{ name: "PsExec", id: "S0029", sightings: 4360 },
	{ name: "Rclone", id: "S1040", sightings: 3110 },
	{ name: "AnyDesk", id: "S0500", sightings: 2240 },
	{ name: "Ngrok", id: "S0508", sightings: 1520 },
] as const;

const maxSightings = Math.max(...tools.map((t) => t.sightings));

export function ActiveTools() {
	return (
		<Card className="dark:bg-transparent">
			<CardHeader className="border-b">
				<CardTitle className="text-balance">Active tools</CardTitle>
				<CardDescription className="text-pretty">
					Tooling observed in intrusions in the last 90 days.
				</CardDescription>
			</CardHeader>
			<CardContent className="p-0 py-1">
				<ShareBarList aria-label="Tools by sightings">
					{tools.map((row) => (
						<ShareBarListItem
							key={row.id}
							value={(row.sightings / maxSightings) * 78}
						>
							<ShareBarListContent>
								<ShareBarListLabel className="flex min-w-0 flex-col gap-0.5">
									<span className="truncate">{row.name}</span>
									<span className="truncate font-mono text-[10px] text-muted-foreground">
										{row.id}
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
