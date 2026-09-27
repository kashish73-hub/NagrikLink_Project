import { z } from 'zod';
import { UserProfile } from './user-profile.types';

export type ComparisonOperator = 
  | '==' 
  | '!=' 
  | '<' 
  | '<=' 
  | '>' 
  | '>=' 
  | 'in' 
  | 'not_in' 
  | 'between' 
  | 'contains';

export const ComparisonOperatorSchema = z.enum([
  '==',
  '!=',
  '<',
  '<=',
  '>',
  '>=',
  'in',
  'not_in',
  'between',
  'contains'
]);

export interface BaseRuleCondition {
  field: keyof UserProfile;
  operator: ComparisonOperator;
  value: string | number | boolean | Array<string | number>;
  label?: string; // Descriptive human-friendly label e.g. "Annual Income ≤ ₹2,50,000"
  weight?: number; // Relative weight in confidence calculation (default: 1.0)
}

export interface CompoundRuleGroup {
  logic: 'AND' | 'OR' | 'NOR';
  conditions: Array<BaseRuleCondition | CompoundRuleGroup>;
}

export const BaseRuleConditionSchema: z.ZodType<BaseRuleCondition> = z.object({
  field: z.string() as z.ZodType<keyof UserProfile>,
  operator: ComparisonOperatorSchema,
  value: z.union([
    z.string(),
    z.number(),
    z.boolean(),
    z.array(z.union([z.string(), z.number()]))
  ]),
  label: z.string().optional(),
  weight: z.number().optional()
});

export const CompoundRuleGroupSchema: z.ZodType<CompoundRuleGroup> = z.lazy(() =>
  z.object({
    logic: z.enum(['AND', 'OR', 'NOR']),
    conditions: z.array(z.union([BaseRuleConditionSchema, CompoundRuleGroupSchema]))
  })
);

export interface ConditionEvaluationDetail {
  field: keyof UserProfile;
  operator: ComparisonOperator;
  expectedValue: any;
  actualValue: any;
  passed: boolean;
  reason: string;
}

export interface SchemeEvaluationResult {
  isEligible: boolean;
  confidenceScore: number; // 0 to 100
  matchedReasons: string[];
  unmatchedReasons: string[];
  details: ConditionEvaluationDetail[];
}
