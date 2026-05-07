import type { StringValue } from 'ms';

export type AppConfig = {
  port: number;
  database: {
    url: string;
  };
  auth: {
    jwtSecret: string;
    jwtExpiresIn: StringValue;
  };
  environment: 'development' | 'production' | 'test';
};
