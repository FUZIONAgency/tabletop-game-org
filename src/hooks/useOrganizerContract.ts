
import { useAuth } from "@/contexts/auth";
import { supabase } from "@/integrations/supabase/client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const INSTANCE_CLASS_ID = '2979bcfe-d9b8-4643-b8e6-7357e358005f';

export const useOrganizerContract = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const handleAgreement = async (agree: boolean, templateId: string) => {
    if (!user?.id || !templateClauses.data) return;

    try {
      // First get the original contract details
      const { data: originalContract, error: contractError } = await supabase
        .from('contracts')
        .select('*')
        .eq('id', templateId)
        .maybeSingle();

      if (contractError) {
        throw contractError;
      }

      if (!originalContract) {
        throw new Error('Template contract not found');
      }

      // Build content from clauses
      const clauses = templateClauses.data.filter(c => c.contract_id === templateId);
      const content = clauses
        .map(clause => `${clause.clause.name}\n\n${clause.clause.content}`)
        .join('\n\n');

      // Create new contract by cloning original and updating specific fields
      const { data: newContract, error: newContractError } = await supabase
        .from('contracts')
        .insert({
          ...originalContract,
          id: undefined,
          description: 'Executed Agreement',
          content: content,
          auth_id: user.id,
          created_at: undefined,
          updated_at: undefined,
          parent_id: undefined,
          class_id: INSTANCE_CLASS_ID
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
          name: originalContract.name,
          accepted_date: agree ? new Date().toISOString() : null,
          declined_date: agree ? null : new Date().toISOString(),
        });

      if (profileError) throw profileError;

      // Invalidate the my-contracts query to trigger a refresh
      await queryClient.invalidateQueries({ queryKey: ['my-contracts', user.id] });

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
          accepted_date,
          declined_date,
          contract:contracts(
            id,
            name,
            description,
            content,
            class:contract_classes!class_id(name)
          )
        `)
        .eq('profile_id', user?.id)
        .eq('contracts.class_id', INSTANCE_CLASS_ID);

      if (error) throw error;
      return data;
    },
    enabled: !!user?.id,
  });

  const { data: templateContracts } = useQuery({
    queryKey: ['template-contracts'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('contracts')
        .select(`
          *,
          class:contract_classes!inner(
            name
          )
        `)
        .eq('contract_classes.name', 'Template');

      if (error) throw error;
      return data;
    },
  });

  const templateClauses = useQuery({
    queryKey: ['contract-clauses'],
    queryFn: async () => {
      if (!templateContracts?.length) return [];
      
      const { data, error } = await supabase
        .from('contract_clauses')
        .select(`
          id,
          contract_id,
          name,
          clause:clause_id(
            content,
            name
          )
        `)
        .in('contract_id', templateContracts.map(c => c.id))
        .order('sortorder');

      if (error) throw error;
      return data;
    },
    enabled: !!templateContracts?.length,
  });

  return {
    contracts,
    templateContracts,
    templateClauses: templateClauses.data,
    handleAgreement,
  };
};
