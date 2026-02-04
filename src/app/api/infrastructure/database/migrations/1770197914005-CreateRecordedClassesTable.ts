import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateRecordedClassesTable1770197914005 implements MigrationInterface {
  name = 'CreateRecordedClassesTable1770197914005'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: "recorded_classes",
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
          name: "videoUrl",
          type: "varchar",
          isNullable: true
        },
        {
          name: "duration",
          type: "varchar",
          isNullable: true
        },
        {
          name: "description",
          type: "text",
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
          name: "courseId",
          type: "integer",
          isNullable: true
        }
      ]
    }), true);

    await queryRunner.createForeignKey("recorded_classes", new TableForeignKey({
      columnNames: ["courseId"],
      referencedColumnNames: ["id"],
      referencedTableName: "courses",
      onDelete: "NO ACTION"
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable("recorded_classes");
    const foreignKey = table!.foreignKeys.find(fk => fk.columnNames.indexOf("courseId") !== -1);
    await queryRunner.dropForeignKey("recorded_classes", foreignKey!);
    await queryRunner.dropTable("recorded_classes");
  }
}
