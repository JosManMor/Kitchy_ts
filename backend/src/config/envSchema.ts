import { z } from 'zod';

const envSchema = z.object({
  BACKEND_PORT: z.coerce.number(),
  DB_HOST: z.string(),
  DB_USER_APP: z.string(),
  DB_PASSWORD_APP: z.string(),
  DB_NAME: z.string(),
  CORS_ORIGIN: z.string(),
  NODE_ENV: z.enum(['development', 'production']),
});

export default envSchema;
