-- Add customer demo count and comments fields to visits table
ALTER TABLE visits
ADD COLUMN customer_demo_count INTEGER NOT NULL DEFAULT 0,
ADD COLUMN comments TEXT,
ADD COLUMN is_positive_experience BOOLEAN;

-- Add indexes for better query performance
CREATE INDEX idx_visits_customer_demo_count ON visits(customer_demo_count);
CREATE INDEX idx_visits_is_positive_experience ON visits(is_positive_experience);