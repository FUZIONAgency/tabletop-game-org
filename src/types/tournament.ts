import { DBTournament, DBTournamentEntry } from './db-schema';

// Domain model that extends the database type but only exposes needed fields
export interface Tournament extends Pick<DBTournament, 
  'id' | 'title' | 'description' | 'start_date' | 'end_date' | 
  'location' | 'venue' | 'image_url' | 'prize_pool' | 'game_system_id' |
  'max_participants' | 'registration_deadline' | 'is_featured' | 
  'tournament_type' | 'status' | 'registration_url' | 'carousel_image'
> {
  // Additional domain properties can be added here if needed
}

// Domain model that extends the database type
export interface TournamentEntry extends DBTournamentEntry {
  // Additional domain property
  tournament: Tournament;
}