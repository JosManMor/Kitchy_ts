import { registerAs } from '@nestjs/config';
import { env } from './env.schema';

export default registerAs('app', () => ({
  port: env.BACKEND_PORT,
  environment: env.NODE_ENV,
  corsOrigin: env.CORS_ORIGIN,
}));
