import { CompoundRuleGroup, SchemeEvaluationResult } from './rules.types';

export type SchemeCategory = 
  | 'EDUCATION'
  | 'AGRICULTURE'
  | 'HEALTHCARE'
  | 'HOUSING'
  | 'BUSINESS_LOANS'
  | 'SOCIAL_WELFARE'
  | 'SKILL_DEVELOPMENT'
  | 'WOMEN_AND_CHILD';

export type SchemeLevel = 'CENTRAL' | 'STATE';

export type TrackingStatus = 'SAVED' | 'IN_PROGRESS' | 'APPLIED';

export interface DocumentInfo {
  id: string;
  name: string;
  slug: string;
  description: string;
  issuingAuthority: string;
  downloadGuideUrl: string;
  category?: string;
  isMandatory?: boolean;
  note?: string;
}

export interface Scheme {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  fullDescription: string;
  category: SchemeCategory;
  ministry: string;
  level: SchemeLevel;
  state: string | null;
  benefitSummary: string;
  financialValueAnnual: number;
  directApplyUrl: string;
  deadline: string | null;
  isAlwaysOpen: boolean;
  eligibilityRules: CompoundRuleGroup;
  isActive: boolean;
  documents?: DocumentInfo[];
  tags?: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface EvaluatedScheme extends Scheme {
  evaluation: SchemeEvaluationResult;
}

export interface SchemeFilterOptions {
  category?: SchemeCategory | 'ALL';
  level?: SchemeLevel | 'ALL';
  state?: string | 'ALL';
  searchQuery?: string;
  minFinancialBenefit?: number;
  sortBy?: 'benefit_desc' | 'confidence_desc' | 'title_asc' | 'deadline_asc';
}
