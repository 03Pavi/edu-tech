import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateTestSeriesTable1770197914006 implements MigrationInterface {
  name = 'CreateTestSeriesTable1770197914006'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: "test_series",
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
          name: "durationInMinutes",
          type: "integer",
          default: 0,
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
        },
        {
          name: "courseId",
          type: "integer",
          isNullable: true
        }
      ]
    }), true);

    await queryRunner.createForeignKey("test_series", new TableForeignKey({
      columnNames: ["courseId"],
      referencedColumnNames: ["id"],
      referencedTableName: "courses",
      onDelete: "NO ACTION"
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable("test_series");
    const foreignKey = table!.foreignKeys.find(fk => fk.columnNames.indexOf("courseId") !== -1);
    await queryRunner.dropForeignKey("test_series", foreignKey!);
    await queryRunner.dropTable("test_series");
  }
}
