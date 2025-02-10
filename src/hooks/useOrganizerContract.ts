
import { useAuth } from "@/contexts/auth";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

const ORGANIZER_TEMPLATE_ID = '594c1639-8930-4fbe-8e29-10009ff24357';
const INSTANCE_CLASS_ID = '2979bcfe-d9b8-4643-b8e6-7357e358005f';

export const useOrganizerContract = () => {
  const { user } = useAuth();

  const handleAgreement = async (agree: boolean) => {
    if (!user?.id || !organizerClauses.data) return;

    try {
      // First get the original contract details
      const { data: originalContract, error: contractError } = await supabase
        .from('contracts')
        .select('*')
        .eq('id', ORGANIZER_TEMPLATE_ID)
        .maybeSingle();

      if (contractError) {
        throw contractError;
      }

      if (!originalContract) {
        throw new Error('Template contract not found');
      }

      // Build content from clauses
      const content = organizerClauses.data
        .map(clause => `${clause.clause.name}\n\n${clause.clause.content}`)
        .join('\n\n');

      // Create new contract by cloning original and updating specific fields
      const { data: newContract, error: newContractError } = await supabase
        .from('contracts')
        .insert({
          ...originalContract,
          id: undefined,
          name: 'Game Organizer Agreement',
          description: 'Executed Game Organizer Agreement',
          content: content,
          auth_id: user.id,
          created_at: undefined,
          updated_at: undefined,
          parent_id: undefined,
          class_id: INSTANCE_CLASS_ID,
          template: false
        })
        .select()
        .single();

      if (newContractError) throw newContractError;

      // Create contract profile association
      const { error: profileError } = await supabase
        .from('contract_profiles')
        .insert({
          contract_id: newContract.id,
          profile_id: user.id,
          name: 'Game Organizer Agreement',
          accepted_date: agree ? new Date().toISOString() : null,
          declined_date: agree ? null : new Date().toISOString(),
        });

      if (profileError) throw profileError;

      toast.success(agree ? 'Contract accepted successfully' : 'Contract declined');
      return true;
    } catch (error) {
      console.error('Error handling agreement:', error);
      toast.error('Failed to process agreement');
      return false;
    }
  };

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
            class:class_id(name)
          )
        `)
        .eq('profile_id', user?.id)
        .eq('contracts.class_id.name', 'Instance');

      if (error) throw error;
      return data;
    },
    enabled: !!user?.id,
  });

  const organizerClauses = useQuery({
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

  return {
    contracts,
    organizerClauses: organizerClauses.data,
    handleAgreement,
  };
};
