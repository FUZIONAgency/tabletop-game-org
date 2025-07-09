// Relationship types that extend the base database types
// These types include foreign key relationships and computed properties

import type {
  DBProfile as Profile,
  DBPlayer as Player,
  DBCampaign as Campaign,
  DBCampaignPlayer as CampaignPlayer,
  DBCampaignType as CampaignType,
  DBGameSystem as GameSystem,
  DBGameSystemType as GameSystemType,
  DBRetailer as Retailer,
  DBRetailerType as RetailerType,
  DBMetro as Metro,
  DBCountry as Country,
  DBExam as Exam,
  DBExamQuestion as ExamQuestion,
  DBPlayerExam as PlayerExam,
  DBPlayerExamAnswer as PlayerExamAnswer,
  DBSession as Session,
  DBPlayerSession as PlayerSession,
  DBInvite as Invite,
  DBContract as Contract,
  DBContractType as ContractType,
  DBContractClass as ContractClass,
  DBContractProfile as ContractProfile,
  DBTournament as Tournament,
  DBTournamentEntry as TournamentEntry,
  DBTournamentPrize as TournamentPrize,
  DBPlayerRelationship as PlayerRelationship,
  DBPlayerRetailer as PlayerRetailer,
  DBPlayerGameAccount as PlayerGameAccount,
  DBOffer as Offer,
  DBOfferType as OfferType,
  DBOfferStatus as OfferStatus,
  DBConvention as Convention,
  DBBrand as Brand,
  DBRetailerBrand as RetailerBrand,
  DBDemoTeamContract as DemoTeamContract,
  DBDemoTeamTerritory as DemoTeamTerritory,
  DBSignature as Signature
} from './db-schema';

// ============================================
// PROFILE RELATIONSHIPS
// ============================================

export interface ProfileWithRelations extends Profile {
  players?: Player[];
  invites_sent?: Invite[];
  contracts?: Contract[];
  demo_team_contracts?: DemoTeamContract[];
}

// ============================================
// PLAYER RELATIONSHIPS
// ============================================

export interface PlayerWithRelations extends Player {
  profile?: Profile;
  campaigns?: CampaignWithRelations[];
  game_accounts?: PlayerGameAccountWithRelations[];
  exams?: PlayerExamWithRelations[];
  ratings_given?: PlayerRating[];
  ratings_received?: PlayerRating[];
  upline_relationships?: PlayerRelationshipWithRelations[];
  downline_relationships?: PlayerRelationshipWithRelations[];
  retailers?: PlayerRetailerWithRelations[];
  sessions?: PlayerSessionWithRelations[];
  tournament_entries?: TournamentEntryWithRelations[];
}

export interface PlayerRating {
  id: string;
  player_id: string;
  rating_player_id: string;
  rating: number;
  comment: string | null;
  created_at: string;
  updated_at: string;
  player?: Player;
  rating_player?: Player;
}

export interface PlayerRelationshipWithRelations extends PlayerRelationship {
  upline?: Player;
  downline?: Player;
}

export interface PlayerRetailerWithRelations extends PlayerRetailer {
  player?: Player;
  retailer?: Retailer;
}

export interface PlayerGameAccountWithRelations extends PlayerGameAccount {
  player?: Player;
  game_system?: GameSystem;
}

export interface PlayerExamWithRelations extends PlayerExam {
  player?: Player;
  exam?: ExamWithRelations;
  approval_player?: Player;
  answers?: PlayerExamAnswer[];
}

export interface PlayerSessionWithRelations extends PlayerSession {
  player?: Player;
  session?: SessionWithRelations;
}

// ============================================
// CAMPAIGN RELATIONSHIPS
// ============================================

export interface CampaignWithRelations extends Campaign {
  game_system?: GameSystemWithRelations;
  retailer?: RetailerWithRelations;
  campaign_type?: CampaignType;
  players?: CampaignPlayerWithRelations[];
  sessions?: SessionWithRelations[];
  invitations?: CampaignInvitation[];
  creator?: Profile;
}

export interface CampaignInvitation {
  id: string;
  campaign_id: string;
  email: string | null;
  token: string | null;
  status: string | null;
  created_at: string;
  expires_at: string;
  campaign?: CampaignWithRelations;
}

export interface CampaignPlayerWithRelations extends CampaignPlayer {
  campaign?: CampaignWithRelations;
  player?: Player;
}

export interface SessionWithRelations extends Session {
  campaign?: CampaignWithRelations;
  player_sessions?: PlayerSessionWithRelations[];
}

// ============================================
// GAME SYSTEM RELATIONSHIPS
// ============================================

export interface GameSystemWithRelations extends GameSystem {
  game_system_type?: GameSystemType;
  campaigns?: CampaignWithRelations[];
  exams?: ExamWithRelations[];
  player_accounts?: PlayerGameAccount[];
  tournaments?: Tournament[];
  links?: GameSystemLink[];
}

export interface GameSystemLink {
  id: string;
  created_at: string;
  url: string | null;
  hash_tag: string | null;
  at_tag: string | null;
  game_system_id: string;
  link_type_id: string;
  name: string | null;
  game_system?: GameSystem;
  link_type?: LinkType;
}

export interface LinkType {
  id: string;
  name: string | null;
  created_at: string;
}

// ============================================
// EXAM RELATIONSHIPS
// ============================================

export interface ExamWithRelations extends Exam {
  game_system?: GameSystem;
  questions?: ExamQuestion[];
  player_exams?: PlayerExamWithRelations[];
}

// ============================================
// RETAILER RELATIONSHIPS
// ============================================

export interface RetailerWithRelations extends Retailer {
  retailer_type?: RetailerType;
  metro?: Metro;
  country?: Country;
  campaigns?: CampaignWithRelations[];
  players?: PlayerRetailerWithRelations[];
  brands?: RetailerBrandWithRelations[];
  persons?: RetailerPersonWithRelations[];
}

export interface RetailerBrandWithRelations extends RetailerBrand {
  retailer?: Retailer;
  brand?: Brand;
}

export interface RetailerPersonWithRelations {
  id: string;
  retailer_id: string | null;
  person_id: string | null;
  role_id: string | null;
  created_at: string;
  retailer?: Retailer;
  person?: Person;
  role?: RetailerPersonRole;
}

export interface Person {
  id: string;
  first_name: string | null;
  last_name: string | null;
  cell: string | null;
  email: string | null;
  created_at: string;
  profile_id: string | null;
  profile?: Profile;
}

export interface RetailerPersonRole {
  id: string;
  name: string | null;
  created_at: string;
}

// ============================================
// CONTRACT RELATIONSHIPS
// ============================================

export interface ContractWithRelations extends Contract {
  contract_type?: ContractType;
  contract_class?: ContractClass;
  parent?: Contract;
  children?: Contract[];
  profiles?: ContractProfileWithRelations[];
  clauses?: ContractClauseWithRelations[];
  metros?: ContractMetroWithRelations[];
  creator?: Profile;
}

export interface ContractProfileWithRelations extends ContractProfile {
  contract?: Contract;
  profile?: Profile;
  signature?: Signature;
}

export interface ContractClauseWithRelations {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
  contract_id: string | null;
  clause_id: string | null;
  sortorder: number;
  contract?: Contract;
  clause?: Clause;
}

export interface ContractMetroWithRelations {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
  contract_id: string | null;
  metro_id: string | null;
  contract?: Contract;
  metro?: Metro;
}

export interface Clause {
  id: string;
  parent_id: string | null;
  name: string | null;
  description: string | null;
  version: number;
  content: string | null;
  explanation: string | null;
  created_at: string;
  parent?: Clause;
  children?: Clause[];
}

// ============================================
// TOURNAMENT RELATIONSHIPS
// ============================================

export interface TournamentWithRelations extends Tournament {
  game_system?: GameSystem;
  entries?: TournamentEntryWithRelations[];
  prizes?: TournamentPrize[];
  creator?: Profile;
}

export interface TournamentEntryWithRelations extends TournamentEntry {
  tournament?: Tournament;
  player?: Player;
}

// ============================================
// INVITE RELATIONSHIPS
// ============================================

export interface InviteWithRelations extends Invite {
  user?: Profile;
  accepted_by_player?: Player;
}

// ============================================
// OFFER RELATIONSHIPS
// ============================================

export interface OfferWithRelations extends Offer {
  user?: Profile;
  offer_type?: OfferType;
  offer_status?: OfferStatus;
}

// ============================================
// CONVENTION RELATIONSHIPS
// ============================================

export interface ConventionWithRelations extends Convention {
  // Add tournament relationships if needed
  tournaments?: Tournament[];
}

// ============================================
// DEMO TEAM RELATIONSHIPS
// ============================================

export interface DemoTeamContractWithRelations extends DemoTeamContract {
  user?: Profile;
  territories?: DemoTeamTerritoryWithRelations[];
}

export interface DemoTeamTerritoryWithRelations extends DemoTeamTerritory {
  contract?: DemoTeamContract;
  metro?: Metro;
  user?: Profile;
}

// ============================================
// HELPER TYPES
// ============================================

export type WithRequired<T, K extends keyof T> = T & { [P in K]-?: T[P] };
export type WithOptional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

// Type guards
export function isPlayerWithRelations(player: Player | PlayerWithRelations): player is PlayerWithRelations {
  return 'profile' in player || 'campaigns' in player;
}

export function isCampaignWithRelations(campaign: Campaign | CampaignWithRelations): campaign is CampaignWithRelations {
  return 'game_system' in campaign || 'players' in campaign;
}

// Pagination types
export interface PaginatedResponse<T> {
  data: T[];
  count: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// Query filter types
export interface BaseFilter {
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  page?: number;
  pageSize?: number;
}

export interface CampaignFilter extends BaseFilter {
  status?: Campaign['status'];
  game_system_id?: string;
  retailer_id?: string;
  type_id?: string;
  min_price?: number;
  max_price?: number;
}

export interface PlayerFilter extends BaseFilter {
  status?: Player['status'];
  city?: string;
  state?: string;
}

export interface RetailerFilter extends BaseFilter {
  city?: string;
  state?: string;
  metro_id?: string;
  type_id?: string;
  is_featured?: boolean;
}