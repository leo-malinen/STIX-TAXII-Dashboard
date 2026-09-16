"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { Delta, DeltaIcon, DeltaValue } from "@/components/delta";
import { StatusIndicator } from "@/components/indicator";
import {
	ShareBarList,
	ShareBarListContent,
	ShareBarListFill,
	ShareBarListItem,
	ShareBarListLabel,
	ShareBarListValue,
} from "@/components/share-bar-list";

/** SCO types seen on the wire, as a share of the last 5 minutes of ingest. */
const observableTypes = [
	{ label: "IPv4-Addr", share: 46 },
	{ label: "Domain-Name", share: 28 },
	{ label: "File:SHA-256", share: 17 },
	{ label: "Url", share: 9 },
] as const;

export function LiveIngest() {
	return (
		<Card className="gap-0 pb-0 md:col-span-2 lg:col-span-1 dark:bg-transparent">
			<CardHeader className="flex flex-row items-start justify-between gap-3 border-b">
				<div className="flex min-w-0 flex-col gap-0">
					<CardTitle className="font-mono text-2xl tabular-nums">312</CardTitle>
					<CardDescription>
						<Tooltip>
							<TooltipTrigger
								render={
									<Button
										className={cn(
											"cursor-help px-1 py-px font-normal text-muted-foreground",
											"hover:underline-0"
										)}
										type="button"
										variant="link"
									/>
								}
							>
								<StatusIndicator />
								<span>observables/min</span>
							</TooltipTrigger>
							<TooltipContent side="bottom">
								Rolling rate across 14 active TAXII collections.
							</TooltipContent>
						</Tooltip>
					</CardDescription>
				</div>
				<Delta value={12.3} variant="badge">
					<DeltaIcon variant="trend" />
					<DeltaValue suffix="%" />
				</Delta>
			</CardHeader>
			<CardContent className={cn("relative flex h-full items-center px-0 py-2")}>
				<ShareBarList aria-label="Live ingest by observable type">
					{observableTypes.map((row) => (
						<ShareBarListItem key={row.label} value={row.share}>
							<ShareBarListContent>
								<ShareBarListLabel className="font-mono text-xs">
									{row.label}
								</ShareBarListLabel>
								<ShareBarListValue>{row.share}%</ShareBarListValue>
							</ShareBarListContent>
							<ShareBarListFill data-online-bar />
						</ShareBarListItem>
					))}
				</ShareBarList>
			</CardContent>
		</Card>
	);
}
