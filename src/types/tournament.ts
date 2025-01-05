import { BaseEntity } from './common';

export interface Tournament extends BaseEntity {
  title: string;
  description: string | null;
  start_date: string;
  end_date: string;
  location: string;
  venue: string;
  image_url: string | null;
  prize_pool: number | null;
}