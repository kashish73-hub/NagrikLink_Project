# 🇮🇳 NagrikLink (नागरिक लिंक)
### *Aapka Haq, Aapka Adhikar — Citizen-First Indian Welfare & Scheme Eligibility Engine*

NagrikLink is an open civic-tech platform designed to eliminate the information asymmetry between Indian citizens and government welfare schemes. Using a high-precision deterministic rules engine, NagrikLink evaluates citizen profiles (demographics, income, occupation, land ownership, caste category, disability status) against government eligibility rules to deliver immediate, personalized entitlement discovery.

---

## 🌟 Key Highlights

- **⚡ Instant Eligibility Engine**: 100% client & server validated rule evaluation powered by compound boolean condition trees.
- **📚 25+ Seeded Central & State Schemes**: Ready with real criteria for PM-Kisan, Ayushman Bharat PM-JAY, Mudra Yojana, Post-Matric Scholarship, PM Awas Yojana, and more.
- **📋 Document Readiness Calculator**: Identifies required documents (Aadhaar, Income Certificate, Caste Certificate, Land Records) and assesses application readiness percentage before applying.
- **📌 Application Tracker**: Save and monitor scheme application status (`SAVED`, `IN_PROGRESS`, `APPLIED`) with guest token support—no friction login required.
- **🎨 Modern Responsive UI**: Built with React, Tailwind CSS, Framer Motion, Lucide icons, and confetti celebration on eligibility match.

---

## 🏗️ Architecture & Monorepo Structure

```
NagrikLink/
├── shared/              # Shared TypeScript interfaces, types, and Zod validation schemas
│   ├── src/
│   │   ├── types/       # User profile, scheme, document, and tracking interfaces
│   │   └── schemas/     # Zod runtime schema validators
├── server/              # Express + TypeScript backend API
│   ├── src/
│   │   ├── rules-engine/# Compound AST-style rule evaluation engine
│   │   ├── controllers/ # REST controllers (Eligibility, Schemes, Documents, Tracking)
│   │   ├── repositories/# In-memory repository with Postgres/Prisma persistence layer
│   │   └── data/        # Seed scheme definitions with rule criteria trees
├── client/              # React 19 + Vite + Tailwind CSS frontend application
│   ├── src/
│   │   ├── components/  # Modern UI components, persona presets, and cards
│   │   ├── services/    # Typed API client connecting to backend endpoints
│   │   └── store/       # Zustand reactive state store
└── docker-compose.yml   # Optional PostgreSQL 16 container definition
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18 or higher recommended)
- **npm** (v9 or higher)
- Optional: **Docker Desktop** (if running PostgreSQL locally)

### Quick Start

1. **Clone the repository:**
   ```bash
   git clone https://github.com/<your-username>/NagrikLink.git
   cd NagrikLink
   ```

2. **Install all dependencies:**
   ```bash
   npm install
   ```

3. **Build the shared package:**
   ```bash
   npm run build --workspace=shared
   ```

4. **Launch both Server and Client:**
   ```bash
   npm run dev
   ```

- 🌐 **Frontend**: `http://localhost:5173`
- ⚙️ **Backend API**: `http://localhost:5000`
- 🏥 **Healthcheck**: `http://localhost:5000/api/health`

---

## 🧪 Testing the Rule Engine

Run the built-in deterministic rule evaluation test suite:

```bash
npm run test:engine
```

---

## 🛡️ License

MIT License. Designed with ❤️ for public civic good.
