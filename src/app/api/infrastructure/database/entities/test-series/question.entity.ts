import "reflect-metadata";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { TestSeries } from "./test-series.entity";

@Entity("questions")
export class Question {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "text" })
  text!: string;

  @Column({ type: "json" })
  options!: string[]; // Array of strings e.g. ["A", "B", "C", "D"]

  @Column()
  correctAnswer!: string;

  @Column({ type: "text", nullable: true })
  explanation?: string;

  @ManyToOne(() => TestSeries, (testSeries: TestSeries) => testSeries.questions)
  testSeries!: TestSeries;
}
