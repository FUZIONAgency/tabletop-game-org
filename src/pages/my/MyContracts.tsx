
import { useAuth } from "@/contexts/auth";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "@/components/Navigation";
import Section from "@/components/Section";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ContractCard } from "@/components/contracts/ContractCard";
import { OrganizerContractDialog } from "@/components/contracts/OrganizerContractDialog";
import { useOrganizerContract } from "@/components/contracts/useOrganizerContract";

const ORGANIZER_TEMPLATE_ID = '594c1639-8930-4fbe-8e29-10009ff24357';

const MyContracts = () => {
  const { user } = useAuth();
  const [showOrganizerModal, setShowOrganizerModal] = useState(false);
  const { handleAgreement } = useOrganizerContract();

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
        .eq('contract.contract_class', '2979bcfe-d9b8-4643-b8e6-7357e358005f');

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
        .eq('contract_id', ORGANIZER_TEMPLATE_ID)
        .order('sortorder');

      if (error) throw error;
      return data;
    },
  });

  const onAgree = async () => {
    const success = await handleAgreement(true);
    if (success) setShowOrganizerModal(false);
  };

  const onDecline = async () => {
    const success = await handleAgreement(false);
    if (success) setShowOrganizerModal(false);
  };

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
              <ContractCard key={contract.id} contract={contract} />
            ))}
          </div>

          <OrganizerContractDialog
            open={showOrganizerModal}
            onOpenChange={setShowOrganizerModal}
            clauses={organizerClauses}
            onAgree={onAgree}
            onDecline={onDecline}
          />
        </Section>
      </main>
    </div>
  );
};

export default MyContracts;
