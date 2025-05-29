import { Link } from 'wouter';
import { useAuth } from '../hooks/use-auth';

export default function Sidebar() {
  const { user } = useAuth();

  return (
    <aside className="w-64 bg-card border-r h-screen">
      <div className="p-4">
        <h2 className="text-lg font-bold mb-4">Navigation</h2>
        <nav>
          <div className="space-y-2">
            <Link href="/" className="block px-4 py-2 rounded-md hover:bg-accent">
              Home
            </Link>
            <Link href="/inventory" className="block px-4 py-2 rounded-md hover:bg-accent">
              Inventory
            </Link>
            <Link href="/recipes" className="block px-4 py-2 rounded-md hover:bg-accent">
              Recipes
            </Link>
            <Link href="/donate" className="block px-4 py-2 rounded-md hover:bg-accent">
              Donate
            </Link>
            <Link href="/impact" className="block px-4 py-2 rounded-md hover:bg-accent">
              Impact
            </Link>
            <Link href="/education" className="block px-4 py-2 rounded-md hover:bg-accent">
              Education
            </Link>
            <Link href="/settings" className="block px-4 py-2 rounded-md hover:bg-accent">
              Settings
            </Link>
          </div>
        </nav>
      </div>
    </aside>
  );
}