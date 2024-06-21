import { DataSource } from 'typeorm';
import { Users } from '../entities';
import { makeTypeormOptions } from './helper';

export default new DataSource({
  ...makeTypeormOptions(),
  migrations: ['migrations/*{.ts,.js}'],
  entities: [Users],
});
