import { Course } from "../courses/course";
import { Question } from "./question";

export class TestSeries {
  id!: number;
  title!: string;
  description?: string;
  course!: Course;
  questions!: Question[];
  durationInMinutes!: number;
  createdAt!: Date;
  updatedAt!: Date;

  constructor(init?: Partial<TestSeries>) {
    Object.assign(this, init);
  }
}
