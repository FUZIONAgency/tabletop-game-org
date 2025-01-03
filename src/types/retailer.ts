export interface Retailer {
  id: string;
  name: string;
  description: string | null;
  address: string;
  city: string;
  state: string;
  zip: string;
  phone: string | null;
  email: string | null;
  website_url: string | null;
  lat: number;
  lng: number;
  hours_of_operation?: any;
  status?: string | null;
  store_photo: string | null;
  is_featured?: boolean;
  carousel_image?: string | null;
  metro_id?: string;
  type_id?: string;
  country_id?: string;
}