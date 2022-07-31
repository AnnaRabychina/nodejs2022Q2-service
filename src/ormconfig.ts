import * as dotenv from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';

dotenv.config();

export const configService: DataSourceOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST as string,
  port: +process.env.POSTGRES_PORT as number,
  username: process.env.POSTGRES_USER as string,
  password: process.env.POSTGRES_PASSWORD as string,
  database: process.env.POSTGRES_DB as string,
  entities: ['./dist/**/*.entity.js'],
  migrations: ['./dist/migrations/*.js'],
  synchronize: false,
};

export const dataSource: DataSource = new DataSource(configService);
