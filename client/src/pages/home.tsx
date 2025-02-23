import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-12 text-white">
        Welcome
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link href="/api/gemini">
          <Card className="bg-black/40 border border-gray-800 hover:bg-black/60 transition-colors cursor-pointer">
            <CardContent className="pt-6">
              <h2 className="text-xl font-semibold mb-2 text-white">Recent Activity</h2>
              <p className="text-gray-400">
                View your recent project activities and updates here.
              </p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/projects">
          <Card className="bg-black/40 border border-gray-800 hover:bg-black/60 transition-colors cursor-pointer">
            <CardContent className="pt-6">
              <h2 className="text-xl font-semibold mb-2 text-white">Projects</h2>
              <p className="text-gray-400">
                Browse through your AI and API projects.
              </p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/settings">
          <Card className="bg-black/40 border border-gray-800 hover:bg-black/60 transition-colors cursor-pointer">
            <CardContent className="pt-6">
              <h2 className="text-xl font-semibold mb-2 text-white">Quick Actions</h2>
              <p className="text-gray-400">
                Access frequently used tools and settings.
              </p>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
}