"use client"
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Logo } from './logo';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs';
import { Button } from './button';
import { Users, MessageSquare } from 'lucide-react';

export const Header = () => {
	const pathname = usePathname();
	const isChatPage = pathname?.startsWith('/chat');

	if (isChatPage) {
		return null;
	}

	return (
		<header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
			<div className="container mx-auto px-4 py-4 flex items-end justify-between">
				<div className="flex items-center gap-6">
					<div className="flex items-center gap-2">
						<Logo />
						<h1 className="text-md font-bold text-foreground">GirlfriendPT</h1>
					</div>
					<nav className="flex items-center gap-2">
						<SignedIn>
							<Link href="/chat">
								<Button variant="ghost" size="sm" className="gap-2">
									<MessageSquare className="h-4 w-4" />
									Chat
								</Button>
							</Link>
							<Link href="/companions">
								<Button variant="ghost" size="sm" className="gap-2">
									<Users className="h-4 w-4" />
									Companions
								</Button>
							</Link>
						</SignedIn>
					</nav>
				</div>
				<div className="flex items-center gap-4">
					<SignedIn>
						<UserButton />
					</SignedIn>
					<SignedOut>
						<SignInButton />
					</SignedOut>
				</div>
			</div>
		</header>
	)
}
