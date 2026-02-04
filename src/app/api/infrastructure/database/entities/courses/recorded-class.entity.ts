import "reflect-metadata";
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from "typeorm";
import type { Course } from "./course.entity";

@Entity("recorded_classes")
export class RecordedClass {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column({ nullable: true })
  videoUrl?: string;

  @Column({ nullable: true })
  duration?: string; // e.g. "1h 30m"

  @Column({ type: "text", nullable: true })
  description?: string;

  @ManyToOne("Course", "recordedClasses")
  course!: Course;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
