import { MigrationInterface, QueryRunner } from 'typeorm';

export class UsersSeed1709855221523 implements MigrationInterface {
  name = 'UsersSeed1709855221523';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO user (email, phone, passwordHash, role, status) VALUES ('admin@mail.com', '01', '$2b$10$yMvdOZDimzVinJpTPF9Ag.9oNgWD8qD.FRPJGHt79z66G/k2L6jgm', 'ADMIN', 'ACTIVE')`,
    );
    await queryRunner.query(
      `INSERT INTO user (email, phone, passwordHash, role, status) VALUES ('moderator@mail.com', '02', '$2b$10$yMvdOZDimzVinJpTPF9Ag.9oNgWD8qD.FRPJGHt79z66G/k2L6jgm', 'MODERATOR', 'ACTIVE')`,
    );
    await queryRunner.query(
      `INSERT INTO user (email, phone, passwordHash, role, status) VALUES ('user@mail.com', '03', '$2b$10$yMvdOZDimzVinJpTPF9Ag.9oNgWD8qD.FRPJGHt79z66G/k2L6jgm', 'USER', 'ACTIVE')`,
    );
  }

  public async down(): Promise<void> {
    // empty
  }
}
