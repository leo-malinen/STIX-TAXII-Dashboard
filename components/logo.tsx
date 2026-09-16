import type React from "react";

/**
 * Shield outline enclosing a three-node graph — the knowledge graph the
 * platform is built around.
 */
export const LogoIcon = (props: React.ComponentProps<"svg">) => (
	<svg
		fill="none"
		stroke="currentColor"
		strokeLinecap="round"
		strokeLinejoin="round"
		strokeWidth={1.6}
		viewBox="0 0 24 24"
		xmlns="http://www.w3.org/2000/svg"
		{...props}
	>
		<path d="M12 2.75 4.75 5.6v5.55c0 4.4 2.95 8.35 7.25 9.85 4.3-1.5 7.25-5.45 7.25-9.85V5.6Z" />
		<circle cx="12" cy="8.4" fill="currentColor" r="1.5" stroke="none" />
		<circle cx="8.6" cy="14.2" fill="currentColor" r="1.5" stroke="none" />
		<circle cx="15.4" cy="14.2" fill="currentColor" r="1.5" stroke="none" />
		<path d="M12 8.4 8.6 14.2m3.4-5.8 3.4 5.8m-6.8 0h6.8" opacity={0.55} />
	</svg>
);

export const Logo = (props: React.ComponentProps<"svg">) => (
	<svg
		fill="none"
		viewBox="0 0 132 24"
		xmlns="http://www.w3.org/2000/svg"
		{...props}
	>
		<g
			stroke="currentColor"
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth={1.6}
		>
			<path d="M12 2.75 4.75 5.6v5.55c0 4.4 2.95 8.35 7.25 9.85 4.3-1.5 7.25-5.45 7.25-9.85V5.6Z" />
			<path d="M12 8.4 8.6 14.2m3.4-5.8 3.4 5.8m-6.8 0h6.8" opacity={0.55} />
		</g>
		<circle cx="12" cy="8.4" fill="currentColor" r="1.5" />
		<circle cx="8.6" cy="14.2" fill="currentColor" r="1.5" />
		<circle cx="15.4" cy="14.2" fill="currentColor" r="1.5" />
		<text
			fill="currentColor"
			fontFamily="var(--font-sans, system-ui)"
			fontSize="14"
			fontWeight="600"
			x="28"
			y="17"
		>
			Sentinel
		</text>
	</svg>
);
