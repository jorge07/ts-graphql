import {MigrationInterface, QueryRunner} from "typeorm";

export class Events1533236608525 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "events" DROP COLUMN "playhead"`);
        await queryRunner.query(`ALTER TABLE "events" ADD "playhead" float`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "events" DROP COLUMN "playhead"`);
        await queryRunner.query(`ALTER TABLE "events" ADD "playhead" double precision NOT NULL`);
    }

}
