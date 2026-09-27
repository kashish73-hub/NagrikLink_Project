import { createApp } from './app';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 5000;
const app = createApp();

app.listen(PORT, () => {
  console.log(`=========================================`);
  console.log(`🚀 NagrikLink Engine Running on port ${PORT}`);
  console.log(`   Healthcheck: http://localhost:${PORT}/api/health`);
  console.log(`   Schemes API: http://localhost:${PORT}/api/schemes`);
  console.log(`   Rule Engine: http://localhost:${PORT}/api/eligibility/evaluate`);
  console.log(`=========================================`);
});
