import { BaseEntity } from './common';
import { DBGameSystem } from './db-schema';

// Domain model that extends the database type
export interface GameSystem extends DBGameSystem, BaseEntity {
  // DBGameSystem already has all the fields we need
  // Additional domain properties can be added here if needed
}

// Simplified version for use in other types
export interface GameSystemBasic {
  id?: string;
  name: string;
  description?: string | null;
  logo_image_url?: string | null;
}