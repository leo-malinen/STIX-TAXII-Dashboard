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
import { TARGETED_REGIONS } from "@/lib/threat-intel";

export function TargetedRegions() {
	return (
		<Card className="dark:bg-transparent">
			<CardHeader className="border-b">
				<CardTitle className="text-balance">Targeted regions</CardTitle>
				<CardDescription className="text-pretty">
					Share of targeting relationships by region.
				</CardDescription>
			</CardHeader>
			<CardContent className="p-0 py-1">
				<ShareBarList aria-label="Targeting share by region">
					{TARGETED_REGIONS.map((row) => (
						<ShareBarListItem key={row.name} value={row.share}>
							<ShareBarListContent>
								<ShareBarListLabel>{row.name}</ShareBarListLabel>
								<ShareBarListValue>{row.share}%</ShareBarListValue>
							</ShareBarListContent>
							<ShareBarListFill />
						</ShareBarListItem>
					))}
				</ShareBarList>
			</CardContent>
		</Card>
	);
}
