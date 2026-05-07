import type { AppConfig } from './app-config.type';
import { envSchema } from './env.schema';

const env = envSchema.parse(process.env);

export default (): AppConfig => ({
  port: env.BACKEND_PORT,
  database: {
    url: env.DATABASE_URL,
  },
  auth: {
    jwtSecret: env.JWT_SECRET,
    jwtExpiresIn: env.JWT_EXPIRES_IN,
  },
  environment: env.NODE_ENV,
});
