import "reflect-metadata";
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, ManyToMany, JoinTable, OneToMany } from "typeorm";
import type { User } from "../auth/user.entity";
import type { LiveClass } from "./live-class.entity";
import type { Note } from "./note.entity";
import type { TestSeries } from "../test-series/test-series.entity";
import type { RecordedClass } from "./recorded-class.entity";

@Entity("courses")
export class Course {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column({ type: "text", nullable: true })
  description?: string;

  @ManyToOne("User", "taughtCourses")
  instructor!: User;

  @ManyToMany("User", "enrolledCourses")
  @JoinTable({ name: "course_enrollments" })
  students!: User[];

  @OneToMany("LiveClass", "course")
  liveClasses!: LiveClass[];

  @OneToMany("Note", "course")
  notes!: Note[];

  @OneToMany("TestSeries", "course")
  testSeries!: TestSeries[];

  @OneToMany("RecordedClass", "course")
  recordedClasses!: RecordedClass[];

  @Column({ default: 0 })
  price!: number;

  @Column({ nullable: true })
  thumbnail?: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
