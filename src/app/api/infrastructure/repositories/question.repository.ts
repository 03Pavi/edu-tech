import { BaseRepository } from "./base.repository";
import { Question } from "../database/entities/test-series/question.entity";

export class QuestionRepository extends BaseRepository<Question> {
  constructor() {
    super(Question);
  }
}
