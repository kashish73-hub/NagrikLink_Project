import { 
  UserProfile, 
  CompoundRuleGroup, 
  BaseRuleCondition, 
  ComparisonOperator, 
  SchemeEvaluationResult, 
  ConditionEvaluationDetail 
} from '@nagriklink/shared';

export class DeterministicRuleEngine {
  /**
   * Evaluates a user profile against a scheme's compound rule tree.
   * Deterministic, zero side-effects, and generates exact match/unmatch reasoning.
   */
  public static evaluateScheme(
    profile: UserProfile, 
    ruleGroup: CompoundRuleGroup
  ): SchemeEvaluationResult {
    const matchedReasons: string[] = [];
    const unmatchedReasons: string[] = [];
    const details: ConditionEvaluationDetail[] = [];

    const isEligible = this.evaluateGroup(
      profile, 
      ruleGroup, 
      matchedReasons, 
      unmatchedReasons, 
      details
    );

    // Calculate weighted confidence score
    const totalConditions = details.length;
    const passedConditions = details.filter(d => d.passed).length;
    
    let confidenceScore = 0;
    if (isEligible) {
      confidenceScore = 100;
    } else if (totalConditions > 0) {
      confidenceScore = Math.round((passedConditions / totalConditions) * 100);
    }

    return {
      isEligible,
      confidenceScore,
      matchedReasons: Array.from(new Set(matchedReasons)),
      unmatchedReasons: Array.from(new Set(unmatchedReasons)),
      details
    };
  }

  private static evaluateGroup(
    profile: UserProfile,
    group: CompoundRuleGroup,
    matchedReasons: string[],
    unmatchedReasons: string[],
    details: ConditionEvaluationDetail[]
  ): boolean {
    if (!group || !group.conditions || group.conditions.length === 0) {
      return true; // No conditions means open to all
    }

    const results: boolean[] = [];

    for (const condition of group.conditions) {
      if ('logic' in condition) {
        // Recursive Compound Rule Group evaluation
        const nestedResult = this.evaluateGroup(
          profile, 
          condition as CompoundRuleGroup, 
          matchedReasons, 
          unmatchedReasons, 
          details
        );
        results.push(nestedResult);
      } else {
        // Base Rule Condition evaluation
        const baseCond = condition as BaseRuleCondition;
        const conditionResult = this.evaluateCondition(profile, baseCond);
        results.push(conditionResult.passed);
        details.push(conditionResult);

        if (conditionResult.passed) {
          matchedReasons.push(conditionResult.reason);
        } else {
          unmatchedReasons.push(conditionResult.reason);
        }
      }
    }

    switch (group.logic) {
      case 'AND':
        return results.every(Boolean);
      case 'OR':
        return results.some(Boolean);
      case 'NOR':
        return !results.some(Boolean);
      default:
        return results.every(Boolean);
    }
  }

  public static evaluateCondition(
    profile: UserProfile,
    condition: BaseRuleCondition
  ): ConditionEvaluationDetail {
    const actualRaw = profile[condition.field];
    const op = condition.operator;
    const expected = condition.value;

    const passed = this.compare(actualRaw, op, expected);
    const reason = this.generateReason(condition.field, op, expected, actualRaw, passed, condition.label);

    return {
      field: condition.field,
      operator: op,
      expectedValue: expected,
      actualValue: actualRaw,
      passed,
      reason
    };
  }

  public static compare(actual: any, op: ComparisonOperator, expected: any): boolean {
    if (actual === undefined || actual === null) {
      return false;
    }

    switch (op) {
      case '==': {
        if (typeof actual === 'string' && typeof expected === 'string') {
          return actual.trim().toUpperCase() === expected.trim().toUpperCase();
        }
        return actual === expected;
      }

      case '!=': {
        if (typeof actual === 'string' && typeof expected === 'string') {
          return actual.trim().toUpperCase() !== expected.trim().toUpperCase();
        }
        return actual !== expected;
      }

      case '<':
        return Number(actual) < Number(expected);

      case '<=':
        return Number(actual) <= Number(expected);

      case '>':
        return Number(actual) > Number(expected);

      case '>=':
        return Number(actual) >= Number(expected);

      case 'in': {
        if (!Array.isArray(expected)) return false;
        // Universal match check
        const normalizedExpected = expected.map(item => String(item).trim().toUpperCase());
        if (
          normalizedExpected.includes('ALL') || 
          normalizedExpected.includes('ANY') ||
          normalizedExpected.includes('*')
        ) {
          return true;
        }
        const normalizedActual = String(actual).trim().toUpperCase();
        return normalizedExpected.includes(normalizedActual);
      }

      case 'not_in': {
        if (!Array.isArray(expected)) return false;
        const normalizedExpected = expected.map(item => String(item).trim().toUpperCase());
        const normalizedActual = String(actual).trim().toUpperCase();
        return !normalizedExpected.includes(normalizedActual);
      }

      case 'between': {
        if (!Array.isArray(expected) || expected.length < 2) return false;
        const min = Number(expected[0]);
        const max = Number(expected[1]);
        const numericActual = Number(actual);
        return numericActual >= min && numericActual <= max;
      }

      case 'contains': {
        if (Array.isArray(actual)) {
          return actual.some(item => 
            String(item).trim().toUpperCase() === String(expected).trim().toUpperCase()
          );
        }
        if (typeof actual === 'string') {
          return actual.toLowerCase().includes(String(expected).toLowerCase());
        }
        return false;
      }

      default:
        return false;
    }
  }

  private static generateReason(
    field: keyof UserProfile,
    op: ComparisonOperator,
    expected: any,
    actual: any,
    passed: boolean,
    customLabel?: string
  ): string {
    const symbol = passed ? '✓' : '✗';
    const fieldName = this.formatFieldName(field);

    if (customLabel) {
      return passed 
        ? `${symbol} Met criteria: ${customLabel}` 
        : `${symbol} Not met: ${customLabel} (Current: ${this.formatValue(actual, field)})`;
    }

    if (field === 'annualIncome') {
      const incomeFormatted = `₹${Number(actual).toLocaleString('en-IN')}`;
      const limitFormatted = `₹${Number(expected).toLocaleString('en-IN')}`;
      if (op === '<=') {
        return passed 
          ? `${symbol} Annual income of ${incomeFormatted} is within limit of ${limitFormatted}` 
          : `${symbol} Annual income of ${incomeFormatted} exceeds the maximum limit of ${limitFormatted}`;
      }
    }

    if (field === 'state') {
      if (op === 'in') {
        const statesList = Array.isArray(expected) ? expected.join(', ') : expected;
        return passed
          ? `${symbol} Domicile verified for ${actual}`
          : `${symbol} Scheme requires domicile in: ${statesList} (Applicant: ${actual})`;
      }
    }

    if (field === 'age') {
      if (op === 'between' && Array.isArray(expected)) {
        return passed
          ? `${symbol} Age ${actual} is within eligible bracket (${expected[0]}-${expected[1]} years)`
          : `${symbol} Age ${actual} is outside eligible bracket (${expected[0]}-${expected[1]} years)`;
      }
      if (op === '>=') {
        return passed
          ? `${symbol} Age ${actual} meets minimum age requirement of ${expected} years`
          : `${symbol} Age ${actual} is below minimum required age of ${expected} years`;
      }
      if (op === '<=') {
        return passed
          ? `${symbol} Age ${actual} is under maximum limit of ${expected} years`
          : `${symbol} Age ${actual} exceeds maximum limit of ${expected} years`;
      }
    }

    if (field === 'gender') {
      if (op === 'in') {
        return passed
          ? `${symbol} Gender requirement satisfied (${actual})`
          : `${symbol} Scheme requires gender: ${Array.isArray(expected) ? expected.join(', ') : expected}`;
      }
    }

    if (field === 'caste') {
      if (op === 'in') {
        return passed
          ? `${symbol} Social category eligible (${actual})`
          : `${symbol} Reserved for category: ${Array.isArray(expected) ? expected.join(', ') : expected}`;
      }
    }

    if (field === 'occupation') {
      if (op === 'in') {
        return passed
          ? `${symbol} Occupation verified as ${actual}`
          : `${symbol} Target occupation: ${Array.isArray(expected) ? expected.join(', ') : expected}`;
      }
    }

    if (field === 'disabilityPercentage') {
      return passed
        ? `${symbol} Disability of ${actual}% meets threshold of ≥ ${expected}%`
        : `${symbol} Disability of ${actual}% is below required threshold of ≥ ${expected}%`;
    }

    if (field === 'landHoldingAcres') {
      return passed
        ? `${symbol} Land holding ${actual} acres is within limit of ≤ ${expected} acres`
        : `${symbol} Land holding ${actual} acres exceeds maximum limit of ${expected} acres`;
    }

    // Default fallback explanation
    const readableOp = this.formatOperator(op);
    return passed
      ? `${symbol} ${fieldName} ${readableOp} ${this.formatValue(expected, field)} satisfied`
      : `${symbol} ${fieldName} must be ${readableOp} ${this.formatValue(expected, field)} (Current: ${this.formatValue(actual, field)})`;
  }

  private static formatFieldName(field: keyof UserProfile): string {
    return field
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, (str) => str.toUpperCase())
      .trim();
  }

  private static formatValue(val: any, field?: string): string {
    if (val === true) return 'Yes';
    if (val === false) return 'No';
    if (Array.isArray(val)) return val.join(', ');
    if (field === 'annualIncome' && typeof val === 'number') {
      return `₹${val.toLocaleString('en-IN')}`;
    }
    return String(val);
  }

  private static formatOperator(op: ComparisonOperator): string {
    switch (op) {
      case '==': return 'equal to';
      case '!=': return 'not equal to';
      case '<': return 'less than';
      case '<=': return 'at most';
      case '>': return 'greater than';
      case '>=': return 'at least';
      case 'in': return 'one of';
      case 'not_in': return 'not one of';
      case 'between': return 'between';
      case 'contains': return 'containing';
      default: return op;
    }
  }
}
