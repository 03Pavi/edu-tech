import { Course } from "./course";

export class Note {
  id!: number;
  title!: string;
  contentUrl?: string;
  description?: string;
  course!: Course;
  createdAt!: Date;
  updatedAt!: Date;

  constructor(init?: Partial<Note>) {
    Object.assign(this, init);
  }
}
