-- Create visit_sync_logs table to track Google Sheets sync attempts
CREATE TABLE IF NOT EXISTS public.visit_sync_logs (
  id UUID NOT NULL DEFAULT gen_random_uuid(),
  visit_id UUID NOT NULL,
  sync_status TEXT NOT NULL DEFAULT 'pending', -- pending, success, failed
  sync_data JSONB NOT NULL,
  error_message TEXT NULL,
  synced_at TIMESTAMP WITH TIME ZONE NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  
  CONSTRAINT visit_sync_logs_pkey PRIMARY KEY (id),
  CONSTRAINT visit_sync_logs_visit_id_fkey FOREIGN KEY (visit_id) REFERENCES visits(id) ON DELETE CASCADE
);

-- Create index for better query performance
CREATE INDEX IF NOT EXISTS idx_visit_sync_logs_visit_id ON visit_sync_logs(visit_id);
CREATE INDEX IF NOT EXISTS idx_visit_sync_logs_sync_status ON visit_sync_logs(sync_status);

-- Enable Row Level Security
ALTER TABLE visit_sync_logs ENABLE ROW LEVEL SECURITY;

-- RLS Policy - users can view sync logs for their own visits
CREATE POLICY "Users can view their visit sync logs" ON visit_sync_logs
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM visits
      WHERE visits.id = visit_sync_logs.visit_id
      AND visits.auth_id = auth.uid()
    )
  );