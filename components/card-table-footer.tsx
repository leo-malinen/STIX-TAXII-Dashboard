import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "lucide-react";

/**
 * The fade-to-background "View all" affordance shared by every table card, so
 * the rows read as a truncated list rather than a hard cut.
 */
export function CardTableFooter({
	className,
	href = "#",
	label = "View all",
	...props
}: React.ComponentProps<"div"> & { href?: string; label?: string }) {
	return (
		<div
			className={cn(
				"mask-t-from-30% absolute inset-x-0 bottom-0 flex h-1/5 items-center justify-center bg-background",
				className
			)}
			{...props}
		>
			<Button
				className="relative"
				nativeButton={false}
				render={<a href={href} />}
				variant="ghost"
			>
				{label}
				<ArrowRightIcon aria-hidden="true" />
			</Button>
		</div>
	);
}
