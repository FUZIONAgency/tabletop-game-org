import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
const GetCertified = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-16">
        <div className="container mx-auto px-6 py-8">
          <Card>
            <CardHeader>
              <CardTitle>Get Certified</CardTitle>
              <CardDescription>
                Complete your certification process to become a qualified pro
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Certification content will go here */}
              <p>Certification process content coming soon...</p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default GetCertified;