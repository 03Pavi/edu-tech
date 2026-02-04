import { BaseRepository } from "./base.repository";
import { LiveClass } from "../database/entities/courses/live-class.entity";

export class LiveClassRepository extends BaseRepository<LiveClass> {
  constructor() {
    super(LiveClass);
  }
}
