import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { UserProfile } from '@nagriklink/shared';

interface WizardState {
  currentStep: number;
  profile: UserProfile;
  isWizardCompleted: boolean;
  
  // Actions
  setStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  updateProfile: (partial: Partial<UserProfile>) => void;
  loadPreset: (presetName: 'student' | 'farmer' | 'entrepreneur' | 'senior') => void;
  resetWizard: () => void;
}

export const DEFAULT_PROFILE: UserProfile = {
  age: 21,
  gender: 'FEMALE',
  state: 'UP',
  area: 'RURAL',
  maritalStatus: 'SINGLE',
  annualIncome: 150000,
  isBpl: true,
  isEws: true,
  rationCardType: 'BPL_PHH',
  occupation: 'STUDENT',
  studentLevel: 'UNDERGRADUATE',
  isStudent: true,
  landHoldingAcres: 0,
  caste: 'OBC',
  isPwD: false,
  disabilityPercentage: 0,
  isMinority: false,
  minorityReligion: 'NONE',
  isSingleMother: false,
  isWidow: false,
  isOrphan: false
};

export const PRESET_PROFILES: Record<string, UserProfile> = {
  student: {
    age: 20,
    gender: 'FEMALE',
    state: 'UP',
    area: 'RURAL',
    maritalStatus: 'SINGLE',
    annualIncome: 120000,
    isBpl: true,
    isEws: true,
    rationCardType: 'BPL_PHH',
    occupation: 'STUDENT',
    studentLevel: 'UNDERGRADUATE',
    isStudent: true,
    landHoldingAcres: 0,
    caste: 'OBC',
    isPwD: false,
    disabilityPercentage: 0,
    isMinority: false,
    minorityReligion: 'NONE',
    isSingleMother: false,
    isWidow: false,
    isOrphan: false
  },
  farmer: {
    age: 42,
    gender: 'MALE',
    state: 'TG',
    area: 'RURAL',
    maritalStatus: 'MARRIED',
    annualIncome: 180000,
    isBpl: true,
    isEws: false,
    rationCardType: 'BPL_PHH',
    occupation: 'FARMER',
    studentLevel: 'NOT_STUDENT',
    isStudent: false,
    landHoldingAcres: 2.5,
    caste: 'GENERAL',
    isPwD: false,
    disabilityPercentage: 0,
    isMinority: false,
    minorityReligion: 'NONE',
    isSingleMother: false,
    isWidow: false,
    isOrphan: false
  },
  entrepreneur: {
    age: 29,
    gender: 'FEMALE',
    state: 'MH',
    area: 'URBAN',
    maritalStatus: 'MARRIED',
    annualIncome: 220000,
    isBpl: false,
    isEws: true,
    rationCardType: 'APL',
    occupation: 'SELF_EMPLOYED',
    studentLevel: 'NOT_STUDENT',
    isStudent: false,
    landHoldingAcres: 0,
    caste: 'SC',
    isPwD: false,
    disabilityPercentage: 0,
    isMinority: false,
    minorityReligion: 'NONE',
    isSingleMother: false,
    isWidow: false,
    isOrphan: false
  },
  senior: {
    age: 68,
    gender: 'MALE',
    state: 'MP',
    area: 'RURAL',
    maritalStatus: 'WIDOWED',
    annualIncome: 60000,
    isBpl: true,
    isEws: true,
    rationCardType: 'AAY',
    occupation: 'UNEMPLOYED',
    studentLevel: 'NOT_STUDENT',
    isStudent: false,
    landHoldingAcres: 0,
    caste: 'SC',
    isPwD: true,
    disabilityPercentage: 50,
    isMinority: false,
    minorityReligion: 'NONE',
    isSingleMother: false,
    isWidow: false,
    isOrphan: false
  }
};

export const useWizardStore = create<WizardState>()(
  persist(
    (set) => ({
      currentStep: 0,
      profile: DEFAULT_PROFILE,
      isWizardCompleted: false,

      setStep: (step: number) => set({ currentStep: Math.max(0, Math.min(3, step)) }),
      nextStep: () => set((state) => {
        const next = state.currentStep + 1;
        return {
          currentStep: Math.min(3, next),
          isWizardCompleted: next > 3 ? true : state.isWizardCompleted
        };
      }),
      prevStep: () => set((state) => ({ currentStep: Math.max(0, state.currentStep - 1) })),
      updateProfile: (partial) => set((state) => ({
        profile: { ...state.profile, ...partial }
      })),
      loadPreset: (presetName) => set({
        profile: PRESET_PROFILES[presetName],
        currentStep: 0
      }),
      resetWizard: () => set({
        currentStep: 0,
        profile: DEFAULT_PROFILE,
        isWizardCompleted: false
      })
    }),
    {
      name: 'nagriklink_wizard_state'
    }
  )
);
