import dotenv from 'dotenv';

const envFile = process.env.NODE_ENV === 'prod' ? '.env' : '.env.dev';

dotenv.config({
  path: envFile,
});
