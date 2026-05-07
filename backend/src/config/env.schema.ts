import { z } from 'zod';
import ms, { StringValue } from 'ms';

export const envSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
  BACKEND_PORT: z.coerce.number().default(3000),
  DATABASE_URL: z.url(),
  JWT_SECRET: z
    .string()
    .min(32, 'JWT_SECRET must be at least 32 characters long'),
  JWT_EXPIRES_IN: z
    .string()
    .default('1h')
    .refine(
      (val) => {
        try {
          return !!ms(val as StringValue);
        } catch {
          return false;
        }
      },
      { message: 'Invalid format for JWT_EXPIRES_IN (e.g., "1h", "7d")' },
    )
    .transform((v) => v as StringValue),
  CORS_ORIGIN: z.url().optional().default('http://localhost:3000'),
});
