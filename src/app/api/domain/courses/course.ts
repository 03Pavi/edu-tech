import { User } from "../auth/user";
import { LiveClass } from "./live-class";
import { Note } from "./note";
import { TestSeries } from "../test-series/test-series";
import { RecordedClass } from "./recorded-class";

export class Course {
  id!: number;
  title!: string;
  description?: string;
  instructor!: User;
  students!: User[];
  liveClasses!: LiveClass[];
  notes!: Note[];
  testSeries!: TestSeries[];
  recordedClasses!: RecordedClass[];
  price!: number;
  thumbnail?: string;
  createdAt!: Date;
  updatedAt!: Date;

  constructor(init?: Partial<Course>) {
    Object.assign(this, init);
  }
}
