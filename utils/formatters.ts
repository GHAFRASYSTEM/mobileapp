import type { Listing } from "@/assets/data/jobInternship.types"
 
export function formatSalaryFull(salary: Listing['salary']): {
  amount: string
  period: string
  isUnspec: boolean
} {
  if (salary.unspecified || (!salary.min && !salary.max))
    return { amount: 'Unspecified salary', period: '', isUnspec: true }
 
  const currency = salary.currency ?? 'GHS'
  const periodMap: Record<string, string> = {
    hourly: 'per hour',
    monthly: 'per month',
    yearly: 'per year',
    stipend: 'stipend',
  }
  const period = periodMap[salary.period ?? 'monthly']
  const fmt = (n: number) =>
    new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(n)
 
  if (salary.min && salary.max)
    return { amount: `${currency} ${fmt(salary.min)} – ${fmt(salary.max)}`, period, isUnspec: false }
  if (salary.min)
    return { amount: `${currency} ${fmt(salary.min)}+`, period, isUnspec: false }
  return { amount: `Up to ${currency} ${fmt(salary.max!)}`, period, isUnspec: false }
}
 
export function formatDate(iso?: string): string {
  if (!iso) return 'TBD'
  return new Date(iso).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}
 
export const WORK_MODE_LABEL: Record<Listing['workMode'], string> = {
  remote: 'Remote',
  'on-site': 'On-site',
  hybrid: 'Hybrid',
}
 
export const EMPLOYMENT_LABEL: Record<Listing['employmentType'], string> = {
  'full-time': 'Full-time',
  'part-time': 'Part-time',
  contract: 'Contract',
  volunteer: 'Volunteer',
}
 