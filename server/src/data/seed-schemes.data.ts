import { Scheme, DocumentInfo } from '@nagriklink/shared';

export const SEED_DOCUMENTS: DocumentInfo[] = [
  {
    id: 'doc-aadhaar',
    slug: 'aadhaar-card',
    name: 'Aadhaar Card',
    description: 'Unique Identification Authority of India (UIDAI) identity card linked to mobile number.',
    issuingAuthority: 'UIDAI (Unique Identification Authority of India)',
    downloadGuideUrl: 'https://myaadhaar.uidai.gov.in/',
    category: 'Identity Proof'
  },
  {
    id: 'doc-income',
    slug: 'income-certificate',
    name: 'Income Certificate (Tehsildar)',
    description: 'Official revenue document certifying annual family income from all sources.',
    issuingAuthority: 'Revenue Department / Sub-Divisional Magistrate (SDM) / Tehsildar',
    downloadGuideUrl: 'https://edistrict.gov.in/',
    category: 'Income Proof'
  },
  {
    id: 'doc-domicile',
    slug: 'domicile-certificate',
    name: 'Domicile / Residence Certificate',
    description: 'Proof of permanent residency in the state issued by the competent district authority.',
    issuingAuthority: 'District Magistrate / Revenue Department',
    downloadGuideUrl: 'https://edistrict.gov.in/',
    category: 'Residence Proof'
  },
  {
    id: 'doc-caste',
    slug: 'caste-certificate',
    name: 'Caste Certificate (SC/ST/OBC)',
    description: 'Official community certificate certifying caste status under constitutional orders.',
    issuingAuthority: 'Sub-Divisional Officer (SDO) / Tehsildar Office',
    downloadGuideUrl: 'https://services.india.gov.in/',
    category: 'Social Category'
  },
  {
    id: 'doc-bank-passbook',
    slug: 'bank-passbook',
    name: 'Bank Passbook / Cancelled Cheque',
    description: 'Bank account details with Aadhaar DBT (Direct Benefit Transfer) seed status active.',
    issuingAuthority: 'Scheduled Commercial Bank / Post Office Payment Bank',
    downloadGuideUrl: 'https://www.npci.org.in/',
    category: 'Banking'
  },
  {
    id: 'doc-ration-card',
    slug: 'ration-card',
    name: 'Ration Card (NFSA / BPL / AAY)',
    description: 'Food & Civil Supplies Department card showing household category and member count.',
    issuingAuthority: 'Department of Food, Civil Supplies & Consumer Affairs',
    downloadGuideUrl: 'https://nfsa.gov.in/',
    category: 'Economic Proof'
  },
  {
    id: 'doc-land-records',
    slug: 'land-records-khatauni',
    name: 'Land Ownership Records (ROR / Khatauni)',
    description: 'Record of Rights verifying agricultural land holding title and area in acres.',
    issuingAuthority: 'Revenue Department / Bhulekh Portal',
    downloadGuideUrl: 'https://dilrmp.gov.in/',
    category: 'Asset Proof'
  },
  {
    id: 'doc-disability',
    slug: 'disability-udid-card',
    name: 'UDID Card / Disability Certificate',
    description: 'Unique Disability ID card issued by the Chief Medical Officer (CMO) assessing disability percentage.',
    issuingAuthority: 'Department of Empowerment of Persons with Disabilities',
    downloadGuideUrl: 'https://www.swavlambancard.gov.in/',
    category: 'Medical'
  },
  {
    id: 'doc-marksheet-10',
    slug: 'marksheet-10th-12th',
    name: 'Academic Marksheet & Enrollment Proof',
    description: 'Secondary / Senior Secondary marksheet along with current college bona-fide certificate.',
    issuingAuthority: 'CBSE / State Examination Board / Recognized University',
    downloadGuideUrl: 'https://www.digilocker.gov.in/',
    category: 'Academics'
  },
  {
    id: 'doc-artisan-card',
    slug: 'pm-vishwakarma-artisan-id',
    name: 'PM Vishwakarma Artisan Digital ID',
    description: 'Verification card issued by Gram Panchayat / Urban Local Body recognizing traditional trade.',
    issuingAuthority: 'Ministry of Micro, Small and Medium Enterprises',
    downloadGuideUrl: 'https://pmvishwakarma.gov.in/',
    category: 'Trade'
  }
];

export const SEED_SCHEMES: Scheme[] = [
  {
    id: 'scheme-pm-kisan',
    title: 'PM-Kisan Samman Nidhi Yojana',
    slug: 'pm-kisan-samman-nidhi',
    shortDescription: 'Financial support of ₹6,000 per year in three equal installments to all landholding farmer families.',
    fullDescription: 'Pradhan Mantri Kisan Samman Nidhi (PM-KISAN) is a Central Sector scheme with 100% funding from the Government of India. Under the scheme, an income support of ₹6,000 per year is provided to all landholding farmer families across the country in three equal installments of ₹2,000 every four months directly into their Aadhaar-linked bank accounts.',
    category: 'AGRICULTURE',
    ministry: 'Ministry of Agriculture and Farmers Welfare',
    level: 'CENTRAL',
    state: null,
    benefitSummary: '₹6,000 / year (3 installments of ₹2,000)',
    financialValueAnnual: 6000,
    directApplyUrl: 'https://pmkisan.gov.in/',
    deadline: null,
    isAlwaysOpen: true,
    isActive: true,
    eligibilityRules: {
      logic: 'AND',
      conditions: [
        { field: 'occupation', operator: '==', value: 'FARMER', label: 'Primary occupation must be Farming' },
        { field: 'landHoldingAcres', operator: '>', value: 0, label: 'Must own cultivable agricultural land' }
      ]
    },
    documents: [
      { ...SEED_DOCUMENTS[0], isMandatory: true }, // Aadhaar
      { ...SEED_DOCUMENTS[4], isMandatory: true }, // Bank Passbook
      { ...SEED_DOCUMENTS[6], isMandatory: true }  // Land Records
    ],
    tags: ['Farmers', 'Direct Benefit Transfer', 'Central Sector']
  },
  {
    id: 'scheme-post-matric-sc',
    title: 'Post-Matric Scholarship for SC Students',
    slug: 'post-matric-scholarship-sc',
    shortDescription: 'Centrally sponsored scholarship covering complete tuition fee and monthly maintenance allowance for SC students.',
    fullDescription: 'Post Matric Scholarship scheme for Scheduled Castes is a Centrally Sponsored Scheme to provide financial assistance to SC students studying at post matriculation or post-secondary stage to enable them to complete their higher education.',
    category: 'EDUCATION',
    ministry: 'Ministry of Social Justice and Empowerment',
    level: 'CENTRAL',
    state: null,
    benefitSummary: '100% Tuition Fee + up to ₹13,500/year allowance',
    financialValueAnnual: 45000,
    directApplyUrl: 'https://scholarships.gov.in/',
    deadline: '2026-11-30T23:59:59Z',
    isAlwaysOpen: false,
    isActive: true,
    eligibilityRules: {
      logic: 'AND',
      conditions: [
        { field: 'isStudent', operator: '==', value: true, label: 'Enrolled in post-matric/college education' },
        { field: 'caste', operator: '==', value: 'SC', label: 'Must belong to Scheduled Caste (SC)' },
        { field: 'annualIncome', operator: '<=', value: 250000, label: 'Total family income must not exceed ₹2,50,000' }
      ]
    },
    documents: [
      { ...SEED_DOCUMENTS[0], isMandatory: true },
      { ...SEED_DOCUMENTS[1], isMandatory: true },
      { ...SEED_DOCUMENTS[3], isMandatory: true },
      { ...SEED_DOCUMENTS[4], isMandatory: true },
      { ...SEED_DOCUMENTS[8], isMandatory: true }
    ],
    tags: ['Scholarship', 'SC Students', 'Higher Education']
  },
  {
    id: 'scheme-ayushman-bharat',
    title: 'Ayushman Bharat PM-JAY (Health Card)',
    slug: 'ayushman-bharat-pm-jay',
    shortDescription: 'Cashless secondary and tertiary healthcare coverage of up to ₹5,00,000 per family per year.',
    fullDescription: 'Ayushman Bharat Pradhan Mantri Jan Arogya Yojana (PM-JAY) is the largest health assurance scheme in the world, providing a health cover of ₹5 Lakhs per family per year for secondary and tertiary care hospitalization to over 12 crore poor and vulnerable families.',
    category: 'HEALTHCARE',
    ministry: 'Ministry of Health and Family Welfare',
    level: 'CENTRAL',
    state: null,
    benefitSummary: '₹5,00,000 / family / year cashless hospital care',
    financialValueAnnual: 500000,
    directApplyUrl: 'https://beneficiary.nha.gov.in/',
    deadline: null,
    isAlwaysOpen: true,
    isActive: true,
    eligibilityRules: {
      logic: 'OR',
      conditions: [
        { field: 'isBpl', operator: '==', value: true, label: 'Identified under BPL / SECC deprivation criteria' },
        { field: 'rationCardType', operator: 'in', value: ['AAY', 'BPL_PHH'], label: 'Antyodaya or Priority Household Ration Card' },
        { field: 'annualIncome', operator: '<=', value: 250000, label: 'Annual household income ≤ ₹2,50,000' }
      ]
    },
    documents: [
      { ...SEED_DOCUMENTS[0], isMandatory: true },
      { ...SEED_DOCUMENTS[5], isMandatory: true }
    ],
    tags: ['Healthcare', 'Cashless Hospitalization', 'Insurance']
  },
  {
    id: 'scheme-pmay-urban',
    title: 'Pradhan Mantri Awas Yojana (PMAY-Urban)',
    slug: 'pm-awas-yojana-urban',
    shortDescription: 'Credit linked subsidy and housing financial aid up to ₹2.67 Lakh for pucca house construction.',
    fullDescription: 'PMAY-Urban addresses urban housing shortage among EWS/LIG and MIG categories by ensuring a pucca house to all eligible urban households. Includes interest subsidy on home loans and central assistance for house construction.',
    category: 'HOUSING',
    ministry: 'Ministry of Housing and Urban Affairs',
    level: 'CENTRAL',
    state: null,
    benefitSummary: 'Up to ₹2,67,000 interest subsidy / grant',
    financialValueAnnual: 267000,
    directApplyUrl: 'https://pmaymis.gov.in/',
    deadline: null,
    isAlwaysOpen: true,
    isActive: true,
    eligibilityRules: {
      logic: 'AND',
      conditions: [
        { field: 'area', operator: '==', value: 'URBAN', label: 'Residing in statutory town or urban area' },
        { field: 'annualIncome', operator: '<=', value: 600000, label: 'EWS or LIG annual income bracket (≤ ₹6,00,000)' }
      ]
    },
    documents: [
      { ...SEED_DOCUMENTS[0], isMandatory: true },
      { ...SEED_DOCUMENTS[1], isMandatory: true },
      { ...SEED_DOCUMENTS[2], isMandatory: true },
      { ...SEED_DOCUMENTS[4], isMandatory: true }
    ],
    tags: ['Housing', 'Urban', 'Subsidy']
  },
  {
    id: 'scheme-pmegp',
    title: "Prime Minister's Employment Generation Programme (PMEGP)",
    slug: 'pm-employment-generation-programme',
    shortDescription: 'Credit-linked subsidy programme providing up to 35% margin money subsidy on project loans up to ₹50 Lakh.',
    fullDescription: 'PMEGP is a major credit-linked subsidy programme aimed at generating self-employment opportunities through establishment of micro-enterprises in non-farm sector by helping traditional artisans and unemployed youth.',
    category: 'BUSINESS_LOANS',
    ministry: 'Ministry of Micro, Small and Medium Enterprises',
    level: 'CENTRAL',
    state: null,
    benefitSummary: 'Up to 35% capital subsidy on loans up to ₹50 Lakh',
    financialValueAnnual: 350000,
    directApplyUrl: 'https://www.kviconline.gov.in/pmegp/',
    deadline: null,
    isAlwaysOpen: true,
    isActive: true,
    eligibilityRules: {
      logic: 'AND',
      conditions: [
        { field: 'age', operator: '>=', value: 18, label: 'Minimum 18 years of age' },
        { field: 'occupation', operator: 'in', value: ['UNEMPLOYED', 'SELF_EMPLOYED', 'ARTISAN'], label: 'Aspiring entrepreneur, artisan, or unemployed' }
      ]
    },
    documents: [
      { ...SEED_DOCUMENTS[0], isMandatory: true },
      { ...SEED_DOCUMENTS[1], isMandatory: true },
      { ...SEED_DOCUMENTS[4], isMandatory: true },
      { ...SEED_DOCUMENTS[8], isMandatory: false }
    ],
    tags: ['Entrepreneurship', 'MSME', 'Subsidy Loan']
  },
  {
    id: 'scheme-pm-mudra',
    title: 'Pradhan Mantri Mudra Yojana (PMMY)',
    slug: 'pm-mudra-yojana',
    shortDescription: 'Collateral-free business loans up to ₹10 Lakh for non-corporate, non-farm small/micro enterprises.',
    fullDescription: 'PMMY facilitates micro credit/loans up to ₹10 Lakh to income generating micro enterprises categorized into Shishu (up to ₹50,000), Kishore (₹50,000 to ₹5 Lakh), and Tarun (₹5 Lakh to ₹10 Lakh).',
    category: 'BUSINESS_LOANS',
    ministry: 'Ministry of Finance',
    level: 'CENTRAL',
    state: null,
    benefitSummary: 'Collateral-free loan up to ₹10,00,000',
    financialValueAnnual: 200000,
    directApplyUrl: 'https://www.jansamarth.in/',
    deadline: null,
    isAlwaysOpen: true,
    isActive: true,
    eligibilityRules: {
      logic: 'AND',
      conditions: [
        { field: 'age', operator: '>=', value: 18, label: 'Age 18 years or above' },
        { field: 'occupation', operator: 'in', value: ['SELF_EMPLOYED', 'ARTISAN', 'DAILY_WAGE', 'UNEMPLOYED'], label: 'Micro-entrepreneur or artisan' }
      ]
    },
    documents: [
      { ...SEED_DOCUMENTS[0], isMandatory: true },
      { ...SEED_DOCUMENTS[4], isMandatory: true }
    ],
    tags: ['Mudra', 'Business Loan', 'Collateral Free']
  },
  {
    id: 'scheme-sukanya-samriddhi',
    title: 'Sukanya Samriddhi Yojana (Beti Bachao Beti Padhao)',
    slug: 'sukanya-samriddhi-yojana',
    shortDescription: 'High-interest (8.2%) government-backed savings scheme for girl child with complete tax exemption.',
    fullDescription: 'Sukanya Samriddhi Yojana is a small deposit scheme by the Ministry of Finance targeted at parents of girl children under the age of 10. It offers triple tax exemption (EEE) under Section 80C and a guaranteed sovereign return.',
    category: 'WOMEN_AND_CHILD',
    ministry: 'Ministry of Finance',
    level: 'CENTRAL',
    state: null,
    benefitSummary: '8.2% guaranteed interest + 100% Tax Exemption',
    financialValueAnnual: 50000,
    directApplyUrl: 'https://www.indiapost.gov.in/',
    deadline: null,
    isAlwaysOpen: true,
    isActive: true,
    eligibilityRules: {
      logic: 'AND',
      conditions: [
        { field: 'gender', operator: 'in', value: ['FEMALE'], label: 'Beneficiary must be female girl-child' },
        { field: 'age', operator: '<=', value: 10, label: 'Child age must be 10 years or younger' }
      ]
    },
    documents: [
      { ...SEED_DOCUMENTS[0], isMandatory: true },
      { ...SEED_DOCUMENTS[4], isMandatory: true }
    ],
    tags: ['Girl Child', 'High Interest', 'Savings']
  },
  {
    id: 'scheme-pm-svanidhi',
    title: 'PM Street Vendor’s AtmaNirbhar Nidhi (PM SVANidhi)',
    slug: 'pm-svanidhi-street-vendors',
    shortDescription: 'Collateral-free working capital micro-loans up to ₹50,000 with 7% interest subsidy for street vendors.',
    fullDescription: 'PM SVANidhi is a special micro-credit facility for providing affordable loans to street vendors to resume their livelihoods. Starts with ₹10,000 tranche, progressing to ₹20,000 and ₹50,000 upon timely repayment.',
    category: 'BUSINESS_LOANS',
    ministry: 'Ministry of Housing and Urban Affairs',
    level: 'CENTRAL',
    state: null,
    benefitSummary: '₹10,000 to ₹50,000 working capital loan + 7% subsidy',
    financialValueAnnual: 25000,
    directApplyUrl: 'https://pmsvanidhi.mohua.gov.in/',
    deadline: null,
    isAlwaysOpen: true,
    isActive: true,
    eligibilityRules: {
      logic: 'AND',
      conditions: [
        { field: 'occupation', operator: 'in', value: ['SELF_EMPLOYED', 'DAILY_WAGE'], label: 'Street vendor, hawker, or self-employed worker' },
        { field: 'area', operator: 'in', value: ['URBAN', 'SEMI_URBAN'], label: 'Operating in urban or semi-urban areas' }
      ]
    },
    documents: [
      { ...SEED_DOCUMENTS[0], isMandatory: true },
      { ...SEED_DOCUMENTS[4], isMandatory: true }
    ],
    tags: ['Street Vendors', 'Micro Credit', 'Interest Subsidy']
  },
  {
    id: 'scheme-atal-pension',
    title: 'Atal Pension Yojana (APY)',
    slug: 'atal-pension-yojana',
    shortDescription: 'Guaranteed monthly pension from ₹1,000 to ₹5,000 after age 60 for unorganized sector workers.',
    fullDescription: 'APY is a pension scheme focused on all citizens in the unorganized sector, administered by PFRDA. Subscribers receive a guaranteed minimum monthly pension of ₹1,000 to ₹5,000 after the age of 60.',
    category: 'SOCIAL_WELFARE',
    ministry: 'Ministry of Finance',
    level: 'CENTRAL',
    state: null,
    benefitSummary: 'Guaranteed ₹1,000 - ₹5,000 / month lifetime pension',
    financialValueAnnual: 60000,
    directApplyUrl: 'https://enps.nsdl.com/',
    deadline: null,
    isAlwaysOpen: true,
    isActive: true,
    eligibilityRules: {
      logic: 'AND',
      conditions: [
        { field: 'age', operator: 'between', value: [18, 40], label: 'Entry age must be between 18 and 40 years' },
        { field: 'occupation', operator: 'not_in', value: ['GOVERNMENT_EMPLOYEE'], label: 'Must not be a government employee with statutory pension' }
      ]
    },
    documents: [
      { ...SEED_DOCUMENTS[0], isMandatory: true },
      { ...SEED_DOCUMENTS[4], isMandatory: true }
    ],
    tags: ['Pension', 'Retirement', 'Unorganized Sector']
  },
  {
    id: 'scheme-nmmss',
    title: 'National Means-cum-Merit Scholarship Scheme (NMMSS)',
    slug: 'national-means-cum-merit-scholarship',
    shortDescription: 'Scholarship of ₹12,000 per annum for meritorious students of economically weaker sections from class 9 to 12.',
    fullDescription: 'NMMSS awards 100,000 scholarships to meritorious students of economically weaker sections to arrest their drop out at class 8 and encourage them to continue study at secondary stage.',
    category: 'EDUCATION',
    ministry: 'Ministry of Education',
    level: 'CENTRAL',
    state: null,
    benefitSummary: '₹12,000 / year for Class 9 to 12',
    financialValueAnnual: 12000,
    directApplyUrl: 'https://scholarships.gov.in/',
    deadline: '2026-10-31T23:59:59Z',
    isAlwaysOpen: false,
    isActive: true,
    eligibilityRules: {
      logic: 'AND',
      conditions: [
        { field: 'isStudent', operator: '==', value: true, label: 'Enrolled in school education' },
        { field: 'studentLevel', operator: 'in', value: ['SECONDARY', 'PRIMARY'], label: 'Studying in classes 8 through 12' },
        { field: 'annualIncome', operator: '<=', value: 350000, label: 'Parental annual income ≤ ₹3,50,000' }
      ]
    },
    documents: [
      { ...SEED_DOCUMENTS[0], isMandatory: true },
      { ...SEED_DOCUMENTS[1], isMandatory: true },
      { ...SEED_DOCUMENTS[4], isMandatory: true },
      { ...SEED_DOCUMENTS[8], isMandatory: true }
    ],
    tags: ['School Scholarship', 'Merit Based', 'Low Income']
  },
  {
    id: 'scheme-up-kanya-sumangala',
    title: 'Mukhyamantri Kanya Sumangala Yojana (Uttar Pradesh)',
    slug: 'mukhyamantri-kanya-sumangala-up',
    shortDescription: 'Financial assistance of ₹15,000 in six milestones from birth to graduation for girl children in UP.',
    fullDescription: 'An initiative by the Government of Uttar Pradesh to prevent female feticide, improve girl child education, and foster positive societal attitudes towards girls through phased conditional cash transfers.',
    category: 'WOMEN_AND_CHILD',
    ministry: 'Department of Women and Child Development, Govt of UP',
    level: 'STATE',
    state: 'UP',
    benefitSummary: '₹15,000 across 6 educational & health milestones',
    financialValueAnnual: 15000,
    directApplyUrl: 'https://mksy.up.gov.in/',
    deadline: null,
    isAlwaysOpen: true,
    isActive: true,
    eligibilityRules: {
      logic: 'AND',
      conditions: [
        { field: 'state', operator: '==', value: 'UP', label: 'Permanent domicile of Uttar Pradesh' },
        { field: 'gender', operator: '==', value: 'FEMALE', label: 'Female beneficiary' },
        { field: 'annualIncome', operator: '<=', value: 300000, label: 'Family income ≤ ₹3,00,000' }
      ]
    },
    documents: [
      { ...SEED_DOCUMENTS[0], isMandatory: true },
      { ...SEED_DOCUMENTS[1], isMandatory: true },
      { ...SEED_DOCUMENTS[2], isMandatory: true },
      { ...SEED_DOCUMENTS[4], isMandatory: true }
    ],
    tags: ['Uttar Pradesh', 'Girl Child', 'State Scheme']
  },
  {
    id: 'scheme-mp-ladli-behna',
    title: 'Mukhyamantri Ladli Behna Yojana (Madhya Pradesh)',
    slug: 'ladli-behna-yojana-mp',
    shortDescription: 'Monthly direct cash transfer of ₹1,250 to empower married/widowed women in Madhya Pradesh.',
    fullDescription: 'Government of Madhya Pradesh provides monthly financial assistance to improve women’s economic independence, health, and nutrition status directly into bank accounts via Aadhaar DBT.',
    category: 'WOMEN_AND_CHILD',
    ministry: 'Department of Women & Child Development, Govt of MP',
    level: 'STATE',
    state: 'MP',
    benefitSummary: '₹1,250 / month (₹15,000 / year) Direct Cash Transfer',
    financialValueAnnual: 15000,
    directApplyUrl: 'https://cmladlibahna.mp.gov.in/',
    deadline: null,
    isAlwaysOpen: true,
    isActive: true,
    eligibilityRules: {
      logic: 'AND',
      conditions: [
        { field: 'state', operator: '==', value: 'MP', label: 'Permanent resident of Madhya Pradesh' },
        { field: 'gender', operator: '==', value: 'FEMALE', label: 'Female applicant' },
        { field: 'age', operator: 'between', value: [21, 60], label: 'Age between 21 and 60 years' },
        { field: 'annualIncome', operator: '<=', value: 250000, label: 'Family annual income ≤ ₹2,50,000' }
      ]
    },
    documents: [
      { ...SEED_DOCUMENTS[0], isMandatory: true },
      { ...SEED_DOCUMENTS[2], isMandatory: true },
      { ...SEED_DOCUMENTS[4], isMandatory: true }
    ],
    tags: ['Madhya Pradesh', 'Women Empowerment', 'Direct Cash']
  },
  {
    id: 'scheme-pm-vishwakarma',
    title: 'PM Vishwakarma Kaushal Samman Yojana',
    slug: 'pm-vishwakarma-yojana',
    shortDescription: 'Skill training, ₹15,000 toolkit incentive, and collateral-free enterprise loan up to ₹3 Lakh at 5% interest.',
    fullDescription: 'Central Scheme to support traditional artisans and craftspeople engaged in 18 trades (blacksmiths, weavers, sculptors, carpenters, etc.) with recognized certificates, digital transaction incentives, and credit support.',
    category: 'SKILL_DEVELOPMENT',
    ministry: 'Ministry of Micro, Small and Medium Enterprises',
    level: 'CENTRAL',
    state: null,
    benefitSummary: '₹15,000 Toolkit + ₹3 Lakh credit at 5% interest',
    financialValueAnnual: 65000,
    directApplyUrl: 'https://pmvishwakarma.gov.in/',
    deadline: null,
    isAlwaysOpen: true,
    isActive: true,
    eligibilityRules: {
      logic: 'AND',
      conditions: [
        { field: 'occupation', operator: '==', value: 'ARTISAN', label: 'Engaged in recognized traditional craft or trade' },
        { field: 'age', operator: '>=', value: 18, label: 'Age 18 years or above' }
      ]
    },
    documents: [
      { ...SEED_DOCUMENTS[0], isMandatory: true },
      { ...SEED_DOCUMENTS[4], isMandatory: true },
      { ...SEED_DOCUMENTS[9], isMandatory: true }
    ],
    tags: ['Artisans', 'Skill Training', 'Toolkit']
  },
  {
    id: 'scheme-divyangjan',
    title: 'Divyangjan Swavalamban Yojana',
    slug: 'divyangjan-swavalamban-yojana',
    shortDescription: 'Concessional credit and loan assistance at subsidized interest rates (4%-8%) for Persons with Disabilities.',
    fullDescription: 'Administered by National Handicapped Finance and Development Corporation (NHFDC) to provide concessional financial assistance for self-employment ventures, higher education, and assistive aids.',
    category: 'SOCIAL_WELFARE',
    ministry: 'Ministry of Social Justice and Empowerment',
    level: 'CENTRAL',
    state: null,
    benefitSummary: 'Concessional loan up to ₹25 Lakh at 4%-8% interest',
    financialValueAnnual: 75000,
    directApplyUrl: 'http://www.nhfdc.nic.in/',
    deadline: null,
    isAlwaysOpen: true,
    isActive: true,
    eligibilityRules: {
      logic: 'AND',
      conditions: [
        { field: 'isPwD', operator: '==', value: true, label: 'Person with benchmark disability' },
        { field: 'disabilityPercentage', operator: '>=', value: 40, label: 'Disability percentage must be ≥ 40%' },
        { field: 'age', operator: '>=', value: 18, label: 'Minimum 18 years of age' }
      ]
    },
    documents: [
      { ...SEED_DOCUMENTS[0], isMandatory: true },
      { ...SEED_DOCUMENTS[4], isMandatory: true },
      { ...SEED_DOCUMENTS[7], isMandatory: true }
    ],
    tags: ['PwD', 'Disability Loan', 'Concessional Interest']
  },
  {
    id: 'scheme-ujjwala-2',
    title: 'Pradhan Mantri Ujjwala Yojana 2.0 (PMUY)',
    slug: 'pm-ujjwala-yojana-2',
    shortDescription: 'Free LPG gas connection with first refill and stove provided at zero deposit for poor households.',
    fullDescription: 'Provides clean cooking fuel like LPG to rural and deprived households to replace unhealthy biomass fuels. Special provisions for migrant workers with self-declaration of address.',
    category: 'SOCIAL_WELFARE',
    ministry: 'Ministry of Petroleum and Natural Gas',
    level: 'CENTRAL',
    state: null,
    benefitSummary: 'Free LPG Connection + First Refill + Gas Stove',
    financialValueAnnual: 4000,
    directApplyUrl: 'https://www.pmuy.gov.in/',
    deadline: null,
    isAlwaysOpen: true,
    isActive: true,
    eligibilityRules: {
      logic: 'AND',
      conditions: [
        { field: 'gender', operator: '==', value: 'FEMALE', label: 'Applicant must be an adult woman of the household' },
        { field: 'age', operator: '>=', value: 18, label: 'Minimum 18 years old' },
        { field: 'isBpl', operator: '==', value: true, label: 'Must belong to BPL, SC/ST, or SECC poor household' }
      ]
    },
    documents: [
      { ...SEED_DOCUMENTS[0], isMandatory: true },
      { ...SEED_DOCUMENTS[4], isMandatory: true },
      { ...SEED_DOCUMENTS[5], isMandatory: true }
    ],
    tags: ['LPG', 'Clean Energy', 'Women Health']
  },
  {
    id: 'scheme-standup-india',
    title: 'Stand-Up India Scheme for SC/ST and Women',
    slug: 'stand-up-india-scheme',
    shortDescription: 'Bank loans between ₹10 Lakh and ₹1 Crore for setting up greenfield enterprises in manufacturing, services or trading.',
    fullDescription: 'Facilitates bank loans between ₹10 Lakh and ₹1 Crore to at least one Scheduled Caste (SC) or Scheduled Tribe (ST) borrower and at least one woman borrower per bank branch for setting up greenfield enterprises.',
    category: 'BUSINESS_LOANS',
    ministry: 'Ministry of Finance',
    level: 'CENTRAL',
    state: null,
    benefitSummary: 'Bank loan from ₹10 Lakh to ₹1 Crore',
    financialValueAnnual: 500000,
    directApplyUrl: 'https://www.standupmitra.in/',
    deadline: null,
    isAlwaysOpen: true,
    isActive: true,
    eligibilityRules: {
      logic: 'AND',
      conditions: [
        { field: 'age', operator: '>=', value: 18, label: 'Age 18 or above' },
        {
          logic: 'OR',
          conditions: [
            { field: 'gender', operator: '==', value: 'FEMALE', label: 'Woman entrepreneur' },
            { field: 'caste', operator: 'in', value: ['SC', 'ST'], label: 'SC or ST community entrepreneur' }
          ]
        }
      ]
    },
    documents: [
      { ...SEED_DOCUMENTS[0], isMandatory: true },
      { ...SEED_DOCUMENTS[3], isMandatory: false },
      { ...SEED_DOCUMENTS[4], isMandatory: true }
    ],
    tags: ['Enterprise Loan', 'SC/ST', 'Women Entrepreneurs']
  },
  {
    id: 'scheme-begum-hazrat-mahal',
    title: 'Begum Hazrat Mahal National Scholarship for Minority Girls',
    slug: 'begum-hazrat-mahal-scholarship',
    shortDescription: 'Scholarship assistance of ₹5,000 to ₹6,000 per year for meritorious minority girl students in classes 9-12.',
    fullDescription: 'Funded by Maulana Azad Education Foundation under Ministry of Minority Affairs to assist girl students belonging to national minorities (Muslims, Christians, Sikhs, Buddhists, Jains, Parsis).',
    category: 'EDUCATION',
    ministry: 'Ministry of Minority Affairs',
    level: 'CENTRAL',
    state: null,
    benefitSummary: '₹6,000 / year direct scholarship',
    financialValueAnnual: 6000,
    directApplyUrl: 'https://scholarships.gov.in/',
    deadline: '2026-11-15T23:59:59Z',
    isAlwaysOpen: false,
    isActive: true,
    eligibilityRules: {
      logic: 'AND',
      conditions: [
        { field: 'gender', operator: '==', value: 'FEMALE', label: 'Beneficiary must be female' },
        { field: 'isMinority', operator: '==', value: true, label: 'Belongs to notified minority community' },
        { field: 'isStudent', operator: '==', value: true, label: 'Enrolled in school education' },
        { field: 'annualIncome', operator: '<=', value: 200000, label: 'Parental annual income ≤ ₹2,00,000' }
      ]
    },
    documents: [
      { ...SEED_DOCUMENTS[0], isMandatory: true },
      { ...SEED_DOCUMENTS[1], isMandatory: true },
      { ...SEED_DOCUMENTS[4], isMandatory: true },
      { ...SEED_DOCUMENTS[8], isMandatory: true }
    ],
    tags: ['Minority Scholarship', 'Girl Child', 'Education']
  },
  {
    id: 'scheme-kcc',
    title: 'Kisan Credit Card (KCC) Scheme',
    slug: 'kisan-credit-card-scheme',
    shortDescription: 'Adequate and timely credit support with interest subvention up to 3% for crop cultivation and livestock.',
    fullDescription: 'Provides hassle-free credit to farmers for crop production, post-harvest expenses, produce marketing, consumption requirements, and working capital for maintenance of farm assets.',
    category: 'AGRICULTURE',
    ministry: 'Ministry of Agriculture and Farmers Welfare',
    level: 'CENTRAL',
    state: null,
    benefitSummary: 'Revolving credit at subsidized 4% net interest rate',
    financialValueAnnual: 40000,
    directApplyUrl: 'https://pmkisan.gov.in/',
    deadline: null,
    isAlwaysOpen: true,
    isActive: true,
    eligibilityRules: {
      logic: 'AND',
      conditions: [
        { field: 'occupation', operator: '==', value: 'FARMER', label: 'Must be an active farmer or cultivator' },
        { field: 'age', operator: 'between', value: [18, 75], label: 'Age between 18 and 75 years' }
      ]
    },
    documents: [
      { ...SEED_DOCUMENTS[0], isMandatory: true },
      { ...SEED_DOCUMENTS[4], isMandatory: true },
      { ...SEED_DOCUMENTS[6], isMandatory: true }
    ],
    tags: ['Kisan Credit', 'Agriculture', 'Low Interest']
  },
  {
    id: 'scheme-ignoaps',
    title: 'Indira Gandhi National Old Age Pension Scheme (IGNOAPS)',
    slug: 'national-old-age-pension-scheme',
    shortDescription: 'Monthly old age pension of ₹500 to ₹1,000 for destitute senior citizens aged 60 and above living below poverty line.',
    fullDescription: 'Part of the National Social Assistance Programme (NSAP). BPL persons aged 60-79 years receive monthly central and state pension, increasing at age 80.',
    category: 'SOCIAL_WELFARE',
    ministry: 'Ministry of Rural Development',
    level: 'CENTRAL',
    state: null,
    benefitSummary: '₹6,000 to ₹12,000 / year monthly pension',
    financialValueAnnual: 12000,
    directApplyUrl: 'https://nsap.nic.in/',
    deadline: null,
    isAlwaysOpen: true,
    isActive: true,
    eligibilityRules: {
      logic: 'AND',
      conditions: [
        { field: 'age', operator: '>=', value: 60, label: 'Senior citizen aged 60 or above' },
        { field: 'isBpl', operator: '==', value: true, label: 'Belongs to Below Poverty Line (BPL) household' }
      ]
    },
    documents: [
      { ...SEED_DOCUMENTS[0], isMandatory: true },
      { ...SEED_DOCUMENTS[4], isMandatory: true },
      { ...SEED_DOCUMENTS[5], isMandatory: true }
    ],
    tags: ['Old Age Pension', 'Senior Citizens', 'NSAP']
  },
  {
    id: 'scheme-post-matric-obc',
    title: 'Post-Matric Scholarship for OBC Students',
    slug: 'post-matric-scholarship-obc',
    shortDescription: 'Financial assistance and course fee reimbursement for Other Backward Class students pursuing higher education.',
    fullDescription: 'Centrally Sponsored Scheme providing financial assistance to OBC students studying at post-matriculation or post-secondary stage in recognized colleges and universities.',
    category: 'EDUCATION',
    ministry: 'Ministry of Social Justice and Empowerment',
    level: 'CENTRAL',
    state: null,
    benefitSummary: 'Up to ₹20,000 / year tuition fee & maintenance allowance',
    financialValueAnnual: 20000,
    directApplyUrl: 'https://scholarships.gov.in/',
    deadline: '2026-11-30T23:59:59Z',
    isAlwaysOpen: false,
    isActive: true,
    eligibilityRules: {
      logic: 'AND',
      conditions: [
        { field: 'isStudent', operator: '==', value: true, label: 'Active enrolled student in post-matric studies' },
        { field: 'caste', operator: '==', value: 'OBC', label: 'Other Backward Class (OBC) category' },
        { field: 'annualIncome', operator: '<=', value: 250000, label: 'Family annual income ≤ ₹2,50,000' }
      ]
    },
    documents: [
      { ...SEED_DOCUMENTS[0], isMandatory: true },
      { ...SEED_DOCUMENTS[1], isMandatory: true },
      { ...SEED_DOCUMENTS[3], isMandatory: true },
      { ...SEED_DOCUMENTS[4], isMandatory: true },
      { ...SEED_DOCUMENTS[8], isMandatory: true }
    ],
    tags: ['OBC Scholarship', 'Higher Education', 'College']
  },
  {
    id: 'scheme-central-sector-university',
    title: 'Central Sector Scheme of Scholarships for College and University Students',
    slug: 'central-sector-scholarship-university',
    shortDescription: 'Merit-cum-means scholarship of ₹12,000/yr (UG) and ₹20,000/yr (PG) for students above 80th percentile.',
    fullDescription: 'Administered by Department of Higher Education for meritorious students pursuing regular courses in colleges and universities whose parental income is below ₹4.5 Lakh.',
    category: 'EDUCATION',
    ministry: 'Ministry of Education',
    level: 'CENTRAL',
    state: null,
    benefitSummary: '₹12,000 / year (UG) to ₹20,000 / year (PG)',
    financialValueAnnual: 20000,
    directApplyUrl: 'https://scholarships.gov.in/',
    deadline: '2026-12-15T23:59:59Z',
    isAlwaysOpen: false,
    isActive: true,
    eligibilityRules: {
      logic: 'AND',
      conditions: [
        { field: 'isStudent', operator: '==', value: true, label: 'Enrolled in full-time graduate or post-graduate degree' },
        { field: 'studentLevel', operator: 'in', value: ['UNDERGRADUATE', 'POSTGRADUATE'], label: 'Undergraduate or Postgraduate college student' },
        { field: 'annualIncome', operator: '<=', value: 450000, label: 'Family income ≤ ₹4,50,000 per annum' }
      ]
    },
    documents: [
      { ...SEED_DOCUMENTS[0], isMandatory: true },
      { ...SEED_DOCUMENTS[1], isMandatory: true },
      { ...SEED_DOCUMENTS[4], isMandatory: true },
      { ...SEED_DOCUMENTS[8], isMandatory: true }
    ],
    tags: ['University', 'College Scholarship', 'Merit Based']
  },
  {
    id: 'scheme-pm-matsya-sampada',
    title: 'Pradhan Mantri Matsya Sampada Yojana (PMMSY)',
    slug: 'pm-matsya-sampada-yojana',
    shortDescription: 'Government subsidy of 40% (General) to 60% (SC/ST/Women) on aquaculture projects and modern fishing gear.',
    fullDescription: 'Flagship scheme for focused and sustainable development of fisheries sector in the country with an estimated investment of ₹20,050 crores under Aatmanirbhar Bharat package.',
    category: 'AGRICULTURE',
    ministry: 'Ministry of Fisheries, Animal Husbandry and Dairying',
    level: 'CENTRAL',
    state: null,
    benefitSummary: '40% to 60% project subsidy up to ₹30 Lakh',
    financialValueAnnual: 180000,
    directApplyUrl: 'https://pmmsy.dof.gov.in/',
    deadline: null,
    isAlwaysOpen: true,
    isActive: true,
    eligibilityRules: {
      logic: 'AND',
      conditions: [
        { field: 'age', operator: '>=', value: 18, label: 'Age 18 years or older' },
        { field: 'occupation', operator: 'in', value: ['FARMER', 'SELF_EMPLOYED', 'ARTISAN'], label: 'Fishers, fish farmers, or aquaculture entrepreneurs' }
      ]
    },
    documents: [
      { ...SEED_DOCUMENTS[0], isMandatory: true },
      { ...SEED_DOCUMENTS[4], isMandatory: true },
      { ...SEED_DOCUMENTS[6], isMandatory: false }
    ],
    tags: ['Fisheries', 'Aquaculture', 'Subsidy']
  },
  {
    id: 'scheme-rythu-bharosa',
    title: 'Rythu Bharosa / Investment Support Scheme (Telangana & AP)',
    slug: 'rythu-bharosa-telangana-ap',
    shortDescription: 'Direct investment support of ₹10,000 to ₹13,500 per acre per year for agriculture inputs and seeds.',
    fullDescription: 'State direct benefit transfer scheme to support farmer investment in agriculture and horticulture crops during Kharif and Rabi seasons.',
    category: 'AGRICULTURE',
    ministry: 'Department of Agriculture, State Government',
    level: 'STATE',
    state: 'TG',
    benefitSummary: '₹10,000 to ₹13,500 / acre / year direct cash transfer',
    financialValueAnnual: 25000,
    directApplyUrl: 'https://rythubharosa.telangana.gov.in/',
    deadline: null,
    isAlwaysOpen: true,
    isActive: true,
    eligibilityRules: {
      logic: 'AND',
      conditions: [
        { field: 'occupation', operator: '==', value: 'FARMER', label: 'Primary occupation is agriculture' },
        { field: 'landHoldingAcres', operator: '>', value: 0, label: 'Must hold agricultural land in the state' },
        { field: 'state', operator: 'in', value: ['TG', 'AP'], label: 'Resident of Telangana or Andhra Pradesh' }
      ]
    },
    documents: [
      { ...SEED_DOCUMENTS[0], isMandatory: true },
      { ...SEED_DOCUMENTS[2], isMandatory: true },
      { ...SEED_DOCUMENTS[4], isMandatory: true },
      { ...SEED_DOCUMENTS[6], isMandatory: true }
    ],
    tags: ['State Scheme', 'Farmers', 'Crop Investment']
  },
  {
    id: 'scheme-kalia-odisha',
    title: 'KALIA Scheme (Krushak Assistance for Livelihood and Income Augmentation - Odisha)',
    slug: 'kalia-scheme-odisha',
    shortDescription: 'Financial assistance of ₹10,000/yr for small/marginal farmers and ₹12,500 for landless agricultural households in Odisha.',
    fullDescription: 'All-inclusive welfare scheme by Govt of Odisha accelerating agricultural prosperity and reducing poverty for both landholding farmers and landless agricultural laborers.',
    category: 'AGRICULTURE',
    ministry: 'Department of Agriculture and Farmers Empowerment, Govt of Odisha',
    level: 'STATE',
    state: 'OD',
    benefitSummary: '₹10,000 to ₹12,500 / year direct cash support',
    financialValueAnnual: 12500,
    directApplyUrl: 'https://kalia.odisha.gov.in/',
    deadline: null,
    isAlwaysOpen: true,
    isActive: true,
    eligibilityRules: {
      logic: 'AND',
      conditions: [
        { field: 'state', operator: '==', value: 'OD', label: 'Permanent resident of Odisha' },
        { field: 'occupation', operator: 'in', value: ['FARMER', 'DAILY_WAGE'], label: 'Small/marginal farmer or landless agricultural laborer' }
      ]
    },
    documents: [
      { ...SEED_DOCUMENTS[0], isMandatory: true },
      { ...SEED_DOCUMENTS[2], isMandatory: true },
      { ...SEED_DOCUMENTS[4], isMandatory: true }
    ],
    tags: ['Odisha', 'Agriculture', 'Landless Laborers']
  },
  {
    id: 'scheme-maharashtra-mjpjay',
    title: 'Mahatma Jyotirao Phule Jan Arogya Yojana (Maharashtra)',
    slug: 'mahatma-jyotirao-phule-jan-arogya-yojana',
    shortDescription: 'Comprehensive health cover of up to ₹5,00,000 per family per year for 996 medical procedures in Maharashtra.',
    fullDescription: 'Health insurance scheme by Govt of Maharashtra providing end-to-end cashless hospital treatment for low-income and vulnerable families through network hospitals across Maharashtra.',
    category: 'HEALTHCARE',
    ministry: 'Public Health Department, Govt of Maharashtra',
    level: 'STATE',
    state: 'MH',
    benefitSummary: '₹5,00,000 / family / year cashless hospitalization',
    financialValueAnnual: 500000,
    directApplyUrl: 'https://www.jeevandayee.gov.in/',
    deadline: null,
    isAlwaysOpen: true,
    isActive: true,
    eligibilityRules: {
      logic: 'AND',
      conditions: [
        { field: 'state', operator: '==', value: 'MH', label: 'Domicile of Maharashtra' },
        {
          logic: 'OR',
          conditions: [
            { field: 'isBpl', operator: '==', value: true, label: 'Holds Yellow/Orange BPL ration card' },
            { field: 'annualIncome', operator: '<=', value: 200000, label: 'Annual family income ≤ ₹2,00,000' }
          ]
        }
      ]
    },
    documents: [
      { ...SEED_DOCUMENTS[0], isMandatory: true },
      { ...SEED_DOCUMENTS[2], isMandatory: true },
      { ...SEED_DOCUMENTS[5], isMandatory: true }
    ],
    tags: ['Maharashtra', 'Healthcare', 'Cashless Hospitalization']
  },
  {
    id: 'scheme-naps',
    title: 'National Apprenticeship Promotion Scheme (NAPS)',
    slug: 'national-apprenticeship-promotion-scheme',
    shortDescription: 'Government stipend support up to ₹1,500/month along with industry apprenticeship training for youth.',
    fullDescription: 'NAPS aims to promote apprenticeship training across India by providing financial incentives to employers and direct stipend support to youth who have passed class 10, 12, ITI or Polytechnic diplomas.',
    category: 'SKILL_DEVELOPMENT',
    ministry: 'Ministry of Skill Development and Entrepreneurship',
    level: 'CENTRAL',
    state: null,
    benefitSummary: 'Stipend support up to ₹1,500 / month + Industry certification',
    financialValueAnnual: 18000,
    directApplyUrl: 'https://www.apprenticeshipindia.gov.in/',
    deadline: null,
    isAlwaysOpen: true,
    isActive: true,
    eligibilityRules: {
      logic: 'AND',
      conditions: [
        { field: 'age', operator: 'between', value: [16, 30], label: 'Age between 16 and 30 years' },
        { field: 'occupation', operator: 'in', value: ['STUDENT', 'UNEMPLOYED'], label: 'Youth seeking skill training or employment' }
      ]
    },
    documents: [
      { ...SEED_DOCUMENTS[0], isMandatory: true },
      { ...SEED_DOCUMENTS[4], isMandatory: true },
      { ...SEED_DOCUMENTS[8], isMandatory: true }
    ],
    tags: ['Skill Training', 'Apprenticeship', 'Youth Employment']
  }
];
