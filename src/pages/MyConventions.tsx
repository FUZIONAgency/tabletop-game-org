import Navigation from "@/components/Navigation";
import { useAuth } from "@/contexts/auth";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";

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

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-grow bg-white">
        <div className="container mx-auto px-4 pt-24 pb-12">
          <h1 className="text-3xl font-bold mb-8">My Conventions</h1>
          
          {isLoading ? (
            <div className="space-y-4">
              <Skeleton className="h-32 w-full" />
              <Skeleton className="h-32 w-full" />
              <Skeleton className="h-32 w-full" />
            </div>
          ) : conventions?.length === 0 ? (
            <p className="text-gray-500">No conventions found.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {conventions?.map((convention) => (
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
          )}
        </div>
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