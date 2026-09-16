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
import { Badge } from "@/components/ui/badge";
import { CardTableFooter } from "@/components/card-table-footer";
import { SeverityBadge } from "@/components/severity-badge";
import type { Severity } from "@/lib/threat-intel";

const rows: {
	cve: string;
	product: string;
	cvss: number;
	severity: Severity;
	kev: boolean;
}[] = [
	{ cve: "CVE-2025-31324", product: "SAP NetWeaver", cvss: 10, severity: "critical", kev: true },
	{ cve: "CVE-2025-0282", product: "Ivanti Connect Secure", cvss: 9.8, severity: "critical", kev: true },
	{ cve: "CVE-2024-3400", product: "PAN-OS GlobalProtect", cvss: 9.8, severity: "critical", kev: true },
	{ cve: "CVE-2025-24813", product: "Apache Tomcat", cvss: 9.1, severity: "critical", kev: false },
	{ cve: "CVE-2024-47575", product: "FortiManager", cvss: 8.8, severity: "high", kev: true },
	{ cve: "CVE-2025-21298", product: "Windows OLE", cvss: 7.8, severity: "high", kev: false },
];

export function ActiveVulnerabilities() {
	return (
		<Card className="relative md:col-span-2 dark:bg-transparent">
			<CardHeader>
				<CardTitle className="text-balance">Active vulnerabilities</CardTitle>
				<CardDescription className="text-pretty">
					CVEs referenced by an active campaign or intrusion set.
				</CardDescription>
			</CardHeader>
			<CardContent className="mask-b-from-50% mask-b-to-100% p-0 pb-2">
				<Table className="border-t">
					<TableCaption className="sr-only">
						Vulnerabilities with CVSS score, severity and known-exploited
						status.
					</TableCaption>
					<TableHeader>
						<TableRow>
							<TableHead className="pl-6" scope="col">
								CVE
							</TableHead>
							<TableHead scope="col">Severity</TableHead>
							<TableHead className="text-end tabular-nums" scope="col">
								CVSS
							</TableHead>
							<TableHead className="pr-6 text-end" scope="col">
								KEV
							</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{rows.map((row) => (
							<TableRow className="hover:bg-transparent" key={row.cve}>
								<TableCell className="max-w-[220px] truncate pl-6 font-medium">
									<span className="flex min-w-0 flex-col gap-0.5">
										<span className="w-max rounded border border-border bg-muted/50 px-1 py-px font-mono text-xs">
											{row.cve}
										</span>
										<span className="truncate text-[10px] text-muted-foreground">
											{row.product}
										</span>
									</span>
								</TableCell>
								<TableCell>
									<SeverityBadge severity={row.severity} />
								</TableCell>
								<TableCell className="text-end text-muted-foreground text-xs tabular-nums">
									{row.cvss.toFixed(1)}
								</TableCell>
								<TableCell className="pr-6 text-end">
									{row.kev ? (
										<Badge
											className="border-none bg-rose-500/10 px-1.5 text-[10px] text-rose-600 dark:text-rose-400"
											variant="secondary"
										>
											Exploited
										</Badge>
									) : (
										<span className="text-muted-foreground text-xs">—</span>
									)}
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
