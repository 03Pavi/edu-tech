import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateCoursesTable1770197914002 implements MigrationInterface {
  name = 'CreateCoursesTable1770197914002'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: "courses",
      columns: [
        {
          name: "id",
          type: "serial",
          isPrimary: true
        },
        {
          name: "title",
          type: "varchar",
          isNullable: false
        },
        {
          name: "description",
          type: "text",
          isNullable: true
        },
        {
          name: "price",
          type: "integer",
          default: 0,
          isNullable: false
        },
        {
          name: "thumbnail",
          type: "varchar",
          isNullable: true
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
        },
        {
          name: "instructorId",
          type: "integer",
          isNullable: true
        }
      ]
    }), true);

    await queryRunner.createForeignKey("courses", new TableForeignKey({
      columnNames: ["instructorId"],
      referencedColumnNames: ["id"],
      referencedTableName: "users",
      onDelete: "NO ACTION"
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable("courses");
    const foreignKey = table!.foreignKeys.find(fk => fk.columnNames.indexOf("instructorId") !== -1);
    await queryRunner.dropForeignKey("courses", foreignKey!);
    await queryRunner.dropTable("courses");
  }
}
