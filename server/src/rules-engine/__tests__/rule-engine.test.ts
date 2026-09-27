import { DeterministicRuleEngine } from '../DeterministicRuleEngine';
import { UserProfile, CompoundRuleGroup } from '@nagriklink/shared';

function runTests() {
  console.log('🧪 Starting Deterministic Rule Engine Test Suite...\n');
  let passedCount = 0;
  let failedCount = 0;

  function assert(condition: boolean, testName: string, extra?: any) {
    if (condition) {
      console.log(`  ✅ PASS: ${testName}`);
      passedCount++;
    } else {
      console.error(`  ❌ FAIL: ${testName}`, extra ? extra : '');
      failedCount++;
    }
  }

  // Mock User Profile: Female Student from Uttar Pradesh, Low Income
  const profileStudentUP: UserProfile = {
    age: 20,
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

  // Test Case 1: Post-Matric Scholarship (Income <= 250,000, State in ['UP', 'All'], Student = true)
  const scholarshipRule: CompoundRuleGroup = {
    logic: 'AND',
    conditions: [
      { field: 'annualIncome', operator: '<=', value: 250000, label: 'Annual income <= 2.5L' },
      { field: 'state', operator: 'in', value: ['UP', 'ALL'], label: 'Resident of UP or Central' },
      { field: 'isStudent', operator: '==', value: true, label: 'Currently enrolled student' },
      { field: 'caste', operator: 'in', value: ['SC', 'ST', 'OBC'], label: 'SC/ST/OBC category' }
    ]
  };

  const eval1 = DeterministicRuleEngine.evaluateScheme(profileStudentUP, scholarshipRule);
  assert(eval1.isEligible === true, 'Profile matches Post-Matric Scholarship criteria');
  assert(eval1.confidenceScore === 100, 'Confidence score is 100% for full match');
  assert(eval1.matchedReasons.length === 4, 'All 4 condition reasons are generated');

  // Test Case 2: Farmer Scheme (PM Kisan - land <= 5 acres, occupation == FARMER)
  const pmKisanRule: CompoundRuleGroup = {
    logic: 'AND',
    conditions: [
      { field: 'occupation', operator: '==', value: 'FARMER', label: 'Primary occupation is Farming' },
      { field: 'landHoldingAcres', operator: '>', value: 0, label: 'Must own cultivable land' }
    ]
  };

  const eval2 = DeterministicRuleEngine.evaluateScheme(profileStudentUP, pmKisanRule);
  assert(eval2.isEligible === false, 'Student profile should NOT match PM-Kisan scheme');
  assert(eval2.unmatchedReasons.length > 0, 'Unmatched reasons properly logged');

  // Test Case 3: Universal Scheme (Ayushman Bharat - Income <= 300,000 OR isBpl == true)
  const ayushmanRule: CompoundRuleGroup = {
    logic: 'OR',
    conditions: [
      { field: 'isBpl', operator: '==', value: true, label: 'BPL Card Holder' },
      { field: 'annualIncome', operator: '<=', value: 120000, label: 'Economically vulnerable' }
    ]
  };

  const eval3 = DeterministicRuleEngine.evaluateScheme(profileStudentUP, ayushmanRule);
  assert(eval3.isEligible === true, 'Matches OR logic when at least one condition passes');

  // Test Case 4: Age Range Between operator (18 to 35)
  const youthSchemeRule: CompoundRuleGroup = {
    logic: 'AND',
    conditions: [
      { field: 'age', operator: 'between', value: [18, 35], label: 'Age between 18 and 35' }
    ]
  };

  const eval4 = DeterministicRuleEngine.evaluateScheme(profileStudentUP, youthSchemeRule);
  assert(eval4.isEligible === true, 'Age 20 is between 18 and 35');

  // Test Case 5: Over-age rejection
  const elderlyProfile: UserProfile = { ...profileStudentUP, age: 65 };
  const eval5 = DeterministicRuleEngine.evaluateScheme(elderlyProfile, youthSchemeRule);
  assert(eval5.isEligible === false, 'Age 65 fails 18-35 range check');

  console.log(`\nResults: ${passedCount} passed, ${failedCount} failed.`);
  if (failedCount > 0) {
    process.exit(1);
  }
}

runTests();
