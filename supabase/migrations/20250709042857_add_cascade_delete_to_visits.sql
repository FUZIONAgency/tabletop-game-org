-- Drop existing foreign key constraints
ALTER TABLE visit_retailers 
DROP CONSTRAINT IF EXISTS visit_retailers_visit_id_fkey;

ALTER TABLE visit_sync_logs 
DROP CONSTRAINT IF EXISTS visit_sync_logs_visit_id_fkey;

-- Re-add foreign key constraints with CASCADE delete
ALTER TABLE visit_retailers
ADD CONSTRAINT visit_retailers_visit_id_fkey 
FOREIGN KEY (visit_id) 
REFERENCES visits(id) 
ON DELETE CASCADE;

ALTER TABLE visit_sync_logs
ADD CONSTRAINT visit_sync_logs_visit_id_fkey 
FOREIGN KEY (visit_id) 
REFERENCES visits(id) 
ON DELETE CASCADE;

-- Also ensure RLS policies exist for deleting related records
-- Policy for visit_retailers deletion
CREATE POLICY IF NOT EXISTS "Users can delete their own visit_retailers"
ON visit_retailers
FOR DELETE
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM visits 
    WHERE visits.id = visit_retailers.visit_id 
    AND visits.auth_id = auth.uid()
  )
);

-- Policy for visit_sync_logs deletion
CREATE POLICY IF NOT EXISTS "Users can delete their own visit_sync_logs"
ON visit_sync_logs
FOR DELETE
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM visits 
    WHERE visits.id = visit_sync_logs.visit_id 
    AND visits.auth_id = auth.uid()
  )
);