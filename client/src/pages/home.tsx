import { Card, CardContent } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="container mx-auto">
      <h1 className="text-4xl font-bold mb-8">Welcome</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardContent className="pt-6">
            <h2 className="text-xl font-semibold mb-2">Recent Activity</h2>
            <p className="text-muted-foreground">
              View your recent project activities and updates here.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <h2 className="text-xl font-semibold mb-2">Projects</h2>
            <p className="text-muted-foreground">
              Browse through your AI and API projects.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <h2 className="text-xl font-semibold mb-2">Quick Actions</h2>
            <p className="text-muted-foreground">
              Access frequently used tools and settings.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
