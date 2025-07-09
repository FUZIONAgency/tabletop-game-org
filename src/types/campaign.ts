import { BaseEntity } from './common';
import { GameSystemBasic } from './game-system';
import { DBCampaign, CampaignStatus } from './db-schema';

// Domain model that extends the database type with additional computed properties
export interface Campaign extends Omit<DBCampaign, 'status'>, BaseEntity {
  // Override status to use the enum
  status: CampaignStatus;
  
  // Additional domain properties
  game_system: GameSystemBasic;
  is_member?: boolean;
  is_owner?: boolean;
  owner_alias?: string;
  owner?: any[];
}