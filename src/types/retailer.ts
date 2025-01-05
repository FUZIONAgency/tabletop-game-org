import { BaseEntity } from './common';

export interface Retailer extends BaseEntity {
  name: string;
  description: string | null;
  address: string;
  city: string;
  state: string;
  store_photo: string | null;
}

export interface RetailerResponse {
  retailer: Retailer;
}