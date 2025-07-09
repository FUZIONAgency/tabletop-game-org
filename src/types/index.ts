// Main export file for all types

// Export database schema types and enums
export * from './db-schema';

// Re-export all relationship types
export * from './relationships';

// Re-export domain types (these override database types with same names)
export * from './campaign';
export * from './campaign-actions';
export * from './common';
export * from './exam';
export * from './game-system';
export * from './invite';
export * from './player-game-account';
export * from './retailer';
export * from './session';
export * from './tournament';
export * from './visit';

// Export type mapping utilities
export * from './type-mappers';

// ============================================
// COMMON UTILITY TYPES
// ============================================

// Date string types for better type safety
export type ISODateString = string;
export type DateTimeString = string;

// UUID type alias for clarity
export type UUID = string;

// Common response types
export interface ApiResponse<T> {
  data: T;
  error: null;
}

export interface ApiError {
  data: null;
  error: {
    message: string;
    code?: string;
    details?: any;
  };
}

export type ApiResult<T> = ApiResponse<T> | ApiError;

// Supabase specific types
export interface SupabaseResponse<T> {
  data: T | null;
  error: {
    message: string;
    details?: string;
    hint?: string;
    code?: string;
  } | null;
}

// Form data types
export type FormStatus = 'idle' | 'loading' | 'success' | 'error';

export interface FormState<T = any> {
  status: FormStatus;
  data?: T;
  error?: string;
}

// Select option types for dropdowns
export interface SelectOption<T = string> {
  label: string;
  value: T;
  disabled?: boolean;
}

// Table column configuration
export interface TableColumn<T> {
  key: keyof T | string;
  label: string;
  sortable?: boolean;
  width?: string;
  align?: 'left' | 'center' | 'right';
  render?: (value: any, row: T) => React.ReactNode;
}

// Filter operators
export type FilterOperator = 'eq' | 'neq' | 'gt' | 'gte' | 'lt' | 'lte' | 'like' | 'ilike' | 'in' | 'contains' | 'containedBy';

export interface FilterCondition {
  field: string;
  operator: FilterOperator;
  value: any;
}

// Sort configuration
export interface SortConfig {
  field: string;
  direction: 'asc' | 'desc';
}

// Generic CRUD operation types
export interface CrudOperations<T, CreateDTO = Partial<T>, UpdateDTO = Partial<T>> {
  create: (data: CreateDTO) => Promise<T>;
  read: (id: string) => Promise<T>;
  update: (id: string, data: UpdateDTO) => Promise<T>;
  delete: (id: string) => Promise<void>;
  list: (filters?: any) => Promise<T[]>;
}

// Audit fields that many tables share
export interface AuditFields {
  created_at: string;
  updated_at?: string;
  created_by?: string;
  updated_by?: string;
}

// Soft delete fields
export interface SoftDeleteFields {
  deleted_at?: string;
  deleted_by?: string;
  is_deleted?: boolean;
}

// Common status transitions
export interface StatusTransition<T extends string> {
  from: T;
  to: T;
  allowed: boolean;
  requiresApproval?: boolean;
  validationFn?: () => Promise<boolean>;
}

// Notification preferences
export interface NotificationPreferences {
  email: boolean;
  sms: boolean;
  push: boolean;
  marketing: boolean;
  transactional: boolean;
}

// Address type used in multiple places
export interface Address {
  line1: string;
  line2?: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
  country_code?: string;
}

// Contact information
export interface ContactInfo {
  name?: string;
  email?: string;
  phone?: string;
  cell?: string;
  preferred_contact_method?: 'email' | 'phone' | 'sms';
}

// Social media links
export interface SocialMediaLinks {
  website?: string;
  facebook?: string;
  instagram?: string;
  twitter?: string;
  x?: string;
  linkedin?: string;
  youtube?: string;
  twitch?: string;
  discord?: string;
  slack?: string;
  whatsapp?: string;
  tiktok?: string;
  snapchat?: string;
  bluesky?: string;
  deviantart?: string;
}

// Price/Money types
export interface Money {
  amount: number;
  currency: string;
  formatted?: string;
}

// File upload types
export interface FileUpload {
  id: string;
  filename: string;
  url: string;
  size: number;
  mime_type: string;
  uploaded_at: string;
  uploaded_by: string;
}

// Permission types
export interface Permission {
  resource: string;
  action: 'create' | 'read' | 'update' | 'delete' | 'list' | 'manage';
  conditions?: Record<string, any>;
}

export interface Role {
  id: string;
  name: string;
  permissions: Permission[];
}

// Activity log types
export interface ActivityLog {
  id: string;
  user_id: string;
  action: string;
  resource_type: string;
  resource_id: string;
  metadata?: Record<string, any>;
  ip_address?: string;
  user_agent?: string;
  created_at: string;
}

// Search types
export interface SearchParams {
  query: string;
  filters?: FilterCondition[];
  sort?: SortConfig;
  page?: number;
  pageSize?: number;
  includeDeleted?: boolean;
}

export interface SearchResult<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  facets?: Record<string, Array<{ value: string; count: number }>>;
}

// Validation types
export interface ValidationError {
  field: string;
  message: string;
  code?: string;
}

export interface ValidationResult {
  valid: boolean;
  errors: ValidationError[];
}

// Feature flags
export interface FeatureFlag {
  key: string;
  enabled: boolean;
  description?: string;
  rolloutPercentage?: number;
  enabledForUsers?: string[];
  metadata?: Record<string, any>;
}

// Analytics event types
export interface AnalyticsEvent {
  name: string;
  properties?: Record<string, any>;
  timestamp?: string;
  user_id?: string;
  session_id?: string;
}

// Export type utilities
export type Nullable<T> = T | null;
export type Optional<T> = T | undefined;
export type NullableOptional<T> = T | null | undefined;

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends (infer U)[]
    ? DeepPartial<U>[]
    : T[P] extends object
    ? DeepPartial<T[P]>
    : T[P];
};

export type RequireAtLeastOne<T, Keys extends keyof T = keyof T> =
  Pick<T, Exclude<keyof T, Keys>> &
  {
    [K in Keys]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<Keys, K>>>;
  }[Keys];

export type RequireOnlyOne<T, Keys extends keyof T = keyof T> =
  Pick<T, Exclude<keyof T, Keys>> &
  {
    [K in Keys]-?: Required<Pick<T, K>> & Partial<Record<Exclude<Keys, K>, undefined>>;
  }[Keys];