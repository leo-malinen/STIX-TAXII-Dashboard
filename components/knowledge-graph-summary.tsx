import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Delta, DeltaIcon, DeltaValue } from "@/components/delta";
import { formatInteger } from "@/components/formater";
import {
	BinaryIcon,
	BugIcon,
	FingerprintIcon,
	FlagIcon,
	NetworkIcon,
	UsersIcon,
} from "lucide-react";

/** Top-level STIX Domain Object counts in the OpenCTI knowledge graph. */
const entities = [
	{
		icon: UsersIcon,
		label: "Threat actors",
		stixType: "threat-actor",
		value: 1284,
		delta: 3.2,
	},
	{
		icon: NetworkIcon,
		label: "Intrusion sets",
		stixType: "intrusion-set",
		value: 742,
		delta: 5.8,
	},
	{
		icon: FlagIcon,
		label: "Campaigns",
		stixType: "campaign",
		value: 396,
		delta: 11.4,
	},
	{
		icon: BugIcon,
		label: "Malware",
		stixType: "malware",
		value: 2917,
		delta: 7.1,
	},
	{
		icon: FingerprintIcon,
		label: "Indicators",
		stixType: "indicator",
		value: 85_004,
		delta: 18.6,
	},
	{
		icon: BinaryIcon,
		label: "Observables",
		stixType: "observed-data",
		value: 232_890,
		delta: 21.9,
	},
] as const;

export function KnowledgeGraphSummary() {
	return (
		<Card className="md:col-span-2 lg:col-span-4 dark:bg-transparent">
			<CardHeader className="border-b">
				<CardTitle className="text-balance">Knowledge graph</CardTitle>
				<CardDescription className="text-pretty">
					STIX domain objects held across every connected TAXII collection and
					MISP instance.
				</CardDescription>
			</CardHeader>
			<CardContent>
				<ul className="grid gap-6 sm:grid-cols-3 lg:grid-cols-6">
					{entities.map((entity) => {
						const Icon = entity.icon;

						return (
							<li className="flex flex-col gap-1" key={entity.stixType}>
								<div className="flex items-center gap-1.5 text-muted-foreground">
									<Icon aria-hidden="true" className="size-3.5 shrink-0" />
									<p className="text-pretty font-medium text-sm text-foreground">
										{entity.label}
									</p>
								</div>
								<p className="truncate font-mono text-[10px] text-muted-foreground">
									{entity.stixType}
								</p>
								<p className="text-balance font-semibold text-2xl tabular-nums">
									{formatInteger(entity.value)}
								</p>
								<div className="flex items-center gap-1.5 text-pretty text-muted-foreground text-xs">
									<Delta value={entity.delta} variant="default">
										<DeltaIcon />
										<DeltaValue suffix="%" />
									</Delta>
									<span>vs prior year</span>
								</div>
							</li>
						);
					})}
				</ul>
			</CardContent>
		</Card>
	);
}
