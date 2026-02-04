import "reflect-metadata";
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany } from "typeorm";
import { Course } from "../courses/course.entity";
import { Question } from "./question.entity";

@Entity("test_series")
export class TestSeries {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column({ type: "text", nullable: true })
  description?: string;

  @ManyToOne(() => Course, (course: Course) => course.testSeries)
  course!: Course;

  @OneToMany(() => Question, (question: Question) => question.testSeries)
  questions!: Question[];

  @Column({ default: 0 })
  durationInMinutes!: number;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
