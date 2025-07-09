-- Create visits table to track user visits
CREATE TABLE IF NOT EXISTS public.visits (
  id UUID NOT NULL DEFAULT gen_random_uuid(),
  auth_id UUID NOT NULL,
  lat NUMERIC(10, 7) NOT NULL,
  lng NUMERIC(10, 7) NOT NULL,
  recorded_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  
  CONSTRAINT visits_pkey PRIMARY KEY (id),
  CONSTRAINT visits_auth_id_fkey FOREIGN KEY (auth_id) REFERENCES auth.users(id) ON DELETE CASCADE
);

-- Create visit_retailers junction table to link visits to nearby retailers
CREATE TABLE IF NOT EXISTS public.visit_retailers (
  id UUID NOT NULL DEFAULT gen_random_uuid(),
  visit_id UUID NOT NULL,
  retailer_id UUID NOT NULL,
  distance_feet NUMERIC(10, 2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  
  CONSTRAINT visit_retailers_pkey PRIMARY KEY (id),
  CONSTRAINT visit_retailers_visit_id_fkey FOREIGN KEY (visit_id) REFERENCES visits(id) ON DELETE CASCADE,
  CONSTRAINT visit_retailers_retailer_id_fkey FOREIGN KEY (retailer_id) REFERENCES retailers(id) ON DELETE CASCADE,
  CONSTRAINT visit_retailers_unique UNIQUE (visit_id, retailer_id)
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_visits_auth_id ON visits(auth_id);
CREATE INDEX IF NOT EXISTS idx_visits_recorded_at ON visits(recorded_at DESC);
CREATE INDEX IF NOT EXISTS idx_visit_retailers_visit_id ON visit_retailers(visit_id);
CREATE INDEX IF NOT EXISTS idx_visit_retailers_retailer_id ON visit_retailers(retailer_id);

-- Enable Row Level Security
ALTER TABLE visits ENABLE ROW LEVEL SECURITY;
ALTER TABLE visit_retailers ENABLE ROW LEVEL SECURITY;

-- RLS Policies for visits
CREATE POLICY "Users can view their own visits" ON visits
  FOR SELECT USING (auth.uid() = auth_id);

CREATE POLICY "Users can insert their own visits" ON visits
  FOR INSERT WITH CHECK (auth.uid() = auth_id);

-- RLS Policies for visit_retailers (read-only for users)
CREATE POLICY "Users can view visit_retailers for their visits" ON visit_retailers
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM visits
      WHERE visits.id = visit_retailers.visit_id
      AND visits.auth_id = auth.uid()
    )
  );

-- Function to find nearby retailers within 1000 feet
CREATE OR REPLACE FUNCTION find_nearby_retailers(
  p_lat NUMERIC,
  p_lng NUMERIC,
  p_max_distance_feet INTEGER DEFAULT 1000
)
RETURNS TABLE(
  retailer_id UUID,
  distance_feet NUMERIC
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    r.id as retailer_id,
    ROUND(
      ST_Distance(
        ST_MakePoint(p_lng, p_lat)::geography,
        ST_MakePoint(r.lng, r.lat)::geography
      ) * 3.28084 -- Convert meters to feet
    )::NUMERIC as distance_feet
  FROM retailers r
  WHERE r.status = 'active' -- Only active retailers
  AND ST_DWithin(
    ST_MakePoint(p_lng, p_lat)::geography,
    ST_MakePoint(r.lng, r.lat)::geography,
    p_max_distance_feet / 3.28084 -- Convert feet to meters
  )
  ORDER BY distance_feet ASC;
END;
$$ LANGUAGE plpgsql;