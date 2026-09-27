export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  meta?: {
    total?: number;
    page?: number;
    limit?: number;
    timestamp?: string;
    [key: string]: any;
  };
}

export interface SchemeEvaluationPayload {
  profile: Record<string, any>;
  filterOptions?: {
    category?: string;
    level?: string;
    state?: string;
    minConfidence?: number;
  };
}

export interface SchemeEvaluationResponse {
  eligibleSchemes: any[];
  nearEligibleSchemes: any[];
  totalEligibleCount: number;
  totalEstimatedBenefitAnnual: number;
  evaluationTimestamp: string;
}

export interface TrackingUpdatePayload {
  schemeId: string;
  status: 'SAVED' | 'IN_PROGRESS' | 'APPLIED';
  notes?: string;
}
