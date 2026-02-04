import { Course } from "./course";

export class RecordedClass {
  id!: number;
  title!: string;
  videoUrl?: string;
  duration?: string;
  description?: string;
  course!: Course;
  createdAt!: Date;
  updatedAt!: Date;

  constructor(init?: Partial<RecordedClass>) {
    Object.assign(this, init);
  }
}
