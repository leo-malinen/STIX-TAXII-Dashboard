"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserIcon, SettingsIcon, KeyIcon, LogOutIcon } from "lucide-react";

const user = {
	name: "Dana Okonkwo",
	email: "d.okonkwo@sentinel.intel",
	role: "Lead analyst",
	avatar: "",
};

const initials = user.name
	.split(" ")
	.map((part) => part.charAt(0))
	.join("");

export function NavUser() {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger
				nativeButton={false}
				render={<Avatar className="size-8" />}
			>
				{user.avatar ? <AvatarImage src={user.avatar} /> : null}
				<AvatarFallback>{initials}</AvatarFallback>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end" className="w-60">
				<DropdownMenuItem className="flex items-center justify-start gap-2">
					<DropdownMenuLabel className="flex items-center gap-3">
						<Avatar className="size-10">
							{user.avatar ? <AvatarImage src={user.avatar} /> : null}
							<AvatarFallback>{initials}</AvatarFallback>
						</Avatar>
						<div className="min-w-0">
							<span className="font-medium text-foreground">{user.name}</span>
							<div className="truncate text-muted-foreground text-xs">
								{user.email}
							</div>
							<div className="truncate text-muted-foreground text-xs">
								{user.role}
							</div>
						</div>
					</DropdownMenuLabel>
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<DropdownMenuItem>
						<UserIcon />
						Account
					</DropdownMenuItem>
					<DropdownMenuItem>
						<SettingsIcon />
						Settings
					</DropdownMenuItem>
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<DropdownMenuItem>
						<KeyIcon />
						API tokens
					</DropdownMenuItem>
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<DropdownMenuItem
						className="w-full cursor-pointer"
						variant="destructive"
					>
						<LogOutIcon />
						Log out
					</DropdownMenuItem>
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
