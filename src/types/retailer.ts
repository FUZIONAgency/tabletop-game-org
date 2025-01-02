export interface Retailer {
  id: string;
  name: string;
  description?: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  phone?: string;
  email?: string;
  website_url?: string;
  lat: number;
  lng: number;
  hours_of_operation?: any;
  status?: string;
  store_photo?: string;
  is_featured?: boolean;
  carousel_image?: string;
}