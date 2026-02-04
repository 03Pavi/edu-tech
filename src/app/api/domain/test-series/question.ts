import { TestSeries } from "./test-series";

export class Question {
  id!: number;
  text!: string;
  options!: string[];
  correctAnswer!: string;
  explanation?: string;
  testSeries!: TestSeries;

  constructor(init?: Partial<Question>) {
    Object.assign(this, init);
  }
}
