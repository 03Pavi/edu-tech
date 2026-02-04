import { Course } from "../courses/course";
import { UserRole } from "./user-role.enum";

export class User {
  id!: number;
  email!: string;
  password!: string;
  name?: string;
  role!: UserRole;
  taughtCourses!: Course[];
  enrolledCourses!: Course[];
  createdAt!: Date;
  updatedAt!: Date;

  constructor(init?: Partial<User>) {
    Object.assign(this, init);
  }
}
