// ─── Opportunities (jobs & internships) ───────────────────────────────────────
// Mirrors the member-facing shape of GET /opportunities and
// GET /opportunities/:id. Admin-only fields (created_by, creator, …) are not
// returned to members and are deliberately absent here.

export type OpportunityType = 'job' | 'internship';

export type ApplicationMethod = 'url' | 'email' | 'other';

export type OpportunityStatus = 'draft' | 'published' | 'closed' | 'archived';

/** Status and deadline combined by the backend. Members only ever see `open`. */
export type OpportunityAvailability =
  | 'open'
  | 'expired'
  | 'closed'
  | 'draft'
  | 'archived';

export interface Opportunity {
  id:           string;
  title:        string;
  organization: string;
  type:         OpportunityType;
  description:  string;

  qualifications: string[];
  skills:         string[];

  location: string;
  /** "YYYY-MM-DD", inclusive and Paris-local. `null` means no deadline. */
  application_deadline: string | null;

  application_method:       ApplicationMethod;
  application_url:          string | null;
  application_email:        string | null;
  application_instructions: string | null;

  contact_name:  string | null;
  contact_email: string | null;
  contact_phone: string | null;

  status:       OpportunityStatus;
  published_at: string | null;
  closed_at:    string | null;
  created_at:   string;
  updated_at:   string;

  availability: OpportunityAvailability;
  is_expired:   boolean;
}

/** `meta` block on the list response. */
export interface OpportunityListMeta {
  total: number;
  page:  number;
  limit: number;
  pages: number;
}

export interface OpportunityListParams {
  type?:     OpportunityType;
  search?:   string;
  location?: string;
  page?:     number;
  limit?:    number;
}

export interface OpportunityListResult {
  items: Opportunity[];
  meta:  OpportunityListMeta;
}
