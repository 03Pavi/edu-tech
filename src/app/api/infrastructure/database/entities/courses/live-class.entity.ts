import "reflect-metadata";
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from "typeorm";
import type { Course } from "./course.entity";
import type { User } from "../auth/user.entity";

@Entity("live_classes")
export class LiveClass {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column({ type: "timestamp" })
  startTime!: Date;

  @Column({ type: "timestamp" })
  endTime!: Date;

  @Column({ nullable: true })
  meetingLink?: string;

  @ManyToOne("Course", "liveClasses")
  course!: Course;

  @ManyToOne("User")
  instructor!: User;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
