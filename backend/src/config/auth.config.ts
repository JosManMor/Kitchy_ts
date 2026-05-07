import { registerAs } from '@nestjs/config';
import { env } from './env.schema';

export default registerAs('auth', () => ({
  jwtSecret: env.JWT_SECRET,
  jwtExpiresIn: env.JWT_EXPIRES_IN,
}));
