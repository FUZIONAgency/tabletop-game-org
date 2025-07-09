import { BaseEntity } from './common';
import { DBRetailer } from './db-schema';

// Domain model that extends the database type but only exposes needed fields
export interface Retailer extends Pick<DBRetailer, 
  'id' | 'name' | 'description' | 'address' | 'city' | 'state' | 'store_photo' | 
  'zip' | 'phone' | 'email' | 'website_url' | 'lat' | 'lng' | 'hours_of_operation' |
  'status' | 'created_at' | 'updated_at' | 'is_featured' | 'carousel_image'
>, BaseEntity {
  // Additional domain properties can be added here if needed
}

export interface RetailerResponse {
  retailer: Retailer;
}