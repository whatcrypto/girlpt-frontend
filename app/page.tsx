

import { CharacterTabs } from '@/components/aiGirls';

export default function Page() {
	return (
		<div className="min-h-screen bg-background">

			{/* Hero Section */}
			<section className="py-12 px-4">
				<div className="container mx-auto text-center">
					<h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
						Choose Your Perfect Companion
					</h2>
					<p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
						Meet your ideal AI girlfriend. Each character has her own unique personality,
						interests, and conversation style. Click on any character to start chatting!
					</p>
				</div>
			</section>

			<CharacterTabs />

			{/* Footer */}
			<footer className="border-t border-border py-8 px-4">
				<div className="container mx-auto text-center text-muted-foreground">
					<p>&copy; 2024 AI Girlfriend App. Your perfect companion awaits.</p>
				</div>
			</footer>
		</div>
	);
}
