import { DocumentInfo } from '@nagriklink/shared';
import { SEED_DOCUMENTS } from '../data/seed-schemes.data';

export class DocumentRepository {
  private documents: DocumentInfo[] = SEED_DOCUMENTS;

  public async getAllDocuments(): Promise<DocumentInfo[]> {
    return [...this.documents];
  }

  public async getDocumentById(id: string): Promise<DocumentInfo | null> {
    const doc = this.documents.find(d => d.id === id);
    return doc || null;
  }

  public async getDocumentBySlug(slug: string): Promise<DocumentInfo | null> {
    const doc = this.documents.find(d => d.slug === slug);
    return doc || null;
  }
}
