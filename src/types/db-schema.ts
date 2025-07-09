// Database types generated from popculture-schema.txt
// This file contains all the TypeScript types for the Supabase database schema

// ============================================
// ENUMS AND STATUS TYPES
// ============================================

export type UserRole = 'user' | 'admin';
export type CampaignStatus = 'active' | 'inactive' | 'completed';
export type PlayerStatus = 'active' | 'inactive' | 'suspended';
export type InviteStatus = 'unsent' | 'sent' | 'read' | 'clicked' | 'accepted' | 'declined' | 'canceled';
export type BlogStatus = 'draft' | 'published' | 'archived';
export type BookContentType = 'book' | 'novel' | 'zine' | 'poster' | 'flyer' | 'miniature' | 'terrain';
export type BookSize = string; // Specific values not provided in schema
export type ConventionStatus = 'active' | 'inactive';
export type AdPlatformType = string; // Specific values not provided in schema
export type EmailEventType = string; // Specific values not provided in schema
export type PaymentStatus = 'auto' | 'manual' | 'paid' | 'unpaid';
export type AttendanceStatus = 'unconfirmed' | 'confirmed' | 'absent';
export type RelationshipStatus = 'pending' | 'active' | 'inactive';
export type RelationshipType = 'requested sponsor of' | string;
export type SessionStatus = 'scheduled' | 'in_progress' | 'completed' | 'cancelled';
export type ServiceOrderStatus = 'pending' | 'in_progress' | 'completed' | 'cancelled';
export type PreferredPlatform = 'kickstarter' | 'indiegogo' | 'backerkit' | 'gamefound' | 'internal';
export type ContractProfileStatus = 'pending' | 'viewed' | 'accepted' | 'declined';
export type DemoTeamContractStatus = 'pending' | 'signed' | 'active' | 'terminated';
export type TerritoryStatus = 'active' | 'inactive';
export type ShippingStatus = 'pending' | 'processing' | 'shipped' | 'delivered';
export type FulfillmentStatus = 'unfulfilled' | 'partially_fulfilled' | 'fulfilled';
export type TransactionStatus = 'pending' | 'processing' | 'completed' | 'failed' | 'cancelled';
export type VendorStatus = 'draft' | 'active' | 'inactive';
export type ItemStatus = 'draft' | 'active' | 'discontinued';
export type PurchaseOrderStatus = 'draft' | 'submitted' | 'approved' | 'rejected' | 'completed';
export type RFQStatus = 'draft' | 'sent' | 'responded' | 'accepted' | 'rejected';
export type NotificationType = 'email' | 'sms' | 'push';
export type NotificationStatus = 'pending' | 'sent' | 'failed';
export type VisitSyncStatus = 'pending' | 'success' | 'failed';

// ============================================
// BASE TYPES FOR TABLES
// ============================================

export interface DBProfile {
  id: string;
  email: string | null;
  username: string | null;
  avatar_url: string | null;
  created_at: string;
  is_over_13: boolean;
  role: UserRole;
  retailers_max: number;
}

export interface DBAdCampaign {
  id: string;
  // Referenced by ad_campaign_metrics and ad_campaign_transactions
}

export interface DBAdCampaignMetric {
  id: string;
  campaign_id: string;
  platform: AdPlatformType;
  impressions: number;
  clicks: number;
  conversions: number;
  spend: number;
  revenue: number;
  cpc: number | null; // Generated column
  conversion_rate: number | null; // Generated column
  roi: number | null; // Generated column
  date: string;
  created_at: string;
  updated_at: string;
}

export interface DBAdCampaignTransaction {
  id: string;
  campaign_id: string;
  amount: number;
  platform: string;
  description: string | null;
  transaction_date: string;
  created_at: string;
  updated_at: string;
}

export interface DBBlogTag {
  id: string;
  name: string;
  slug: string;
  created_at: string;
  updated_at: string;
}

export interface DBBlogTagsRelation {
  id: string;
  blog_id: string | null;
  tag_id: string | null;
  created_at: string;
}

export interface DBBlog {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string | null;
  blog_image_url: string | null;
  author_id: string | null;
  status: BlogStatus;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface DBBookClass {
  id: string;
  name: string;
  description: string | null;
  created_at: string;
}

export interface DBBookFormat {
  id: string;
  name: string;
  description: string | null;
  size: BookSize;
  created_at: string;
}

export interface DBBookRoleType {
  id: string;
  name: string;
  description: string | null;
  created_at: string;
}

export interface DBBookRole {
  id: string;
  book_id: string | null;
  player_id: string | null;
  type_id: string | null;
  created_at: string;
}

export interface DBBookSectionType {
  id: string;
  name: string;
  description: string | null;
  created_at: string;
  content_json: any | null;
}

export interface DBBookSection {
  id: string;
  book_id: string;
  type_id: string;
  title: string;
  content: string | null;
  order_index: number;
  created_at: string;
  updated_at: string;
  content_json: any | null;
}

export interface DBBookType {
  id: string;
  name: string;
  description: string | null;
  created_at: string;
}

export interface DBBook {
  id: string;
  title: string;
  author: string;
  isbn: string | null;
  created_at: string;
  updated_at: string;
  content_type: BookContentType;
  type_id: string | null;
  class_id: string | null;
  template_id: string | null;
  format_id: string | null;
}

export interface DBBrand {
  id: string;
  name: string;
  description: string | null;
  parent: string | null;
  status: string;
  created_at: string;
  updated_at: string;
  logo_url: string | null;
  map_icon_url: string | null;
}

export interface DBDomain {
  id: string;
  name: string;
  url: string | null;
  devurl: string | null;
  qaurl: string | null;
  uaturl: string | null;
  description: string;
  status: string;
  created_at: string;
  updated_at: string;
  keywords: string;
  favicon: string | null;
  meta_image: string;
  theme_color: string;
}

export interface DBCLocation {
  id: string;
  name: string;
  address_line1: string;
  address_line2: string | null;
  city: string;
  state_province: string | null;
  postal_code: string | null;
  country: string;
  phone_number: string | null;
  tax_id: string | null;
  active: boolean;
  created_at: string;
  updated_at: string;
}

export interface DBCMetadata {
  id: string;
  product_id: string;
  key: string;
  value: string | null;
  type: string | null;
  display_name: string | null;
  sortable: boolean;
  filterable: boolean;
  searchable: boolean;
  visible: boolean;
  created_at: string;
  updated_at: string;
}

export interface DBCPrice {
  id: string;
  product_id: string;
  stripe_price_id: string;
  amount: number;
  currency: string;
  is_default: boolean;
  is_active: boolean;
  type: string;
  recurring_interval: string | null;
  recurring_interval_count: number | null;
  metadata: any;
  created_at: string;
  updated_at: string;
}

export interface DBCProduct {
  id: string;
  stripe_product_id: string;
  name: string;
  description: string | null;
  active: boolean;
  image_url: string | null;
  default_price_id: string | null;
  metadata: any | null;
  created_at: string;
  updated_at: string;
}

export interface DBCShippingRate {
  id: string;
  stripe_id: string;
  name: string;
  description: string | null;
  amount: number;
  currency: string;
  active: boolean;
  metadata: any | null;
  created_at: string;
  updated_at: string;
}

export interface DBCTransactionItem {
  id: string;
  transaction_id: string;
  stripe_line_item_id: string;
  product_id: string | null;
  stripe_product_id: string | null;
  stripe_price_id: string | null;
  quantity: number;
  amount_unit: number;
  amount_total: number;
  amount_tax: number;
  currency: string;
  description: string | null;
  metadata: any | null;
  created_at: string;
}

export interface DBCTransaction {
  id: string;
  stripe_transaction_id: string;
  customer_id: string | null;
  customer_email: string | null;
  amount_total: number;
  amount_subtotal: number;
  amount_tax: number;
  amount_shipping: number;
  currency: string;
  payment_status: string;
  shipping_status: ShippingStatus;
  fulfillment_status: FulfillmentStatus;
  payment_intent: string | null;
  payment_method: string | null;
  shipping_method: string | null;
  shipping_method_id: string | null;
  status: TransactionStatus;
  metadata: any | null;
  shipping_address: any | null;
  billing_address: any | null;
  created_at: string;
  shipping_metadata: any | null;
  updated_at: string;
  items_count: number;
}

export interface DBCampaignInvitation {
  id: string;
  campaign_id: string;
  email: string | null;
  token: string | null;
  status: string | null;
  created_at: string;
  expires_at: string;
}

export interface DBCampaignPlayer {
  id: string;
  campaign_id: string;
  player_id: string;
  role_type: string;
  status: string;
  joined_at: string;
}

export interface DBCampaignType {
  id: string;
  name: string | null;
  created_at: string;
}

export interface DBCampaign {
  id: string;
  game_system_id: string;
  title: string;
  description: string | null;
  type: string | null;
  min_players: number;
  max_players: number;
  status: CampaignStatus;
  price: number;
  created_at: string;
  retailer_id: string | null;
  type_id: string;
  auth_id: string | null;
}

export interface DBClause {
  id: string;
  parent_id: string | null;
  name: string | null;
  description: string | null;
  version: number;
  content: string | null;
  explanation: string | null;
  created_at: string;
}

export interface DBConditionType {
  id: string;
  name: string | null;
  created_at: string;
}

export interface DBContactInquiry {
  id: string;
  name: string;
  email: string;
  website: string | null;
  budget: string;
  templateType: string;
  created_at: string;
}

export interface DBContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface DBContractClass {
  id: string;
  name: string;
  description: string | null;
  created_at: string;
  updated_at: string;
  parent_id: string | null;
  version: number;
}

export interface DBContractClause {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
  contract_id: string | null;
  clause_id: string | null;
  sortorder: number;
}

export interface DBContractMetro {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
  contract_id: string | null;
  metro_id: string | null;
}

export interface DBContractProfile {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
  contract_id: string | null;
  profile_id: string | null;
  requested_date: string | null;
  viewed_date: string | null;
  accepted_date: string | null;
  declined_date: string | null;
  sortorder: number;
  signature_id: string | null;
}

export interface DBContractType {
  id: string;
  name: string;
  description: string | null;
  created_at: string;
  updated_at: string;
  version: number;
}

export interface DBContract {
  id: string;
  name: string;
  description: string | null;
  type_id: string;
  created_at: string;
  updated_at: string;
  class_id: string | null;
  parent_id: string | null;
  version: number;
  content: string | null;
  auth_id: string;
}

export interface DBConvention {
  id: string;
  name: string;
  description: string | null;
  start_date: string;
  end_date: string;
  location: string;
  venue: string;
  expected_attendees: number | null;
  image_url: string;
  website_url: string | null;
  registration_url: string | null;
  status: ConventionStatus;
  created_at: string;
  updated_at: string;
  is_featured: boolean;
  carousel_image: string | null;
}

export interface DBCountry {
  id: string;
  name: string;
  iso2: string;
  iso3: string;
  numeric_code: number | null;
  phone_code: string | null;
  capital: string | null;
  currency: string | null;
  currency_name: string | null;
  currency_symbol: string | null;
  tld: string | null;
  region: string | null;
  subregion: string | null;
  latitude: number | null;
  longitude: number | null;
  geometry: any | null; // Geography type
  created_at: string;
  updated_at: string;
}

export interface DBDemoTeamContract {
  id: string;
  auth_id: string;
  status: DemoTeamContractStatus;
  contract_signed_at: string | null;
  contract_version: string;
  created_at: string;
  updated_at: string;
  contract_accepted_at: string | null;
}

export interface DBDemoTeamTerritory {
  id: string;
  contract_id: string;
  metro_id: string;
  status: TerritoryStatus;
  created_at: string;
  updated_at: string;
  auth_id: string;
}

export interface DBDomainBrand {
  id: string;
  domain_id: string;
  brand_id: string;
  created_at: string;
  updated_at: string;
}

export interface DBDomainProfile {
  id: string;
  domain_id: string;
  profile_id: string;
  created_at: string;
  updated_at: string;
}

export interface DBEmailTracking {
  id: string;
  order_id: string;
  email: string;
  event_type: EmailEventType;
  event_timestamp: string;
  metadata: any;
  created_at: string;
}

export interface DBExamQuestion {
  id: string;
  exam_id: string;
  name: string;
  weight: number;
  created_at: string;
  updated_at: string;
  url: string | null;
  order: number;
}

export interface DBExam {
  id: string;
  game_system_id: string;
  name: string;
  weight: number;
  created_at: string;
  updated_at: string;
}

export interface DBFInvoice {
  id: string;
  po_id: string | null;
  vendor_id: string | null;
  amount: number | null;
  due_date: string | null;
  status: string | null;
  created_by: string | null;
  updated_by: string | null;
  approved_by: string | null;
  created_at: string;
  updated_at: string;
}

export interface DBFPackingListItem {
  id: string;
  packing_list_id: string | null;
  item_id: string | null;
  quantity: number;
  description: string | null;
  created_by: string | null;
  updated_by: string | null;
  approved_by: string | null;
  status: ItemStatus;
  created_at: string;
  updated_at: string;
}

export interface DBFPackingList {
  id: string;
  rfq_id: string | null;
  shipment_date: string | null;
  status: string | null;
  created_by: string | null;
  updated_by: string | null;
  approved_by: string | null;
  created_at: string;
  updated_at: string;
}

export interface DBFPayment {
  id: string;
  invoice_id: string | null;
  amount_paid: number | null;
  payment_date: string | null;
  status: string | null;
  created_by: string | null;
  updated_by: string | null;
  approved_by: string | null;
  created_at: string;
  updated_at: string;
}

export interface DBFPOItem {
  id: string;
  po_id: string | null;
  item_id: string | null;
  quantity: number;
  unit_price: number | null;
  total_price: number | null;
  description: string | null;
  created_by: string | null;
  updated_by: string | null;
  approved_by: string | null;
  status: ItemStatus;
  created_at: string;
  updated_at: string;
  requisition_item_id: string | null;
  msrp_discount: number;
  received_quantity: number;
  notes: string | null;
  sku: string | null;
}

export interface DBFPOLog {
  id: string;
  po_id: string | null;
  profile_id: string | null;
  message: string;
  created_at: string;
  metadata: any | null;
}

export interface DBFPO {
  id: string;
  vendor_id: string | null;
  requisition_id: string | null;
  order_date: string;
  status: PurchaseOrderStatus;
  created_by: string | null;
  updated_by: string | null;
  approved_by: string | null;
  created_at: string;
  updated_at: string;
  description: string | null;
  po_date: string;
  po_number: string | null;
  payment_terms: string;
  shipping_address: string | null;
  shipping_city: string | null;
  shipping_state: string | null;
  shipping_zip: string | null;
  shipping_country: string;
  contact_name: string | null;
  contact_email: string | null;
  contact_phone: string | null;
  approved_at: string | null;
  total_amount: number;
}

export interface DBFReceipt {
  id: string;
  payment_id: string | null;
  receipt_number: string | null;
  status: string | null;
  created_by: string | null;
  updated_by: string | null;
  approved_by: string | null;
  created_at: string;
  updated_at: string;
}

export interface DBFReceiving {
  id: string;
  packing_list_id: string | null;
  received_date: string | null;
  quantity_received: number | null;
  quantity_unreceived: number | null;
  quantity_damaged: number | null;
  status: string | null;
  created_by: string | null;
  updated_by: string | null;
  approved_by: string | null;
  created_at: string;
  updated_at: string;
}

export interface DBFReceivingItem {
  id: string;
  receiving_id: string | null;
  item_id: string | null;
  quantity_received: number | null;
  quantity_unreceived: number | null;
  quantity_damaged: number | null;
  description: string | null;
  created_by: string | null;
  updated_by: string | null;
  approved_by: string | null;
  status: ItemStatus;
  created_at: string;
  updated_at: string;
}

export interface DBFRequisitionItem {
  id: string;
  requisition_id: string | null;
  item_id: string | null;
  quantity: number;
  unit_price: number | null;
  total_price: number | null;
  description: string | null;
  created_by: string | null;
  updated_by: string | null;
  approved_by: string | null;
  status: ItemStatus;
  created_at: string;
  updated_at: string;
  msrp_discount: number | null;
  sku: string | null;
}

export interface DBFRequisition {
  id: string;
  requisition_number: string;
  requested_by: string | null;
  department: string | null;
  requisition_date: string;
  description: string | null;
  status: PurchaseOrderStatus;
  created_by: string | null;
  updated_by: string | null;
  approved_by: string | null;
  created_at: string;
  updated_at: string;
  vendor_id: string | null;
}

export interface DBFRFQ {
  id: string;
  po_id: string | null;
  vendor_id: string | null;
  status: RFQStatus;
  created_by: string | null;
  updated_by: string | null;
  approved_by: string | null;
  created_at: string;
  updated_at: string;
}

export interface DBFRFQItem {
  id: string;
  rfq_id: string | null;
  requisition_item_id: string | null;
  item_id: string | null;
  description: string | null;
  quantity: number;
  unit_price: number | null;
  msrp_discount: number | null;
  total_price: number | null;
  vendor_notes: string | null;
  created_by: string | null;
  created_at: string;
  updated_by: string | null;
  updated_at: string;
  sku: string | null;
}

export interface DBFRFQLog {
  id: string;
  rfq_id: string | null;
  profile_id: string | null;
  message: string;
  created_at: string;
  metadata: any | null;
}

export interface DBFRFQs {
  id: string;
  request_id: string;
  requisition_id: string | null;
  vendor_id: string | null;
  rfq_number: string | null;
  rfq_date: string | null;
  status: RFQStatus;
  description: string | null;
  created_by: string | null;
  created_at: string;
  updated_by: string | null;
  updated_at: string;
  due_date: string | null;
  shipping_amount: number;
  handling_amount: number;
  tax_amount: number;
  packaging_amount: number;
  additional_fees: number;
  additional_fees_description: string | null;
  total_amount: number;
  notes: string | null;
  shipping_address: string | null;
  shipping_city: string | null;
  shipping_state: string | null;
  shipping_zip: string | null;
  shipping_country: string | null;
  contact_name: string | null;
  contact_email: string | null;
  contact_phone: string | null;
  vendor_notes: string | null;
  vendor_response_date: string | null;
}

export interface DBFVendorItem {
  id: string;
  vendor_id: string | null;
  name: string;
  description: string | null;
  price: number | null;
  active: boolean;
  image_url: string | null;
  metadata: any | null;
  created_by: string | null;
  updated_by: string | null;
  approved_by: string | null;
  status: ItemStatus;
  created_at: string;
  updated_at: string;
  sku: string | null;
}

export interface DBFVendor {
  id: string;
  name: string;
  contact_info: any | null;
  created_by: string | null;
  updated_by: string | null;
  approved_by: string | null;
  cell: string | null;
  email: string | null;
  website: string | null;
  slack: string | null;
  facebook: string | null;
  instagram: string | null;
  x: string | null;
  whatsapp: string | null;
  discord: string | null;
  twitch: string | null;
  youtube: string | null;
  deviantart: string | null;
  bluesky: string | null;
  snapchat: string | null;
  status: VendorStatus;
  created_at: string;
  updated_at: string;
  address: any | null;
  ein: string | null;
  contact_name: string | null;
  contact_phone: string | null;
}

export interface DBFundraiserGraph {
  id: string;
  auth_id: string;
  fundraiser_id: string;
  graph_json: any;
  version: number;
  created_at: string;
  updated_at: string;
}

export interface DBFundraiserSurvey {
  id: string;
  fundraiser_id: string;
  auth_id: string | null;
  age: number | null;
  business_name: string | null;
  questions_description: string | null;
  past_fundraising_experience: string | null;
  prelaunch_date: string | null;
  launch_date: string | null;
  funding_date: string | null;
  delivery_date: string | null;
  unique_project_description: string | null;
  concerns_description: string | null;
  preferred_platform: PreferredPlatform | null;
  completed_design_percentage: number | null;
  portions_complete_description: string | null;
  intended_audience: string | null;
  created_at: string;
  updated_at: string;
}

export interface DBFundraiser {
  id: string;
  auth_id: string;
  name: string;
  description: string | null;
  budget: number;
  start_date: string | null;
  created_at: string;
  updated_at: string;
}

export interface DBGameSystemLink {
  id: string;
  created_at: string;
  url: string | null;
  hash_tag: string | null;
  at_tag: string | null;
  game_system_id: string;
  link_type_id: string;
  name: string | null;
}

export interface DBGameSystemType {
  id: string;
  name: string | null;
  created_at: string;
}

export interface DBGameSystem {
  id: string;
  name: string;
  type: string | null;
  description: string | null;
  status: string;
  created_at: string;
  updated_at: string;
  logo_image_url: string | null;
  video_url: string | null;
  order: number;
  type_id: string;
  map_icon_url: string | null;
}

export interface DBInvestorSurvey {
  id: string;
  auth_id: string;
  business_name: string | null;
  business_description: string | null;
  years_in_business: number | null;
  annual_revenue: number | null;
  funding_amount: number | null;
  funding_purpose: string | null;
  current_investors: string | null;
  exit_strategy: string | null;
  financial_projections: string | null;
  market_size: string | null;
  competitive_advantage: string | null;
  team_description: string | null;
  risks_and_challenges: string | null;
  intellectual_property: string | null;
  use_of_funds: string | null;
  preferred_investment_type: string | null;
  created_at: string;
  updated_at: string;
}

export interface DBInvite {
  id: string;
  email: string;
  status: InviteStatus;
  first_name: string | null;
  last_name: string | null;
  cell: string | null;
  date_sent: string | null;
  date_read: string | null;
  date_decided: string | null;
  is_opt_out: boolean;
  created_at: string;
  updated_at: string;
  user_id: string;
  token: string;
  accepted_at: string | null;
  accepted_by_player_id: string | null;
  decision: string | null;
}

export interface DBJobBidStatus {
  id: string;
  name: string;
  description: string | null;
  created_at: string;
}

export interface DBJobBid {
  id: string;
  job_id: string;
  bidder_id: string;
  amount: number;
  proposal: string | null;
  estimated_days: number | null;
  status_id: string;
  created_at: string;
  updated_at: string;
}

export interface DBJobClass {
  id: string;
  name: string;
  description: string | null;
  created_at: string;
}

export interface DBJobStatus {
  id: string;
  name: string;
  description: string | null;
  created_at: string;
}

export interface DBJobType {
  id: string;
  name: string;
  description: string | null;
  created_at: string;
}

export interface DBJob {
  id: string;
  title: string;
  description: string | null;
  budget: number | null;
  requestor_id: string;
  type_id: string;
  status_id: string;
  class_id: string;
  created_at: string;
  updated_at: string;
}

export interface DBLinkType {
  id: string;
  name: string | null;
  created_at: string;
}

export interface DBLocationType {
  id: string;
  name: string | null;
  created_at: string;
}

export interface DBLocation {
  id: string;
  name: string | null;
  type_id: string | null;
  lat: number | null;
  lng: number | null;
  created_at: string;
  address: string | null;
  city: string | null;
  state: string | null;
  postal_code: string | null;
  square_feet: number | null;
}

export interface DBMetro {
  id: string;
  name: string | null;
  created_at: string;
}

export interface DBMetros {
  id: string;
  name: string | null;
  state: string | null;
  created_at: string;
}

export interface DBNotification {
  id: string;
  recipient: string;
  type: NotificationType;
  status: NotificationStatus;
  created_at: string;
  updated_at: string;
}

export interface DBOfferStatus {
  id: string;
  name: string | null;
  created_at: string;
}

export interface DBOfferType {
  id: string;
  name: string | null;
  created_at: string;
}

export interface DBOffer {
  id: string;
  name: string;
  description: string | null;
  date_posted: string;
  created_at: string;
  updated_at: string;
  user_id: string;
  type_id: string;
  date_expiration: string | null;
  amount: number;
  max_uses: number;
  renewal_months: number;
  status_id: string;
}

export interface DBOrder {
  id: string;
  user_id: string | null;
  session_id: string;
  amount_total: number;
  shipping_cost: number;
  shipping_details: any;
  order_items: any;
  status: string;
  created_at: string;
  updated_at: string;
  metadata: any | null;
}

export interface DBPerson {
  id: string;
  first_name: string | null;
  last_name: string | null;
  cell: string | null;
  email: string | null;
  created_at: string;
  profile_id: string | null;
}

export interface DBPlayerExamAnswer {
  id: string;
  player_id: string;
  exam_id: string;
  exam_question_id: string;
  text_answer: string | null;
  date_answer: string | null;
  boolean_answer: boolean | null;
  uuid_answer: string | null;
  numeric_answer: number | null;
  created_at: string;
  updated_at: string;
}

export interface DBPlayerExam {
  id: string;
  player_id: string;
  exam_id: string;
  score: number | null;
  approval_player_id: string | null;
  created_at: string;
  updated_at: string;
}

export interface DBPlayerGameAccount {
  id: string;
  player_id: string;
  game_system_id: string;
  account_id: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface DBPlayerRating {
  id: string;
  player_id: string;
  rating_player_id: string;
  rating: number;
  comment: string | null;
  created_at: string;
  updated_at: string;
}

export interface DBPlayerRelationship {
  id: string;
  upline_id: string;
  downline_id: string;
  status: RelationshipStatus;
  created_at: string;
  updated_at: string;
  type: RelationshipType;
}

export interface DBPlayerRetailer {
  id: string;
  player_id: string;
  retailer_id: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface DBPlayerSession {
  id: string;
  player_id: string;
  session_id: string;
  payment_status: PaymentStatus;
  attendance_status: AttendanceStatus;
  created_at: string;
  updated_at: string;
}

export interface DBPlayerSkill {
  id: string;
  player_id: string | null;
  skill_id: string | null;
  name: string;
  description: string | null;
  rating: number;
  created_at: string;
}

export interface DBPlayer {
  id: string;
  alias: string;
  email: string | null;
  city: string | null;
  state: string | null;
  status: PlayerStatus | null;
  auth_id: string | null;
  alias_image_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface DBPrizeCard {
  id: string;
  prize_id: string;
  card_name: string;
  card_image_url: string;
  sort_order: number;
  created_at: string;
  updated_at: string;
  created_by: string;
}

export interface DBProduct {
  id: string;
  stripe_id: string;
  name: string;
  description: string | null;
  active: boolean;
  images: string[] | null;
  metadata: any;
  created_at: string;
  updated_at: string;
}

export interface DBProfileLink {
  id: string;
  created_at: string;
  url: string | null;
  hash_tag: string | null;
  at_tag: string | null;
  profile_id: string | null;
  link_type_id: string | null;
  name: string | null;
}

export interface DBReferral {
  id: string;
  referrer_id: string;
  referral_code: string;
  created_at: string;
  updated_at: string;
}

export interface DBRetailerBrand {
  id: string;
  retailer_id: string;
  brand_id: string;
  created_at: string;
  updated_at: string;
}

export interface DBRetailerPersonRole {
  id: string;
  name: string | null;
  created_at: string;
}

export interface DBRetailerPerson {
  id: string;
  retailer_id: string | null;
  person_id: string | null;
  role_id: string | null;
  created_at: string;
}

export interface DBRetailerType {
  id: string;
  name: string | null;
  source: string | null;
  created_at: string;
}

export interface DBRetailer {
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
  hours_of_operation: any | null;
  status: string | null;
  created_at: string;
  updated_at: string;
  store_photo: string | null;
  is_featured: boolean;
  carousel_image: string | null;
  metro_id: string | null;
  import_first_name: string | null;
  import_last_name: string | null;
  import_gama_id: string | null;
  import_opt_in_email: string | null;
  import_opt_in_sms: string | null;
  address_1: string | null;
  import_has_purchased_amount: number | null;
  import_is_tax_exempt: string | null;
  type_id: string | null;
  import_order_count: number | null;
  country_id: string;
}

export interface DBServiceOrderStatusDependency {
  id: string;
  precedent_id: string;
  dependent_id: string;
  type_id: string;
  created_at: string;
}

export interface DBServiceOrderStatusDependencyType {
  id: string;
  name: string;
  description: string | null;
  created_at: string;
}

export interface DBServiceOrderStatus {
  id: string;
  service_order_id: string;
  name: string;
  description: string | null;
  percent_completed: number;
  created_at: string;
  updated_at: string;
}

export interface DBServiceOrder {
  id: string;
  job_id: string;
  provider_id: string | null;
  amount: number;
  status: ServiceOrderStatus;
  start_date: string;
  end_date: string;
  created_at: string;
  updated_at: string;
  name: string;
  description: string | null;
}

export interface DBSession {
  id: string;
  campaign_id: string;
  session_number: number;
  start_date: string;
  description: string | null;
  status: SessionStatus | null;
  created_at: string;
  price: number;
  end_date: string | null;
}

export interface DBSignature {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
  image_url: string | null;
}

export interface DBSkillType {
  id: string;
  name: string;
  description: string | null;
  created_at: string;
}

export interface DBSkill {
  id: string;
  name: string;
  description: string | null;
  type_id: string | null;
  created_at: string;
}

export interface DBSpatialRefSys {
  srid: number;
  auth_name: string | null;
  auth_srid: number | null;
  srtext: string | null;
  proj4text: string | null;
}

export interface DBTournamentEntry {
  id: string;
  tournament_id: string;
  player_id: string;
  registration_date: string;
  status: string;
  final_rank: number | null;
  created_at: string;
  updated_at: string;
}

export interface DBTournamentPrize {
  id: string;
  tournament_id: string;
  placement: number;
  description: string;
  created_at: string;
  updated_at: string;
}

export interface DBTournament {
  id: string;
  game_system_id: string;
  title: string;
  description: string | null;
  start_date: string;
  end_date: string;
  location: string;
  venue: string;
  prize_pool: number | null;
  max_participants: number | null;
  registration_deadline: string | null;
  image_url: string | null;
  is_featured: boolean | null;
  tournament_type: string | null;
  status: string | null;
  registration_url: string | null;
  created_at: string;
  updated_at: string;
  carousel_image: string | null;
  created_by: string | null;
}

export interface DBVisit {
  id: string;
  auth_id: string;
  lat: number;
  lng: number;
  recorded_at: string;
  created_at: string;
  customer_demo_count: number;
  comments: string | null;
  is_positive_experience: boolean | null;
}

export interface DBVisitRetailer {
  id: string;
  visit_id: string;
  retailer_id: string;
  distance_feet: number;
  created_at: string;
}

export interface DBVisitSyncLog {
  id: string;
  visit_id: string;
  sync_status: VisitSyncStatus;
  sync_data: any;
  error_message: string | null;
  synced_at: string | null;
  created_at: string;
}

// ============================================
// UTILITY TYPES
// ============================================

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: DBProfile;
        Insert: Omit<DBProfile, 'id' | 'created_at'> & { id?: string; created_at?: string };
        Update: Partial<DBProfile>;
      };
      campaigns: {
        Row: DBCampaign;
        Insert: Omit<DBCampaign, 'id' | 'created_at'> & { id?: string; created_at?: string };
        Update: Partial<DBCampaign>;
      };
      players: {
        Row: DBPlayer;
        Insert: Omit<DBPlayer, 'id' | 'created_at' | 'updated_at'> & { id?: string; created_at?: string; updated_at?: string };
        Update: Partial<DBPlayer>;
      };
      // Add more tables as needed
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      user_role: UserRole;
      campaign_status: CampaignStatus;
      player_status: PlayerStatus;
      invite_status: InviteStatus;
      blog_status: BlogStatus;
      book_content_type: BookContentType;
      convention_status: ConventionStatus;
      payment_status: PaymentStatus;
      attendance_status: AttendanceStatus;
      relationship_status: RelationshipStatus;
      session_status: SessionStatus;
      service_order_status: ServiceOrderStatus;
      preferred_platform: PreferredPlatform;
      // Add more enums as needed
    };
  };
};