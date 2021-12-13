import dotenv from 'dotenv';
import path from 'path';

dotenv.config();
const ENV_TYPE = process.env.NODE_ENV;
const newPath = path.resolve(process.cwd(), ENV_TYPE ? `.env.${ENV_TYPE}` : '.env');
dotenv.config({ path: newPath });

export default Object.freeze({
  ENV_TYPE,
  ENCRYPTION_KEY: process.env.ENCRYPTION_KEY,
  ENCRYPTION_SALT: process.env.ENCRYPTION_SALT,
  API_BASE_URL: process.env.API_BASE_URL,
  WEB_BASE_URL: process.env.WEB_BASE_URL,
});
