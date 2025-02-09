
import { useAuth } from "@/contexts/auth";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "@/components/Navigation";
import Section from "@/components/Section";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";
import { FileText } from "lucide-react";

const MyContracts = () => {
  const { user } = useAuth();
  const [showOrganizerModal, setShowOrganizerModal] = useState(false);

  const { data: contracts } = useQuery({
    queryKey: ['my-contracts', user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('contract_profiles')
        .select(`
          id,
          contract:contracts(
            id,
            name,
            description,
            contract_class(name)
          )
        `)
        .eq('profile_id', user?.id)
        .eq('contracts.contract_class.name', 'Instance');

      if (error) throw error;
      return data;
    },
    enabled: !!user?.id,
  });

  const { data: organizerClauses } = useQuery({
    queryKey: ['organizer-contract-clauses'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('contract_clauses')
        .select(`
          id,
          name,
          clause:clause_id(
            content,
            name
          )
        `)
        .eq('contract_id', '594c1639-8930-4fbe-8e29-10009ff24357')
        .order('sortorder');

      if (error) throw error;
      return data;
    },
  });

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-16">
        <Section
          id="contracts"
          title="My Contracts"
          subtitle="Contract Management"
          className="bg-background"
        >
          <div className="mb-8">
            <Button 
              onClick={() => setShowOrganizerModal(true)}
              className="bg-gold hover:bg-gold/90"
            >
              Become a Game Organizer
            </Button>
          </div>

          <div className="grid gap-6">
            {contracts?.map((contract) => (
              <Card key={contract.id}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    {contract.contract.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {contract.contract.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <Dialog open={showOrganizerModal} onOpenChange={setShowOrganizerModal}>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Game Organizer Agreement</DialogTitle>
              </DialogHeader>
              <ScrollArea className="h-[60vh] mt-4">
                <div className="space-y-6 pr-6">
                  {organizerClauses?.map((clause) => (
                    <div key={clause.id} className="space-y-2">
                      <h3 className="font-semibold">{clause.clause.name}</h3>
                      <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                        {clause.clause.content}
                      </p>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </DialogContent>
          </Dialog>
        </Section>
      </main>
    </div>
  );
};

export default MyContracts;
