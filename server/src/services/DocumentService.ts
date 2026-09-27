import { 
  DocumentInfo, 
  DocumentReadinessSummary, 
  DocumentReadinessItem 
} from '@nagriklink/shared';
import { DocumentRepository } from '../repositories/DocumentRepository';
import { ISchemeRepository } from '../repositories/ISchemeRepository';

export class DocumentService {
  constructor(
    private docRepo: DocumentRepository,
    private schemeRepo: ISchemeRepository
  ) {}

  public async getAllDocuments(): Promise<DocumentInfo[]> {
    return this.docRepo.getAllDocuments();
  }

  public async getDocumentBySlug(slug: string): Promise<DocumentInfo | null> {
    return this.docRepo.getDocumentBySlug(slug);
  }

  /**
   * Aggregates required documents across targeted scheme IDs and generates
   * an interactive readiness summary based on user checked documents.
   */
  public async calculateReadiness(
    schemeIds: string[],
    checkedDocumentIds: string[] = []
  ): Promise<DocumentReadinessSummary> {
    const checkedSet = new Set(checkedDocumentIds);
    const docMap = new Map<string, DocumentReadinessItem>();

    for (const schemeId of schemeIds) {
      const scheme = await this.schemeRepo.getSchemeById(schemeId);
      if (!scheme || !scheme.documents) continue;

      for (const doc of scheme.documents) {
        if (!docMap.has(doc.id)) {
          docMap.set(doc.id, {
            ...doc,
            isChecked: checkedSet.has(doc.id),
            requiredBySchemes: [
              {
                id: scheme.id,
                title: scheme.title,
                isMandatory: doc.isMandatory ?? true
              }
            ]
          });
        } else {
          const existing = docMap.get(doc.id)!;
          existing.requiredBySchemes.push({
            id: scheme.id,
            title: scheme.title,
            isMandatory: doc.isMandatory ?? true
          });
        }
      }
    }

    const aggregatedDocs = Array.from(docMap.values());
    const totalUniqueDocuments = aggregatedDocs.length;
    const readyCount = aggregatedDocs.filter(d => d.isChecked).length;
    const missingCount = totalUniqueDocuments - readyCount;
    const readinessPercentage = totalUniqueDocuments > 0 
      ? Math.round((readyCount / totalUniqueDocuments) * 100) 
      : 100;

    return {
      totalUniqueDocuments,
      readyCount,
      missingCount,
      readinessPercentage,
      documents: aggregatedDocs
    };
  }
}
