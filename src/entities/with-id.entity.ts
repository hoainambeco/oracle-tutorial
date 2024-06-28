import { newId } from 'src/utils';
import { BeforeInsert, Entity, PrimaryColumn } from 'typeorm';

type Constructor<T = Record<string, any>> = new (...args: any[]) => T;

export function WithId<TBase extends Constructor>(Base: TBase) {
  @Entity()
  class WithIdHost extends Base {
    @PrimaryColumn('char', { length: 21 })
    id: string;

    @BeforeInsert()
    async genId() {
      this.id = this.id ?? (await newId());
    }
  }

  return WithIdHost;
}
export class Empty {}
export class IdString extends WithId(Empty) {}
