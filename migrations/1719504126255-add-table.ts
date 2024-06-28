import { MigrationInterface, QueryRunner } from "typeorm";

export class AddTable1719504126255 implements MigrationInterface {
    name = 'AddTable1719504126255'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "major" ("created_at" TIMESTAMP WITH LOCAL TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL, "updated_at" TIMESTAMP WITH LOCAL TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL, "deleted_at" TIMESTAMP WITH LOCAL TIME ZONE, "id" char(21) NOT NULL, "name" varchar2(255) NOT NULL, CONSTRAINT "PK_00341ff87e17ae50751c5da05ad" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "class_major" ("created_at" TIMESTAMP WITH LOCAL TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL, "updated_at" TIMESTAMP WITH LOCAL TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL, "deleted_at" TIMESTAMP WITH LOCAL TIME ZONE, "id" char(21) NOT NULL, "name" varchar2(255) NOT NULL, "major_id" char(21), CONSTRAINT "PK_b25d55ee76ce576225c7c65cc08" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "subject" ("created_at" TIMESTAMP WITH LOCAL TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL, "updated_at" TIMESTAMP WITH LOCAL TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL, "deleted_at" TIMESTAMP WITH LOCAL TIME ZONE, "id" char(21) NOT NULL, "name" varchar2(255), "major_id" char(21), CONSTRAINT "PK_12eee115462e38d62e5455fc054" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("created_at" TIMESTAMP WITH LOCAL TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL, "updated_at" TIMESTAMP WITH LOCAL TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL, "id" char(21) NOT NULL, "full_name" varchar2(255) DEFAULT '' NOT NULL, "code" varchar2(255) DEFAULT '' NOT NULL, "email" varchar2(255) DEFAULT '' NOT NULL, "password" varchar2(255) DEFAULT '' NOT NULL, "birth_date" TIMESTAMP WITH LOCAL TIME ZONE DEFAULT '', "gender" varchar2(255) DEFAULT 'male', "user_type" varchar2(255) DEFAULT 'student', "status" varchar2(255) DEFAULT 'INACTIVE', "class_major_id" char(21), CONSTRAINT "UQ_1f7a2b11e29b1422a2622beab36" UNIQUE ("code"), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "subject_score" ("created_at" TIMESTAMP WITH LOCAL TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL, "updated_at" TIMESTAMP WITH LOCAL TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL, "deleted_at" TIMESTAMP WITH LOCAL TIME ZONE, "id" char(21) NOT NULL, "score" float DEFAULT 0 NOT NULL, "name" varchar2(255), "coefficient" varchar2(255), "user_id" char(21), "subject_id" char(21), CONSTRAINT "PK_a81b962efa72faf143632e1771f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "class_major" ADD CONSTRAINT "FK_758a319447c98325bb9b45e2dee" FOREIGN KEY ("major_id") REFERENCES "major" ("id")`);
        await queryRunner.query(`ALTER TABLE "subject" ADD CONSTRAINT "FK_d491ab94b6e40f9964463816545" FOREIGN KEY ("major_id") REFERENCES "major" ("id")`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_baab9b63a40de87093279a1f3ea" FOREIGN KEY ("class_major_id") REFERENCES "class_major" ("id")`);
        await queryRunner.query(`ALTER TABLE "subject_score" ADD CONSTRAINT "FK_b74ef4744a8eed932085d615f5e" FOREIGN KEY ("user_id") REFERENCES "users" ("id")`);
        await queryRunner.query(`ALTER TABLE "subject_score" ADD CONSTRAINT "FK_203419503e12186341415b32dc6" FOREIGN KEY ("subject_id") REFERENCES "subject" ("id")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "subject_score" DROP CONSTRAINT "FK_203419503e12186341415b32dc6"`);
        await queryRunner.query(`ALTER TABLE "subject_score" DROP CONSTRAINT "FK_b74ef4744a8eed932085d615f5e"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_baab9b63a40de87093279a1f3ea"`);
        await queryRunner.query(`ALTER TABLE "subject" DROP CONSTRAINT "FK_d491ab94b6e40f9964463816545"`);
        await queryRunner.query(`ALTER TABLE "class_major" DROP CONSTRAINT "FK_758a319447c98325bb9b45e2dee"`);
        await queryRunner.query(`DROP TABLE "subject_score"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "subject"`);
        await queryRunner.query(`DROP TABLE "class_major"`);
        await queryRunner.query(`DROP TABLE "major"`);
    }

}
