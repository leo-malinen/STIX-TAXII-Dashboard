import { ActiveIntrusionSets } from "@/components/active-intrusion-sets";
import { ActiveMalware } from "@/components/active-malware";
import { ActiveThreatActors } from "@/components/active-threat-actors";
import { ActiveTools } from "@/components/active-tools";
import { ActiveTtps } from "@/components/active-ttps";
import { ActiveVulnerabilities } from "@/components/active-vulnerabilities";
import { IndicatorSources } from "@/components/indicator-sources";
import { IndicatorVolumeChart } from "@/components/indicator-volume-chart";
import { KnowledgeGraphSummary } from "@/components/knowledge-graph-summary";
import { LatestCampaigns } from "@/components/latest-campaigns";
import { LatestReports } from "@/components/latest-reports";
import { LiveIngest } from "@/components/live-ingest";
import { TargetedCountries } from "@/components/targeted-countries";
import { TargetedRegions } from "@/components/targeted-regions";
import { TargetedSectorsChart } from "@/components/targeted-sectors-chart";
import { ThreatMap } from "@/components/threat-map";

export function Dashboard() {
	return (
		<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
			<KnowledgeGraphSummary />

			<IndicatorVolumeChart />
			<LiveIngest />

			<ThreatMap />

			<ActiveThreatActors />
			<ActiveIntrusionSets />

			<TargetedCountries />
			<TargetedSectorsChart />

			<ActiveMalware />
			<ActiveTools />
			<ActiveTtps />
			<TargetedRegions />

			<ActiveVulnerabilities />
			<LatestCampaigns />

			<IndicatorSources />
			<LatestReports />
		</div>
	);
}
