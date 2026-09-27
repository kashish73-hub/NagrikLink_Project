import { Scheme, SchemeFilterOptions } from '@nagriklink/shared';
import { ISchemeRepository } from '../repositories/ISchemeRepository';

export class SchemeService {
  constructor(private schemeRepo: ISchemeRepository) {}

  public async getSchemes(filters?: SchemeFilterOptions): Promise<Scheme[]> {
    return this.schemeRepo.getAllSchemes(filters);
  }

  public async getSchemeById(id: string): Promise<Scheme | null> {
    return this.schemeRepo.getSchemeById(id);
  }

  public async getSchemeBySlug(slug: string): Promise<Scheme | null> {
    return this.schemeRepo.getSchemeBySlug(slug);
  }
}
