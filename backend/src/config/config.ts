import { config } from 'dotenv';
import envSchema from '../schema/envSchema.js';

config();

function validateEnv() {
  const parsed = envSchema.safeParse(process.env);

  if (!parsed.success) {
    console.error(parsed.error.format());
    throw new Error('Invalid environment variables');
  }

  return parsed.data;
}

export default validateEnv();
