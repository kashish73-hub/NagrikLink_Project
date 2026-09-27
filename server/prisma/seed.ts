import { PrismaClient } from '@prisma/client';
import { SEED_DOCUMENTS, SEED_SCHEMES } from '../src/data/seed-schemes.data';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting NagrikLink Database Seeder...');

  // 1. Seed Documents
  console.log(`Inserting ${SEED_DOCUMENTS.length} official documents...`);
  for (const doc of SEED_DOCUMENTS) {
    await prisma.document.upsert({
      where: { slug: doc.slug },
      update: {
        name: doc.name,
        description: doc.description,
        issuingAuthority: doc.issuingAuthority,
        downloadGuideUrl: doc.downloadGuideUrl
      },
      create: {
        id: doc.id,
        slug: doc.slug,
        name: doc.name,
        description: doc.description,
        issuingAuthority: doc.issuingAuthority,
        downloadGuideUrl: doc.downloadGuideUrl
      }
    });
  }

  // 2. Seed Schemes
  console.log(`Inserting ${SEED_SCHEMES.length} welfare schemes...`);
  for (const scheme of SEED_SCHEMES) {
    await prisma.scheme.upsert({
      where: { slug: scheme.slug },
      update: {
        title: scheme.title,
        shortDescription: scheme.shortDescription,
        fullDescription: scheme.fullDescription,
        category: scheme.category as any,
        ministry: scheme.ministry,
        level: scheme.level as any,
        state: scheme.state,
        benefitSummary: scheme.benefitSummary,
        financialValueAnnual: scheme.financialValueAnnual,
        directApplyUrl: scheme.directApplyUrl,
        deadline: scheme.deadline ? new Date(scheme.deadline) : null,
        isAlwaysOpen: scheme.isAlwaysOpen,
        eligibilityRules: scheme.eligibilityRules as any,
        isActive: scheme.isActive
      },
      create: {
        id: scheme.id,
        slug: scheme.slug,
        title: scheme.title,
        shortDescription: scheme.shortDescription,
        fullDescription: scheme.fullDescription,
        category: scheme.category as any,
        ministry: scheme.ministry,
        level: scheme.level as any,
        state: scheme.state,
        benefitSummary: scheme.benefitSummary,
        financialValueAnnual: scheme.financialValueAnnual,
        directApplyUrl: scheme.directApplyUrl,
        deadline: scheme.deadline ? new Date(scheme.deadline) : null,
        isAlwaysOpen: scheme.isAlwaysOpen,
        eligibilityRules: scheme.eligibilityRules as any,
        isActive: scheme.isActive
      }
    });

    // Seed SchemeDocument links
    if (scheme.documents) {
      for (const doc of scheme.documents) {
        await prisma.schemeDocument.upsert({
          where: {
            schemeId_documentId: {
              schemeId: scheme.id,
              documentId: doc.id
            }
          },
          update: {
            isMandatory: doc.isMandatory ?? true
          },
          create: {
            schemeId: scheme.id,
            documentId: doc.id,
            isMandatory: doc.isMandatory ?? true
          }
        });
      }
    }
  }

  console.log('✅ Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
