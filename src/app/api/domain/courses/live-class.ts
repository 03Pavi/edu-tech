import { Course } from "./course";
import { User } from "../auth/user";

export class LiveClass {
  id!: number;
  title!: string;
  startTime!: Date;
  endTime!: Date;
  meetingLink?: string;
  course!: Course;
  instructor!: User;
  createdAt!: Date;
  updatedAt!: Date;

  constructor(init?: Partial<LiveClass>) {
    Object.assign(this, init);
  }
}
