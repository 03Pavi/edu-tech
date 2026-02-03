export interface Question {
  id: string;
  text: string;
  options: string[];
  correctOptionIndex: number;
}

export interface Test {
  id: string;
  title: string;
  durationMinutes: number;
  questions: Question[];
  groupId: string;
}

export interface TestGroup {
  id: string;
  title: string;
  description: string;
}

export type UserAnswers = Record<string, number>;

export interface TestResult {
  totalQuestions: number;
  attempted: number;
  correct: number;
  incorrect: number;
  score: number;
}
