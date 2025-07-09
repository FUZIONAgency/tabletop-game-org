import { BaseEntity } from './common';
import { GameSystem } from './game-system';
import { DBExam, DBPlayerExam } from './db-schema';

// Domain model that extends the database type
export interface Exam extends DBExam, BaseEntity {
  // Additional domain property
  game_system: GameSystem;
}

// Domain model that extends the database type
export interface PlayerExam extends DBPlayerExam, BaseEntity {
  // Additional domain property
  exam: Exam;
}