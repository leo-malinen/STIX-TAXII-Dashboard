import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import type { Confidence, Severity, TlpMarking } from "@/lib/threat-intel";

/**
 * Severity, confidence and TLP are the three scales analysts read at a glance,
 * so colour carries meaning here rather than decoration. Everything else on the
 * dashboard stays on the neutral palette.
 */
const severityClass: Record<Severity, string> = {
	critical: "bg-rose-500/10 text-rose-600 dark:text-rose-400",
	high: "bg-orange-500/10 text-orange-600 dark:text-orange-400",
	medium: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
	low: "bg-sky-500/10 text-sky-600 dark:text-sky-400",
};

export function SeverityBadge({
	className,
	severity,
	children,
	...props
}: React.ComponentProps<typeof Badge> & { severity: Severity }) {
	return (
		<Badge
			className={cn(
				"border-none px-1.5 font-medium text-[10px] uppercase tracking-wide",
				severityClass[severity],
				className
			)}
			variant="secondary"
			{...props}
		>
			{children ?? severity}
		</Badge>
	);
}

const confidenceClass: Record<Confidence, string> = {
	high: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
	moderate: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
	low: "bg-muted text-muted-foreground",
};

export function ConfidenceBadge({
	className,
	confidence,
	...props
}: React.ComponentProps<typeof Badge> & { confidence: Confidence }) {
	return (
		<Badge
			className={cn(
				"border-none px-1.5 font-medium text-[10px] capitalize",
				confidenceClass[confidence],
				className
			)}
			variant="secondary"
			{...props}
		>
			{confidence}
		</Badge>
	);
}

const tlpClass: Record<TlpMarking, string> = {
	CLEAR: "bg-muted text-muted-foreground",
	GREEN: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
	AMBER: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
	"AMBER+STRICT": "bg-orange-500/10 text-orange-600 dark:text-orange-400",
	RED: "bg-rose-500/10 text-rose-600 dark:text-rose-400",
};

export function TlpBadge({
	className,
	marking,
	...props
}: React.ComponentProps<typeof Badge> & { marking: TlpMarking }) {
	return (
		<Badge
			className={cn(
				"border-none px-1.5 font-mono font-medium text-[10px]",
				tlpClass[marking],
				className
			)}
			variant="secondary"
			{...props}
		>
			TLP:{marking}
		</Badge>
	);
}
