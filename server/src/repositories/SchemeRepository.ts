import { ISchemeRepository } from './ISchemeRepository';
import { Scheme, SchemeFilterOptions } from '@nagriklink/shared';
import { SEED_SCHEMES } from '../data/seed-schemes.data';

export class SchemeRepository implements ISchemeRepository {
  private schemes: Scheme[] = SEED_SCHEMES;

  public async getAllSchemes(filters?: SchemeFilterOptions): Promise<Scheme[]> {
    let result = [...this.schemes].filter(s => s.isActive);

    if (filters) {
      if (filters.category && filters.category !== 'ALL') {
        result = result.filter(s => s.category === filters.category);
      }
      if (filters.level && filters.level !== 'ALL') {
        result = result.filter(s => s.level === filters.level);
      }
      if (filters.state && filters.state !== 'ALL') {
        result = result.filter(s => s.level === 'CENTRAL' || s.state === filters.state);
      }
      if (filters.searchQuery && filters.searchQuery.trim() !== '') {
        const q = filters.searchQuery.toLowerCase().trim();
        result = result.filter(s =>
          s.title.toLowerCase().includes(q) ||
          s.shortDescription.toLowerCase().includes(q) ||
          s.ministry.toLowerCase().includes(q) ||
          (s.tags && s.tags.some(tag => tag.toLowerCase().includes(q)))
        );
      }
      if (filters.minFinancialBenefit && filters.minFinancialBenefit > 0) {
        result = result.filter(s => s.financialValueAnnual >= filters.minFinancialBenefit!);
      }

      if (filters.sortBy) {
        switch (filters.sortBy) {
          case 'benefit_desc':
            result.sort((a, b) => b.financialValueAnnual - a.financialValueAnnual);
            break;
          case 'title_asc':
            result.sort((a, b) => a.title.localeCompare(b.title));
            break;
          case 'deadline_asc':
            result.sort((a, b) => {
              if (!a.deadline) return 1;
              if (!b.deadline) return -1;
              return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
            });
            break;
          default:
            result.sort((a, b) => b.financialValueAnnual - a.financialValueAnnual);
        }
      }
    }

    return result;
  }

  public async getSchemeById(id: string): Promise<Scheme | null> {
    const scheme = this.schemes.find(s => s.id === id);
    return scheme || null;
  }

  public async getSchemeBySlug(slug: string): Promise<Scheme | null> {
    const scheme = this.schemes.find(s => s.slug === slug);
    return scheme || null;
  }

  public async getActiveSchemesForEvaluation(): Promise<Scheme[]> {
    return this.schemes.filter(s => s.isActive);
  }
}
