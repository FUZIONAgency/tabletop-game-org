import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const GetCertified = () => {
  return (
    <div className="container mx-auto px-6 py-8">
      <Card>
        <CardHeader>
          <CardTitle>Get Certified</CardTitle>
          <CardDescription>
            Complete your certification process to become a qualified player
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Certification content will go here */}
          <p>Certification process content coming soon...</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default GetCertified;