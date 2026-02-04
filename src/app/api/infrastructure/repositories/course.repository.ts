import { BaseRepository } from "./base.repository";
import { Course } from "../database/entities/courses/course.entity";

export class CourseRepository extends BaseRepository<Course> {
  constructor() {
    super(Course);
  }

  async findAllWithCounts(): Promise<any[]> {
    return this.repo
      .createQueryBuilder("course")
      .leftJoinAndSelect("course.instructor", "instructor")
      .loadRelationCountAndMap("course.studentsCount", "course.students")
      .getMany();
  }

  async findByIdWithDetails(id: number): Promise<Course | null> {
    return this.repo.findOne({
      where: { id },
      relations: ["liveClasses", "recordedClasses", "notes", "instructor", "students"]
    });
  }

  async enrollUser(courseId: number, userId: number): Promise<void> {
    await this.repo
      .createQueryBuilder()
      .relation(Course, "students")
      .of(courseId)
      .add(userId);
  }

  async isUserEnrolled(courseId: number, userId: number): Promise<boolean> {
    const count = await this.repo
      .createQueryBuilder("course")
      .innerJoin("course.students", "student")
      .where("course.id = :courseId", { courseId })
      .andWhere("student.id = :userId", { userId })
      .getCount();
    return count > 0;
  }
}
