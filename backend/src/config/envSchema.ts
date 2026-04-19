import { z } from 'zod';

const envSchema = z.object({
  BACKEND_PORT: z.coerce.number(),
  POSTGRES_HOST: z.string(),
  POSTGRES_USER: z.string(),
  POSTGRES_PASSWORD: z.string(),
  POSTGRES_DB: z.string(),
  CORS_ORIGIN: z.string(),
  NODE_ENV: z.enum(['development', 'production']),
});

export default envSchema;
