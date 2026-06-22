// ─────────────────────────────────────────────────────────────────────────────
// Job & Internship — shared data types
// ─────────────────────────────────────────────────────────────────────────────

export type ListingType = 'job' | 'internship'

export type WorkMode = 'remote' | 'on-site' | 'hybrid'

export type EmploymentType = 'full-time' | 'part-time' | 'contract' | 'volunteer'

/** Visibility / moderation status — toggled from the dashboard */
export type ListingStatus =
  | 'pending'    // submitted, awaiting review
  | 'approved'   // visible to members
  | 'rejected'   // hidden, declined by admin
  | 'closed'     // opportunity no longer available
  | 'draft'      // saved but not yet submitted

export interface ContactPoint {
  email: string
  phone?: string          // optional
  name?: string           // recruiter / point-of-contact name
}

export interface SalaryRange {
  min?: number
  max?: number
  currency?: string       // defaults to 'GHS' for Ghanaian context
  period?: 'hourly' | 'monthly' | 'yearly' | 'stipend'
  /** If true, renders "Unspecified Salary" */
  unspecified?: boolean
}

/**
 * Core listing — shared fields for both jobs and internships.
 * Type-specific differences are handled by the `type` discriminant
 * and the optional fields below.
 */
export interface Listing {
  id: string
  type: ListingType

  // ── Identity ──────────────────────────────────────────────────────────────
  title: string
  company: string
  /** URL or local asset reference for the company / poster image */
  posterImage?: string
  /** Industry / functional category e.g. "Software Engineering", "Marketing" */
  category: string

  // ── Details ───────────────────────────────────────────────────────────────
  location: string          // city, country, or "Remote"
  workMode: WorkMode
  employmentType: EmploymentType
  salary: SalaryRange

  description: string       // full markdown/plain-text body
  skillsRequired: string[]  // shown comma-separated in the card

  // ── Dates ─────────────────────────────────────────────────────────────────
  startDate?: string        // ISO-8601 date string
  applicationDeadline?: string

  // ── Internship-specific ───────────────────────────────────────────────────
  /** Duration string e.g. "3 months", "6 weeks" — only relevant for internships */
  duration?: string
  /** Whether academic credit is offered — only relevant for internships */
  academicCredit?: boolean

  // ── Contact ───────────────────────────────────────────────────────────────
  contact: ContactPoint

  // ── Moderation ────────────────────────────────────────────────────────────
  status: ListingStatus
  /** ISO-8601 — when the listing was submitted */
  postedAt: string
  /** Which GhaFra member posted this */
  postedBy?: string
}

// ─────────────────────────────────────────────────────────────────────────────
// Mock data — mix of jobs and internships
// ─────────────────────────────────────────────────────────────────────────────

export const MOCK_LISTINGS: Listing[] = [
  {
    id: '1',
    type: 'job',
    title: 'Frontend Engineer',
    company: 'Paystack',
    posterImage: 'https://picsum.photos/seed/paystack/400/200',
    category: 'Software Engineering',
    location: 'Lagos, Nigeria',
    workMode: 'hybrid',
    employmentType: 'full-time',
    salary: { min: 3000, max: 5000, currency: '€ EUR', period: 'monthly' },
    description:
      'We are looking for a skilled Frontend Engineer to join our product team. You will work on our merchant-facing dashboard, improve performance, and ship delightful user experiences. Experience with React and TypeScript is a must.',
    skillsRequired: ['React', 'TypeScript', 'CSS', 'REST APIs', 'Git'],
    startDate: '2025-09-01',
    applicationDeadline: '2025-07-31',
    contact: { email: 'careers@paystack.com', name: 'Talent Team' },
    status: 'approved',
    postedAt: '2025-06-10T09:00:00Z',
    postedBy: 'Kofi Mensah',
  },
  {
    id: '2',
    type: 'internship',
    title: 'Data Science Intern',
    company: 'Farmerline',
    posterImage: 'https://picsum.photos/seed/farmerline/400/200',
    category: 'Data & Analytics',
    location: 'Accra, Ghana',
    workMode: 'on-site',
    employmentType: 'full-time',
    salary: { unspecified: true },
    description:
      "Join Farmerline's data team for a 3-month internship. You will assist with agricultural data collection, cleaning, and building dashboards to support decision-making for smallholder farmers across West Africa.",
    skillsRequired: ['Python', 'Pandas', 'SQL', 'Data Visualisation'],
    startDate: '2025-08-01',
    applicationDeadline: '2025-07-15',
    duration: '3 months',
    academicCredit: true,
    contact: { email: 'intern@farmerline.co', phone: '+233201234567', name: 'HR Department' },
    status: 'approved',
    postedAt: '2025-06-12T11:30:00Z',
    postedBy: 'Abena Owusu',
  },
  {
    id: '3',
    type: 'job',
    title: 'Product Manager',
    company: 'mPharma',
    posterImage: 'https://picsum.photos/seed/mpharma/400/200',
    category: 'Product Management',
    location: 'Remote',
    workMode: 'remote',
    employmentType: 'full-time',
    salary: { min: 70000, max: 90000, currency: '€ EUR', period: 'yearly' },
    description:
      'mPharma is hiring a Product Manager to lead our patient-facing apps. You will own the product roadmap, collaborate with engineering and design, and drive growth across multiple African markets.',
    skillsRequired: ['Product Strategy', 'Agile', 'User Research', 'SQL', 'Stakeholder Management'],
    startDate: '2025-10-01',
    applicationDeadline: '2025-08-20',
    contact: { email: 'jobs@mpharma.com', name: 'People Ops' },
    status: 'approved',
    postedAt: '2025-06-15T08:00:00Z',
    postedBy: 'Kwame Asante',
  },
  {
    id: '4',
    type: 'internship',
    title: 'UX Design Intern',
    company: 'Hubtel',
    posterImage: 'https://picsum.photos/seed/hubtel/400/200',
    category: 'Design',
    location: 'Accra, Ghana',
    workMode: 'hybrid',
    employmentType: 'part-time',
    salary: { min: 500, currency: 'GHS', period: 'monthly' },
    description:
      'Hubtel is looking for a passionate UX Design Intern to help shape how millions of Ghanaians experience mobile commerce. You will run usability tests, create wireframes, and work closely with senior designers.',
    skillsRequired: ['Figma', 'User Research', 'Wireframing', 'Prototyping'],
    startDate: '2025-09-15',
    applicationDeadline: '2025-08-01',
    duration: '6 months',
    academicCredit: false,
    contact: { email: 'design.intern@hubtel.com', phone: '+233302000000' },
    status: 'approved',
    postedAt: '2025-06-18T14:00:00Z',
    postedBy: 'Esi Darko',
  },
]