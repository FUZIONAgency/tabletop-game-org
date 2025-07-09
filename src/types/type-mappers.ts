// Type mapping utilities for converting between database and domain types
// These functions help transform raw database types to domain models with relationships

import type {
  DBCampaign,
  DBPlayer,
  DBSession,
  DBPlayerSession,
  DBRetailer,
  DBGameSystem,
  DBExam,
  DBPlayerExam,
  DBInvite,
  DBPlayerGameAccount,
  DBTournament,
  DBTournamentEntry
} from './db-schema';

import type {
  Campaign,
  Player,
  Session,
  PlayerSession,
  Retailer,
  GameSystem,
  Exam,
  PlayerExam,
  Invite,
  PlayerGameAccount,
  Tournament,
  TournamentEntry
} from './index';

// ============================================
// DATABASE TO DOMAIN MAPPERS
// ============================================

/**
 * Maps a database campaign to a domain campaign model
 * Note: game_system and other relationships need to be loaded separately
 */
export function mapDBCampaignToDomain(
  dbCampaign: DBCampaign,
  gameSystem?: GameSystem,
  additionalData?: Partial<Campaign>
): Campaign {
  return {
    ...dbCampaign,
    game_system: gameSystem || {
      id: dbCampaign.game_system_id,
      name: '',
      description: null,
      logo_image_url: null
    },
    ...additionalData
  };
}

/**
 * Maps a database session to a domain session model
 */
export function mapDBSessionToDomain(
  dbSession: DBSession,
  campaign?: Campaign,
  playerSessions?: PlayerSession[]
): Session {
  return {
    ...dbSession,
    campaign,
    player_session: playerSessions
  };
}

/**
 * Maps a database player session to a domain player session model
 */
export function mapDBPlayerSessionToDomain(
  dbPlayerSession: DBPlayerSession,
  session: Session
): PlayerSession {
  return {
    ...dbPlayerSession,
    session
  };
}

/**
 * Maps a database retailer to a domain retailer model
 */
export function mapDBRetailerToDomain(dbRetailer: DBRetailer): Retailer {
  // The domain Retailer type already picks the fields it needs
  return dbRetailer;
}

/**
 * Maps a database game system to a domain game system model
 */
export function mapDBGameSystemToDomain(dbGameSystem: DBGameSystem): GameSystem {
  return dbGameSystem;
}

/**
 * Maps a database exam to a domain exam model
 */
export function mapDBExamToDomain(
  dbExam: DBExam,
  gameSystem: GameSystem
): Exam {
  return {
    ...dbExam,
    game_system: gameSystem
  };
}

/**
 * Maps a database player exam to a domain player exam model
 */
export function mapDBPlayerExamToDomain(
  dbPlayerExam: DBPlayerExam,
  exam: Exam
): PlayerExam {
  return {
    ...dbPlayerExam,
    exam
  };
}

/**
 * Maps a database invite to a domain invite model
 */
export function mapDBInviteToDomain(dbInvite: DBInvite): Invite {
  return dbInvite;
}

/**
 * Maps a database player game account to a domain model
 */
export function mapDBPlayerGameAccountToDomain(
  dbAccount: DBPlayerGameAccount,
  gameSystem: GameSystem
): PlayerGameAccount {
  return {
    ...dbAccount,
    game_system: gameSystem
  };
}

/**
 * Maps a database tournament to a domain tournament model
 */
export function mapDBTournamentToDomain(dbTournament: DBTournament): Tournament {
  return dbTournament;
}

/**
 * Maps a database tournament entry to a domain model
 */
export function mapDBTournamentEntryToDomain(
  dbEntry: DBTournamentEntry,
  tournament: Tournament
): TournamentEntry {
  return {
    ...dbEntry,
    tournament
  };
}

// ============================================
// DOMAIN TO DATABASE MAPPERS
// ============================================

/**
 * Extracts database fields from a domain campaign model
 */
export function extractDBCampaignFromDomain(campaign: Campaign): DBCampaign {
  const { game_system, is_member, is_owner, owner_alias, owner, ...dbFields } = campaign;
  return dbFields as DBCampaign;
}

/**
 * Extracts database fields from a domain session model
 */
export function extractDBSessionFromDomain(session: Session): DBSession {
  const { campaign, player_session, ...dbFields } = session;
  return dbFields as DBSession;
}

/**
 * Extracts database fields from a domain player session model
 */
export function extractDBPlayerSessionFromDomain(playerSession: PlayerSession): DBPlayerSession {
  const { session, ...dbFields } = playerSession;
  return dbFields as DBPlayerSession;
}

/**
 * Extracts database fields from a domain exam model
 */
export function extractDBExamFromDomain(exam: Exam): DBExam {
  const { game_system, ...dbFields } = exam;
  return dbFields as DBExam;
}

/**
 * Extracts database fields from a domain player exam model
 */
export function extractDBPlayerExamFromDomain(playerExam: PlayerExam): DBPlayerExam {
  const { exam, ...dbFields } = playerExam;
  return dbFields as DBPlayerExam;
}

/**
 * Extracts database fields from a domain player game account model
 */
export function extractDBPlayerGameAccountFromDomain(account: PlayerGameAccount): DBPlayerGameAccount {
  const { game_system, ...dbFields } = account;
  return dbFields as DBPlayerGameAccount;
}

/**
 * Extracts database fields from a domain tournament entry model
 */
export function extractDBTournamentEntryFromDomain(entry: TournamentEntry): DBTournamentEntry {
  const { tournament, ...dbFields } = entry;
  return dbFields as DBTournamentEntry;
}

// ============================================
// BATCH MAPPERS
// ============================================

/**
 * Maps an array of database records to domain models
 */
export function mapDBArrayToDomain<DB, Domain>(
  dbRecords: DB[],
  mapper: (db: DB) => Domain
): Domain[] {
  return dbRecords.map(mapper);
}

/**
 * Maps an array of domain models to database records
 */
export function extractDBArrayFromDomain<Domain, DB>(
  domainRecords: Domain[],
  extractor: (domain: Domain) => DB
): DB[] {
  return domainRecords.map(extractor);
}