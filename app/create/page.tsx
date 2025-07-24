import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { CompanionList } from '@/components/companion/CompanionList';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

export const metadata: Metadata = {
  title: 'My Companions | AI Companion',
  description: 'Manage your AI companions and create new ones.',
};

// TODO: Add authentication check
async function checkAuth() {
  // Placeholder for authentication check
  const isAuthenticated = true; // Replace with actual auth check

  if (!isAuthenticated) {
    redirect('/sign-up');
  }

  return { userId: 'user123' }; // Replace with actual user data
}

export default async function CompanionsPage() {
  const user = await checkAuth();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">My Companions</h1>
              <p className="text-muted-foreground mt-1">
                Create and manage your AI companions
              </p>
            </div>
            <Link href="/companions/create">
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Create Companion
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <CompanionList userId={user.userId} />
      </main>
    </div>
  );
}
