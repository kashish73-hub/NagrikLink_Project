import { DocumentInfo } from './scheme.types';

export interface DocumentReadinessItem extends DocumentInfo {
  isChecked: boolean;
  requiredBySchemes: Array<{
    id: string;
    title: string;
    isMandatory: boolean;
  }>;
}

export interface DocumentReadinessSummary {
  totalUniqueDocuments: number;
  readyCount: number;
  missingCount: number;
  readinessPercentage: number;
  documents: DocumentReadinessItem[];
}
