import { MigrationInterface, QueryRunner } from "typeorm";

export class SchemaUpdate1709831589410 implements MigrationInterface {
    name = 'SchemaUpdate1709831589410'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`sent_sms\` (\`id\` int NOT NULL AUTO_INCREMENT, \`phone\` varchar(100) NOT NULL, \`code\` int NOT NULL, \`used\` tinyint NOT NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_3a240416eb47b9e1eb70f5377e\` (\`phone\`, \`code\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_3a240416eb47b9e1eb70f5377e\` ON \`sent_sms\``);
        await queryRunner.query(`DROP TABLE \`sent_sms\``);
    }

}
