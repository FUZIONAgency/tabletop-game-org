import Navigation from "@/components/Navigation";
import { useAuth } from "@/contexts/auth";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";
import Section from "@/components/Section";

const MyConventions = () => {
  const { user } = useAuth();

  const { data: conventions, isLoading } = useQuery({
    queryKey: ['my-conventions'],
    queryFn: async () => {
      const { data } = await supabase
        .from('conventions')
        .select('*')
        .order('start_date', { ascending: true });
      return data || [];
    },
  });

  const now = new Date();
  const upcomingConventions = conventions?.filter(
    convention => new Date(convention.end_date) >= now
  ) || [];
  const pastConventions = conventions?.filter(
    convention => new Date(convention.end_date) < now
  ) || [];

  const ConventionGrid = ({ conventions }) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {conventions.map((convention) => (
        <div key={convention.id} className="border rounded-lg overflow-hidden shadow-sm">
          {convention.image_url && (
            <img 
              src={convention.image_url} 
              alt={convention.name}
              className="w-full h-48 object-cover"
            />
          )}
          <div className="p-4">
            <h3 className="font-semibold text-lg mb-2">{convention.name}</h3>
            <p className="text-sm text-gray-600 mb-2">{convention.description}</p>
            <div className="text-sm text-gray-500">
              <p>{convention.venue}</p>
              <p>{convention.location}</p>
              <p>
                {format(new Date(convention.start_date), 'MMM d, yyyy')} - {format(new Date(convention.end_date), 'MMM d, yyyy')}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-grow bg-white">
        <Section
          id="upcoming-conventions"
          title="Upcoming Conventions"
          subtitle="Join us at these events"
          className="pt-24"
        >
          {isLoading ? (
            <div className="space-y-4">
              <Skeleton className="h-32 w-full" />
              <Skeleton className="h-32 w-full" />
              <Skeleton className="h-32 w-full" />
            </div>
          ) : upcomingConventions.length === 0 ? (
            <p className="text-gray-500">No upcoming conventions found.</p>
          ) : (
            <ConventionGrid conventions={upcomingConventions} />
          )}
        </Section>

        <Section
          id="past-conventions"
          title="Past Conventions"
          subtitle="Previous events"
        >
          {isLoading ? (
            <div className="space-y-4">
              <Skeleton className="h-32 w-full" />
              <Skeleton className="h-32 w-full" />
              <Skeleton className="h-32 w-full" />
            </div>
          ) : pastConventions.length === 0 ? (
            <p className="text-gray-500">No past conventions found.</p>
          ) : (
            <ConventionGrid conventions={pastConventions} />
          )}
        </Section>
      </main>
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4">
          <p className="text-center text-sm">
            © {new Date().getFullYear()} TabletopGame.org. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default MyConventions;