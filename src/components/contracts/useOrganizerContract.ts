
import { useAuth } from "@/contexts/auth";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

const ORGANIZER_TEMPLATE_ID = '594c1639-8930-4fbe-8e29-10009ff24357';
const INSTANCE_CLASS_ID = 'b76f8429-433b-4f71-b549-7a49648c1161';

export const useOrganizerContract = () => {
  const { user } = useAuth();

  const handleAgreement = async (agree: boolean) => {
    if (!user?.id) return;

    try {
      // First get the original contract details to reference
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

      // Get clauses
      const { data: clauses } = await supabase
        .from('contract_clauses')
        .select(`
          clause:clause_id(
            content,
            name
          )
        `)
        .eq('contract_id', ORGANIZER_TEMPLATE_ID)
        .order('sortorder');

      if (!clauses) throw new Error('Failed to fetch clauses');

      // Build content from clauses
      const content = clauses
        .map(clause => `${clause.clause.name}\n\n${clause.clause.content}`)
        .join('\n\n');

      // Create new contract as an Instance
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
          contract_class: INSTANCE_CLASS_ID
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

  return { handleAgreement };
};
