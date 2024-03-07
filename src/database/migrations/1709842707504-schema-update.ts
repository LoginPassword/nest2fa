import { MigrationInterface, QueryRunner } from "typeorm";

export class SchemaUpdate1709842707504 implements MigrationInterface {
    name = 'SchemaUpdate1709842707504'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`refresh_token\` (\`id\` int NOT NULL AUTO_INCREMENT, \`userId\` int NOT NULL, \`token\` varchar(500) NOT NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_8e913e288156c133999341156a\` (\`userId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_8e913e288156c133999341156a\` ON \`refresh_token\``);
        await queryRunner.query(`DROP TABLE \`refresh_token\``);
    }

}
