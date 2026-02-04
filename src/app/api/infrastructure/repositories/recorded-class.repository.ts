import { BaseRepository } from "./base.repository";
import { RecordedClass } from "../database/entities/courses/recorded-class.entity";

export class RecordedClassRepository extends BaseRepository<RecordedClass> {
  constructor() {
    super(RecordedClass);
  }
}
