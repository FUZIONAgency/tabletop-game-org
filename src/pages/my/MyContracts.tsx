
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import Section from "@/components/Section";
import ContractCard from "@/components/contracts/ContractCard";
import OrganizerAgreementModal from "@/components/contracts/OrganizerAgreementModal";
import ContractViewModal from "@/components/contracts/ContractViewModal";
import { useOrganizerContract } from "@/hooks/useOrganizerContract";

const MyContracts = () => {
  const [showOrganizerModal, setShowOrganizerModal] = useState(false);
  const [selectedContract, setSelectedContract] = useState(null);
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
              <div key={contract.id} onClick={() => setSelectedContract({
                ...contract.contract,
                accepted_date: contract.accepted_date,
                declined_date: contract.declined_date,
              })}>
                <ContractCard
                  name={contract.contract?.name || ''}
                  description={contract.contract?.description || ''}
                  acceptedDate={contract.accepted_date}
                  declinedDate={contract.declined_date}
                />
              </div>
            ))}
          </div>

          <OrganizerAgreementModal
            open={showOrganizerModal}
            onOpenChange={setShowOrganizerModal}
            clauses={organizerClauses || []}
            onAgree={() => handleModalAgreement(true)}
            onDecline={() => handleModalAgreement(false)}
          />

          <ContractViewModal
            open={!!selectedContract}
            onOpenChange={(open) => !open && setSelectedContract(null)}
            contract={selectedContract}
          />
        </Section>
      </main>
    </div>
  );
};

export default MyContracts;
