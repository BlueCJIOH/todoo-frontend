export interface JobCard {
  id?: number;
  name: string;
  category: JobCategory
  location: string;
  deadline: string;
  salary: number;
  currency: string;
  paymentType: 'fix' | 'hour' | string;
  responds: number;
}

export type JobCategory = 'all' | 'delivery' | 'repair' | 'design' | 'tutoring';

export interface FilterOption {
  value: JobCategory;
  label: string;
}
