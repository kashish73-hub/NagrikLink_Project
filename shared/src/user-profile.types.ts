import { z } from 'zod';

export const GenderSchema = z.enum(['MALE', 'FEMALE', 'TRANSGENDER', 'OTHER']);
export type Gender = z.infer<typeof GenderSchema>;

export const AreaTypeSchema = z.enum(['URBAN', 'RURAL', 'SEMI_URBAN']);
export type AreaType = z.infer<typeof AreaTypeSchema>;

export const RationCardTypeSchema = z.enum(['NONE', 'AAY', 'BPL_PHH', 'APL', 'ANNAPURNA']);
export type RationCardType = z.infer<typeof RationCardTypeSchema>;

export const OccupationTypeSchema = z.enum([
  'STUDENT',
  'FARMER',
  'ARTISAN',
  'SELF_EMPLOYED',
  'DAILY_WAGE',
  'UNEMPLOYED',
  'PRIVATE_SECTOR',
  'GOVERNMENT_EMPLOYEE'
]);
export type OccupationType = z.infer<typeof OccupationTypeSchema>;

export const StudentLevelSchema = z.enum([
  'PRIMARY',
  'SECONDARY',
  'HIGHER_SECONDARY',
  'UNDERGRADUATE',
  'POSTGRADUATE',
  'DOCTORATE',
  'DIPLOMA_VOCATIONAL',
  'NOT_STUDENT'
]);
export type StudentLevel = z.infer<typeof StudentLevelSchema>;

export const CasteCategorySchema = z.enum(['GENERAL', 'OBC', 'SC', 'ST', 'EWS']);
export type CasteCategory = z.infer<typeof CasteCategorySchema>;

export const MinorityReligionSchema = z.enum([
  'NONE',
  'MUSLIM',
  'CHRISTIAN',
  'SIKH',
  'BUDDHIST',
  'JAIN',
  'PARSI'
]);
export type MinorityReligion = z.infer<typeof MinorityReligionSchema>;

// Complete Zod Schema for User Profile evaluation & questionnaire validation
export const UserProfileSchema = z.object({
  // Demographics
  age: z.number().min(0).max(120),
  gender: GenderSchema,
  state: z.string().min(2),
  area: AreaTypeSchema.default('RURAL'),
  maritalStatus: z.enum(['SINGLE', 'MARRIED', 'WIDOWED', 'DIVORCED']).default('SINGLE'),

  // Economic Profile
  annualIncome: z.number().min(0),
  isBpl: z.boolean().default(false),
  isEws: z.boolean().default(false),
  rationCardType: RationCardTypeSchema.default('NONE'),

  // Occupation & Academics
  occupation: OccupationTypeSchema,
  studentLevel: StudentLevelSchema.default('NOT_STUDENT'),
  isStudent: z.boolean().default(false),
  landHoldingAcres: z.number().min(0).default(0),

  // Special Categories
  caste: CasteCategorySchema.default('GENERAL'),
  isPwD: z.boolean().default(false),
  disabilityPercentage: z.number().min(0).max(100).default(0),
  isMinority: z.boolean().default(false),
  minorityReligion: MinorityReligionSchema.default('NONE'),
  isSingleMother: z.boolean().default(false),
  isWidow: z.boolean().default(false),
  isOrphan: z.boolean().default(false)
});

export type UserProfile = z.infer<typeof UserProfileSchema>;

// Partial profile for step-by-step wizard saving
export const PartialUserProfileSchema = UserProfileSchema.partial();
export type PartialUserProfile = z.infer<typeof PartialUserProfileSchema>;
