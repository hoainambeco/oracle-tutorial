import { DataSourceOptions, LoggerOptions } from 'typeorm';
import { SnakeNamingStrategy } from './snake-naming.strategy';

function logForDevTest(): Exclude<LoggerOptions, boolean | 'all'> {
  if (['test', 'dev'].includes(process.env.NODE_ENV)) {
    return ['query'];
  }

  return [];
}
export function makeTypeormOptions(): DataSourceOptions {
  return {
    type: 'oracle',
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    sid: process.env.DB_SID,
    namingStrategy: new SnakeNamingStrategy(),
    logging: ['error', 'warn', ...logForDevTest()],
    entities: [],
  };
}
