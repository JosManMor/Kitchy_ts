import { config } from 'dotenv';
config();

export const PORT : string = process.env.BACKEND_PORT || '3000';
