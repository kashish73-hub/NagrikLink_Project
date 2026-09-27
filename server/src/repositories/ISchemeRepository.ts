import { Scheme, SchemeFilterOptions } from '@nagriklink/shared';

export interface ISchemeRepository {
  getAllSchemes(filters?: SchemeFilterOptions): Promise<Scheme[]>;
  getSchemeById(id: string): Promise<Scheme | null>;
  getSchemeBySlug(slug: string): Promise<Scheme | null>;
  getActiveSchemesForEvaluation(): Promise<Scheme[]>;
}
