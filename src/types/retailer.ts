import { BaseEntity } from './common';

export interface Retailer extends BaseEntity {
  name: string;
  description: string | null;
  address: string;
  city: string;
  state: string;
  store_photo: string | null;
  zip: string;
  lat: number;
  lng: number;
}