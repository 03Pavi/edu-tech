import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateNotesTable1770197914004 implements MigrationInterface {
  name = 'CreateNotesTable1770197914004'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: "notes",
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
          name: "contentUrl",
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

    await queryRunner.createForeignKey("notes", new TableForeignKey({
      columnNames: ["courseId"],
      referencedColumnNames: ["id"],
      referencedTableName: "courses",
      onDelete: "NO ACTION"
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable("notes");
    const foreignKey = table!.foreignKeys.find(fk => fk.columnNames.indexOf("courseId") !== -1);
    await queryRunner.dropForeignKey("notes", foreignKey!);
    await queryRunner.dropTable("notes");
  }
}
