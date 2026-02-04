import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateQuestionsTable1770197914007 implements MigrationInterface {
  name = 'CreateQuestionsTable1770197914007'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: "questions",
      columns: [
        {
          name: "id",
          type: "serial",
          isPrimary: true
        },
        {
          name: "text",
          type: "text",
          isNullable: false
        },
        {
          name: "options",
          type: "json",
          isNullable: false
        },
        {
          name: "correctAnswer",
          type: "varchar",
          isNullable: false
        },
        {
          name: "explanation",
          type: "text",
          isNullable: true
        },
        {
          name: "testSeriesId",
          type: "integer",
          isNullable: true
        }
      ]
    }), true);

    await queryRunner.createForeignKey("questions", new TableForeignKey({
      columnNames: ["testSeriesId"],
      referencedColumnNames: ["id"],
      referencedTableName: "test_series",
      onDelete: "NO ACTION"
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable("questions");
    const foreignKey = table!.foreignKeys.find(fk => fk.columnNames.indexOf("testSeriesId") !== -1);
    await queryRunner.dropForeignKey("questions", foreignKey!);
    await queryRunner.dropTable("questions");
  }
}
