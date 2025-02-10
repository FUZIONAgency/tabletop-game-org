
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Navigation from "@/components/Navigation";
import Section from "@/components/Section";
import ContractCard from "@/components/contracts/ContractCard";
import OrganizerAgreementModal from "@/components/contracts/OrganizerAgreementModal";
import ContractViewModal from "@/components/contracts/ContractViewModal";
import { useOrganizerContract } from "@/hooks/useOrganizerContract";

const MyContracts = () => {
  const [showAgreementModal, setShowAgreementModal] = useState(false);
  const [selectedContract, setSelectedContract] = useState(null);
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>("");
  const { contracts, templateContracts, templateClauses, handleAgreement } = useOrganizerContract();

  const handleModalAgreement = async (agree: boolean) => {
    const success = await handleAgreement(agree, selectedTemplateId);
    if (success) {
      setShowAgreementModal(false);
    }
  };

  const selectedTemplateClauses = templateClauses?.filter(
    (c) => c.contract_id === selectedTemplateId
  ) || [];

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
          <div className="mb-8 flex gap-4 items-end">
            <div className="space-y-2">
              <label className="text-sm font-medium">Select Agreement</label>
              <Select
                value={selectedTemplateId}
                onValueChange={setSelectedTemplateId}
              >
                <SelectTrigger className="w-[300px]">
                  <SelectValue placeholder="Select an agreement" />
                </SelectTrigger>
                <SelectContent>
                  {templateContracts?.map((contract) => (
                    <SelectItem key={contract.id} value={contract.id}>
                      {contract.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button
              onClick={() => setShowAgreementModal(true)}
              className="bg-gold hover:bg-gold/90"
              disabled={!selectedTemplateId}
            >
              View Agreement
            </Button>
          </div>

          <div className="grid gap-6">
            {contracts?.map((contract) => (
              <div
                key={contract.id}
                onClick={() =>
                  setSelectedContract({
                    ...contract.contract,
                    accepted_date: contract.accepted_date,
                    declined_date: contract.declined_date,
                  })
                }
              >
                <ContractCard
                  name={contract.contract?.name || ""}
                  description={contract.contract?.description || ""}
                  acceptedDate={contract.accepted_date}
                  declinedDate={contract.declined_date}
                />
              </div>
            ))}
          </div>

          <OrganizerAgreementModal
            open={showAgreementModal}
            onOpenChange={setShowAgreementModal}
            clauses={selectedTemplateClauses || []}
            onAgree={() => handleModalAgreement(true)}
            onDecline={() => handleModalAgreement(false)}
            title={templateContracts?.find(c => c.id === selectedTemplateId)?.name || "Agreement"}
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
