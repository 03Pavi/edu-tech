import { BaseRepository } from "./base.repository";
import { TestSeries } from "../database/entities/test-series/test-series.entity";

export class TestSeriesRepository extends BaseRepository<TestSeries> {
  constructor() {
    super(TestSeries);
  }
}
