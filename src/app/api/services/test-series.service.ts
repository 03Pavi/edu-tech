import { TestSeriesRepository } from "../infrastructure/repositories/test-series.repository";
import { QuestionRepository } from "../infrastructure/repositories/question.repository";
import { TestSeries } from "../infrastructure/database/entities/test-series/test-series.entity";
import { Question } from "../infrastructure/database/entities/test-series/question.entity";
import { Course } from "../infrastructure/database/entities/courses/course.entity";
import { AppDataSource } from "../infrastructure/database/data-source";

export class TestSeriesService {
  private testSeriesRepo = new TestSeriesRepository();
  private questionRepo = new QuestionRepository();

  async createTestSeries(data: {
    title: string;
    description?: string;
    courseId?: number;
    durationInMinutes: number;
    questions?: Partial<Question>[];
  }): Promise<TestSeries> {
    const queryRunner = AppDataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const testSeries = this.testSeriesRepo["repository"].create({
        title: data.title,
        description: data.description,
        durationInMinutes: data.durationInMinutes,
        course: data.courseId ? { id: data.courseId } as Course : undefined
      });

      const savedTestSeries = await queryRunner.manager.save(testSeries);

      if (data.questions && data.questions.length > 0) {
        const questions = data.questions.map(q => {
          return this.questionRepo["repository"].create({
            ...q,
            testSeries: savedTestSeries
          });
        });
        await queryRunner.manager.save(questions);
      }

      await queryRunner.commitTransaction();
      return savedTestSeries;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }

  async getAllTestSeries(): Promise<TestSeries[]> {
    return await this.testSeriesRepo.findAll();
  }

  async getTestSeriesById(id: number): Promise<TestSeries | null> {
    return await this.testSeriesRepo["repository"].findOne({
      where: { id },
      relations: ["questions", "course"]
    });
  }
}
