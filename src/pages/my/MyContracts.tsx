
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import Section from "@/components/Section";
import ContractCard from "@/components/contracts/ContractCard";
import OrganizerAgreementModal from "@/components/contracts/OrganizerAgreementModal";
import { useOrganizerContract } from "@/hooks/useOrganizerContract";

const MyContracts = () => {
  const [showOrganizerModal, setShowOrganizerModal] = useState(false);
  const { contracts, organizerClauses, handleAgreement } = useOrganizerContract();

  const handleModalAgreement = async (agree: boolean) => {
    const success = await handleAgreement(agree);
    if (success) {
      setShowOrganizerModal(false);
    }
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
              <ContractCard
                key={contract.id}
                name={contract.contract?.name || ''}
                description={contract.contract?.description || ''}
              />
            ))}
          </div>

          <OrganizerAgreementModal
            open={showOrganizerModal}
            onOpenChange={setShowOrganizerModal}
            clauses={organizerClauses || []}
            onAgree={() => handleModalAgreement(true)}
            onDecline={() => handleModalAgreement(false)}
          />
        </Section>
      </main>
    </div>
  );
};

export default MyContracts;
