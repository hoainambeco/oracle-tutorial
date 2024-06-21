import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddTableUser1718938852326 implements MigrationInterface {
  name = 'AddTableUser1718938852326';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "users" ("created_at" TIMESTAMP WITH LOCAL TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL, "updated_at" TIMESTAMP WITH LOCAL TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL, "id" char(21) NOT NULL, "username" varchar2(255) DEFAULT '' NOT NULL, "email" varchar2(255) DEFAULT '' NOT NULL, "password" varchar2(255) DEFAULT '' NOT NULL, "status" varchar2(255) DEFAULT 'INACTIVE', CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "users"`);
  }
}
