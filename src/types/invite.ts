import { DBInvite, InviteStatus } from './db-schema';

// Domain model that extends the database type
export interface Invite extends Omit<DBInvite, 'status' | 'token'> {
  status: InviteStatus;
  token: string | null; // Keep as nullable for security
}