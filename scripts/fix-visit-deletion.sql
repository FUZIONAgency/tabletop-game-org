-- Fix visit deletion by adding CASCADE delete constraints
-- Run this in Supabase SQL Editor

-- First, drop existing foreign key constraints
ALTER TABLE visit_retailers 
DROP CONSTRAINT IF EXISTS visit_retailers_visit_id_fkey;

-- Re-add foreign key constraint with CASCADE delete
ALTER TABLE visit_retailers
ADD CONSTRAINT visit_retailers_visit_id_fkey 
FOREIGN KEY (visit_id) 
REFERENCES visits(id) 
ON DELETE CASCADE;

-- Check and create RLS policy for visits deletion if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'visits' 
        AND policyname = 'Users can delete their own visits'
    ) THEN
        CREATE POLICY "Users can delete their own visits"
        ON visits
        FOR DELETE
        TO authenticated
        USING (auth_id = auth.uid());
    END IF;
END $$;

-- Also ensure RLS is enabled on the visits table
ALTER TABLE visits ENABLE ROW LEVEL SECURITY;

-- Test query to verify your visits
-- Replace 'YOUR_USER_ID' with your actual user ID
SELECT id, auth_id, recorded_at, customer_demo_count 
FROM visits 
WHERE auth_id = auth.uid()
ORDER BY recorded_at DESC 
LIMIT 5;