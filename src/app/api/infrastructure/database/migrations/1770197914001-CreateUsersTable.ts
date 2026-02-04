import { MigrationInterface, QueryRunner, Table, TableForeignKey, TableIndex, TableColumn } from "typeorm";

export class CreateUsersTable1770197914001 implements MigrationInterface {
  name = 'CreateUsersTable1770197914001'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TYPE "public"."users_role_enum" AS ENUM('admin', 'teacher', 'student')`);

    await queryRunner.createTable(new Table({
      name: "users",
      columns: [
        {
          name: "id",
          type: "serial",
          isPrimary: true
        },
        {
          name: "email",
          type: "varchar",
          isUnique: true,
          isNullable: false
        },
        {
          name: "name",
          type: "varchar",
          isNullable: true
        },
        {
          name: "role",
          type: "enum",
          enum: ["admin", "teacher", "student"],
          default: "'student'",
          isNullable: false
        },
        {
          name: "createdAt",
          type: "timestamp",
          default: "now()"
        },
        {
          name: "updatedAt",
          type: "timestamp",
          default: "now()"
        }
      ]
    }), true);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("users");
    await queryRunner.query(`DROP TYPE "public"."users_role_enum"`);
  }
}
