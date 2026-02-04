import { MigrationInterface, QueryRunner, Table, TableForeignKey, TableIndex } from "typeorm";

export class CreateCourseEnrollmentsTable1770197914008 implements MigrationInterface {
  name = 'CreateCourseEnrollmentsTable1770197914008'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: "course_enrollments",
      columns: [
        {
          name: "coursesId",
          type: "integer",
          isPrimary: true
        },
        {
          name: "usersId",
          type: "integer",
          isPrimary: true
        }
      ]
    }), true);

    await queryRunner.createForeignKey("course_enrollments", new TableForeignKey({
      columnNames: ["coursesId"],
      referencedColumnNames: ["id"],
      referencedTableName: "courses",
      onDelete: "CASCADE",
      onUpdate: "CASCADE"
    }));

    await queryRunner.createForeignKey("course_enrollments", new TableForeignKey({
      columnNames: ["usersId"],
      referencedColumnNames: ["id"],
      referencedTableName: "users",
      onDelete: "NO ACTION",
      onUpdate: "NO ACTION"
    }));

    await queryRunner.createIndex("course_enrollments", new TableIndex({
      name: "IDX_158714d98ea73a4232914c746c",
      columnNames: ["coursesId"]
    }));

    await queryRunner.createIndex("course_enrollments", new TableIndex({
      name: "IDX_c12c172eb01d8968cfd0a6a422",
      columnNames: ["usersId"]
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable("course_enrollments");
    const foreignKeyCourse = table!.foreignKeys.find(fk => fk.columnNames.indexOf("coursesId") !== -1);
    const foreignKeyUser = table!.foreignKeys.find(fk => fk.columnNames.indexOf("usersId") !== -1);

    await queryRunner.dropForeignKey("course_enrollments", foreignKeyUser!);
    await queryRunner.dropForeignKey("course_enrollments", foreignKeyCourse!);

    await queryRunner.dropIndex("course_enrollments", "IDX_c12c172eb01d8968cfd0a6a422");
    await queryRunner.dropIndex("course_enrollments", "IDX_158714d98ea73a4232914c746c");

    await queryRunner.dropTable("course_enrollments");
  }
}
