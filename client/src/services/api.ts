import { 
  UserProfile, 
  SchemeFilterOptions, 
  SchemeEvaluationResponse, 
  Scheme, 
  DocumentInfo, 
  DocumentReadinessSummary, 
  TrackingStatus,
  ApiResponse 
} from '@nagriklink/shared';

const API_BASE = '/api';

async function handleResponse<T>(res: Response): Promise<T> {
  const json: ApiResponse<T> = await res.json();
  if (!res.ok || !json.success) {
    throw new Error(json.error || `HTTP error! status: ${res.status}`);
  }
  return json.data as T;
}

export const api = {
  // Eligibility Evaluation
  async evaluateEligibility(
    profile: UserProfile, 
    filters?: SchemeFilterOptions
  ): Promise<SchemeEvaluationResponse> {
    const res = await fetch(`${API_BASE}/eligibility/evaluate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ profile, filters })
    });
    return handleResponse<SchemeEvaluationResponse>(res);
  },

  // Scheme Discovery
  async getSchemes(filters?: SchemeFilterOptions): Promise<Scheme[]> {
    const params = new URLSearchParams();
    if (filters?.category && filters.category !== 'ALL') params.append('category', filters.category);
    if (filters?.level && filters.level !== 'ALL') params.append('level', filters.level);
    if (filters?.state && filters.state !== 'ALL') params.append('state', filters.state);
    if (filters?.searchQuery) params.append('q', filters.searchQuery);
    if (filters?.sortBy) params.append('sortBy', filters.sortBy);

    const res = await fetch(`${API_BASE}/schemes?${params.toString()}`);
    return handleResponse<Scheme[]>(res);
  },

  async getSchemeBySlug(slug: string): Promise<Scheme> {
    const res = await fetch(`${API_BASE}/schemes/${slug}`);
    return handleResponse<Scheme>(res);
  },

  // Document Readiness
  async getDocuments(): Promise<DocumentInfo[]> {
    const res = await fetch(`${API_BASE}/documents`);
    return handleResponse<DocumentInfo[]>(res);
  },

  async calculateReadiness(
    schemeIds: string[], 
    checkedDocumentIds: string[]
  ): Promise<DocumentReadinessSummary> {
    const res = await fetch(`${API_BASE}/documents/readiness`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ schemeIds, checkedDocumentIds })
    });
    return handleResponse<DocumentReadinessSummary>(res);
  },

  // Application Tracking
  async getUserTrackings(guestToken: string): Promise<any[]> {
    const res = await fetch(`${API_BASE}/tracking/${guestToken}`);
    return handleResponse<any[]>(res);
  },

  async updateTrackingStatus(
    guestToken: string, 
    schemeId: string, 
    status: TrackingStatus, 
    notes?: string
  ): Promise<any> {
    const res = await fetch(`${API_BASE}/tracking`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ guestToken, schemeId, status, notes })
    });
    return handleResponse<any>(res);
  },

  async removeTracking(guestToken: string, schemeId: string): Promise<any> {
    const res = await fetch(`${API_BASE}/tracking/${guestToken}/${schemeId}`, {
      method: 'DELETE'
    });
    return handleResponse<any>(res);
  }
};
