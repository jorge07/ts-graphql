import {MigrationInterface, QueryRunner} from "typeorm";

export class Events1533235342184 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`
            CREATE TABLE "events" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "uuid" uuid NOT NULL,
                "playhead" float NOT NULL,
                "event" jsonb NOT NULL,
                "metadata" jsonb NOT NULL,
                "ocurrendOn" TIMESTAMP WITH TIME ZONE NOT NULL,
                "eventType" character varying NOT NULL,
                CONSTRAINT "PK_40731c7151fe4be3116e45ddf73"
                PRIMARY KEY ("id")
            )`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DROP TABLE "events"`);
    }

}
