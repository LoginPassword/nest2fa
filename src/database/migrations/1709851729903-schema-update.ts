import { MigrationInterface, QueryRunner } from "typeorm";

export class SchemaUpdate1709851729903 implements MigrationInterface {
    name = 'SchemaUpdate1709851729903'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`news\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(500) NOT NULL, \`cover\` varchar(500) NOT NULL, \`description\` text NOT NULL, \`fullText\` text NOT NULL, \`status\` enum ('ACTIVE', 'HIDDEN', 'FAKE') NOT NULL, \`creatorId\` int NOT NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`news\``);
    }

}
