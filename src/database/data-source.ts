import { DataSource } from 'typeorm';

import 'dotenv/config';
import { User } from './entities/user';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.MYSQL_HOST,
  port: Number(process.env.MYSQL_PORT),
  database: process.env.MYSQL_DATABASE,
  username: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASSWORD,

  entities: [User],
  migrations: ['src/database/migrations/*.ts'],
});
