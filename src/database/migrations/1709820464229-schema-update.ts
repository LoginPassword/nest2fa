import { MigrationInterface, QueryRunner } from "typeorm";

export class SchemaUpdate1709820464229 implements MigrationInterface {
    name = 'SchemaUpdate1709820464229'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`email\` varchar(500) NOT NULL, \`phone\` varchar(100) NOT NULL, \`passwordHash\` varchar(100) NOT NULL, \`role\` enum ('user', 'moderator', 'admin') NOT NULL, \`status\` enum ('active', 'ban') NOT NULL, UNIQUE INDEX \`IDX_8e1f623798118e629b46a9e629\` (\`phone\`), UNIQUE INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` ON \`user\``);
        await queryRunner.query(`DROP INDEX \`IDX_8e1f623798118e629b46a9e629\` ON \`user\``);
        await queryRunner.query(`DROP TABLE \`user\``);
    }

}
