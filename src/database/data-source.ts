import { DataSource } from 'typeorm';

import 'dotenv/config';
import { User } from './entities/user';
import { SentSms } from './entities/Sent-sms';
import { RefreshToken } from './entities/Refresh-token';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.MYSQL_HOST,
  port: Number(process.env.MYSQL_PORT),
  database: process.env.MYSQL_DATABASE,
  username: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASSWORD,
  timezone: 'Z',

  entities: [User, SentSms, RefreshToken],
  migrations: ['src/database/migrations/*.ts'],
});
