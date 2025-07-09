import { BaseEntity } from './common';
import { Retailer } from './retailer';
import { DBVisit, DBVisitRetailer, DBVisitSyncLog, VisitSyncStatus } from './db-schema';

// Domain types
export interface Visit extends DBVisit, BaseEntity {
  // Additional relationships
  retailers?: VisitRetailer[];
}

export interface VisitRetailer extends DBVisitRetailer {
  retailer?: Retailer;
}

export interface VisitSyncLog extends DBVisitSyncLog, BaseEntity {
  // Domain-specific fields can be added here if needed
}

// Location permission status
export type LocationPermissionStatus = 'granted' | 'denied' | 'prompt';

// Nearby retailer result from the database function
export interface NearbyRetailer {
  retailer_id: string;
  distance_feet: number;
}

// Request/Response types
export interface CreateVisitRequest {
  lat: number;
  lng: number;
}

export interface CreateVisitResponse {
  visit: Visit;
  nearbyRetailers: NearbyRetailer[];
}

// Re-export types for convenience
export type { DBVisit, DBVisitRetailer, DBVisitSyncLog, VisitSyncStatus } from './db-schema';