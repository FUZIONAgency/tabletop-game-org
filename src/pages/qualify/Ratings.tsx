import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
const Ratings = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-16">
        <div className="container mx-auto px-6 py-8">
          <Card>
            <CardHeader>
              <CardTitle>Player Ratings</CardTitle>
              <CardDescription>
                View and manage your player ratings across different game systems
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Ratings content will go here */}
              <p>Player ratings content coming soon...</p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Ratings;