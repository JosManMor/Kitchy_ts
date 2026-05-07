import { registerAs } from '@nestjs/config';
import { env } from './env.schema';

export default registerAs('database', () => ({
  url: env.DATABASE_URL,
}));
