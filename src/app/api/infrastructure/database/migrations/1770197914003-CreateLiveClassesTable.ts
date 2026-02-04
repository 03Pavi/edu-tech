import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateLiveClassesTable1770197914003 implements MigrationInterface {
  name = 'CreateLiveClassesTable1770197914003'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: "live_classes",
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
          name: "startTime",
          type: "timestamp",
          isNullable: false
        },
        {
          name: "endTime",
          type: "timestamp",
          isNullable: false
        },
        {
          name: "meetingLink",
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
          name: "courseId",
          type: "integer",
          isNullable: true
        },
        {
          name: "instructorId",
          type: "integer",
          isNullable: true
        }
      ]
    }), true);

    await queryRunner.createForeignKey("live_classes", new TableForeignKey({
      columnNames: ["courseId"],
      referencedColumnNames: ["id"],
      referencedTableName: "courses",
      onDelete: "NO ACTION"
    }));

    await queryRunner.createForeignKey("live_classes", new TableForeignKey({
      columnNames: ["instructorId"],
      referencedColumnNames: ["id"],
      referencedTableName: "users",
      onDelete: "NO ACTION"
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable("live_classes");
    const foreignKeyCourse = table!.foreignKeys.find(fk => fk.columnNames.indexOf("courseId") !== -1);
    const foreignKeyInstructor = table!.foreignKeys.find(fk => fk.columnNames.indexOf("instructorId") !== -1);
    await queryRunner.dropForeignKey("live_classes", foreignKeyCourse!);
    await queryRunner.dropForeignKey("live_classes", foreignKeyInstructor!);
    await queryRunner.dropTable("live_classes");
  }
}
