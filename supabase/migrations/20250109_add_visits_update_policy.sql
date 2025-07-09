-- Add UPDATE policy for visits table to allow users to update their own visits
-- Using only USING clause to avoid infinite loops in RLS
CREATE POLICY "Users can update their own visits" ON visits
  FOR UPDATE 
  USING (auth.uid() = auth_id);

-- Add DELETE policy for visits table to allow users to delete their own visits
CREATE POLICY "Users can delete their own visits" ON visits
  FOR DELETE 
  USING (auth.uid() = auth_id);