import { Campaign } from './campaign';
import { DBSession, DBPlayerSession, SessionStatus, PaymentStatus, AttendanceStatus } from './db-schema';

// Domain model for PlayerSession that extends the database type
export interface PlayerSession extends Omit<DBPlayerSession, 'payment_status' | 'attendance_status'> {
  payment_status: PaymentStatus;
  attendance_status: AttendanceStatus;
  session: Session;
}

// Domain model for Session that extends the database type
export interface Session extends Omit<DBSession, 'status'> {
  status: SessionStatus | null;
  campaign?: Campaign & {
    retailer?: {
      id: string;
      name: string;
    }
  };
  player_session?: PlayerSession[];
}