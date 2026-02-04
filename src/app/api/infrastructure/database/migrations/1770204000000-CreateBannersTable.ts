import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateBannersTable1770204000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "banners",
        columns: [
          {
            name: "id",
            type: "serial",
            isPrimary: true,
          },
          {
            name: "text",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "link",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "buttonText",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "isActive",
            type: "boolean",
            default: true,
          },
          {
            name: "backgroundColor",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "textColor",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "createdAt",
            type: "timestamp",
            default: "now()",
          },
          {
            name: "updatedAt",
            type: "timestamp",
            default: "now()",
          },
        ],
      }),
      true
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("banners");
  }
}
