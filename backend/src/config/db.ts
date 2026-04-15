import { createPool } from 'mysql2/promise';
import env from './config.js';

// Application user pool (least privileges)
const pool = createPool({
  host: env.DB_HOST,
  user: env.DB_USER_APP,
  password: env.DB_PASSWORD_APP,
  database: env.DB_NAME,
  waitForConnections: true,
});

export default pool; // default for backward compatibility
