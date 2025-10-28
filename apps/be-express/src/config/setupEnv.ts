import dotenv from 'dotenv';
import nodePath from 'node:path';

if (process.env.NODE_ENV === 'production') {
  dotenv.config({
    path: [
      nodePath.resolve(process.cwd(), '.env'),
      nodePath.resolve(process.cwd(), '.env.production'),
      nodePath.resolve(process.cwd(), '.env.local'),
      nodePath.resolve(process.cwd(), '.env.production.local'),
    ],
  });
} else {
  dotenv.config({
    path: [
      nodePath.resolve(process.cwd(), '.env.development'),
      nodePath.resolve(process.cwd(), '.env.development.local'),
    ],
  });
}
