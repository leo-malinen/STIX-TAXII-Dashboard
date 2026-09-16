import type { ReactNode } from "react";
import {
	BinaryIcon,
	BugIcon,
	CrosshairIcon,
	FileTextIcon,
	FingerprintIcon,
	FlagIcon,
	LayoutDashboardIcon,
	NetworkIcon,
	PlugIcon,
	RadioTowerIcon,
	ShieldAlertIcon,
	UsersIcon,
	WrenchIcon,
} from "lucide-react";

export type SidebarNavItem = {
	title: string;
	path?: string;
	icon?: ReactNode;
	isActive?: boolean;
	subItems?: SidebarNavItem[];
};

export type SidebarNavGroup = {
	label: string;
	items: SidebarNavItem[];
};

export const navGroups: SidebarNavGroup[] = [
	{
		label: "Analysis",
		items: [
			{
				title: "Overview",
				path: "#/overview",
				icon: <LayoutDashboardIcon />,
				isActive: true,
			},
			{
				title: "Reports",
				path: "#/reports",
				icon: <FileTextIcon />,
			},
			{
				title: "Indicators",
				path: "#/indicators",
				icon: <FingerprintIcon />,
			},
			{
				title: "Observables",
				path: "#/observables",
				icon: <BinaryIcon />,
			},
		],
	},
	{
		label: "Threats",
		items: [
			{
				title: "Threat actors",
				path: "#/threat-actors",
				icon: <UsersIcon />,
			},
			{
				title: "Intrusion sets",
				path: "#/intrusion-sets",
				icon: <NetworkIcon />,
			},
			{
				title: "Campaigns",
				path: "#/campaigns",
				icon: <FlagIcon />,
			},
			{
				title: "Malware",
				path: "#/malware",
				icon: <BugIcon />,
			},
			{
				title: "Tools",
				path: "#/tools",
				icon: <WrenchIcon />,
			},
			{
				title: "Attack patterns",
				path: "#/attack-patterns",
				icon: <CrosshairIcon />,
			},
			{
				title: "Vulnerabilities",
				path: "#/vulnerabilities",
				icon: <ShieldAlertIcon />,
			},
		],
	},
	{
		label: "Ingestion",
		items: [
			{
				title: "TAXII collections",
				path: "#/taxii",
				icon: <RadioTowerIcon />,
			},
			{
				title: "Connectors",
				path: "#/connectors",
				icon: <PlugIcon />,
			},
		],
	},
];

export const navLinks: SidebarNavItem[] = [
	...navGroups.flatMap((group) =>
		group.items.flatMap((item) =>
			item.subItems?.length ? [item, ...item.subItems] : [item]
		)
	),
];
