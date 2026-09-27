import { 
  UserProfile, 
  EvaluatedScheme, 
  SchemeEvaluationResponse, 
  SchemeFilterOptions 
} from '@nagriklink/shared';
import { ISchemeRepository } from '../repositories/ISchemeRepository';
import { DeterministicRuleEngine } from '../rules-engine/DeterministicRuleEngine';

export class EligibilityService {
  constructor(private schemeRepo: ISchemeRepository) {}

  public async evaluateEligibility(
    profile: UserProfile,
    filters?: SchemeFilterOptions
  ): Promise<SchemeEvaluationResponse> {
    const candidateSchemes = await this.schemeRepo.getAllSchemes(filters);

    const eligibleSchemes: EvaluatedScheme[] = [];
    const nearEligibleSchemes: EvaluatedScheme[] = [];

    for (const scheme of candidateSchemes) {
      const evaluation = DeterministicRuleEngine.evaluateScheme(profile, scheme.eligibilityRules);
      const evaluatedScheme: EvaluatedScheme = {
        ...scheme,
        evaluation
      };

      if (evaluation.isEligible) {
        eligibleSchemes.push(evaluatedScheme);
      } else if (evaluation.confidenceScore >= 50) {
        // High-confidence partial matches (e.g. 1 criterion away, like caste or state)
        nearEligibleSchemes.push(evaluatedScheme);
      }
    }

    // Sort eligible schemes by financial benefit value descending (highest benefit first)
    eligibleSchemes.sort((a, b) => b.financialValueAnnual - a.financialValueAnnual);

    // Sort near-eligible by confidence score descending
    nearEligibleSchemes.sort((a, b) => b.evaluation.confidenceScore - a.evaluation.confidenceScore);

    const totalEstimatedBenefitAnnual = eligibleSchemes.reduce(
      (sum, s) => sum + (s.financialValueAnnual || 0), 
      0
    );

    return {
      eligibleSchemes,
      nearEligibleSchemes,
      totalEligibleCount: eligibleSchemes.length,
      totalEstimatedBenefitAnnual,
      evaluationTimestamp: new Date().toISOString()
    };
  }
}
