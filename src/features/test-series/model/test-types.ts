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
  status?: 'active' | 'pending';
  badge?: string;
  count?: string;
}

export interface PyqLinkItem {
  title: string;
  url: string;
}

export interface PyqShiftPaper {
  id?: string;
  title?: string;
  date: string;
  shift: string;
  links: PyqLinkItem[];
  englishPdf?: string;
  hindiPdf?: string;
  rawCells?: string[];
  sectionHeading?: string;
}

export interface PyqSection {
  heading: string;
  tables: Array<{
    headers: string[];
    rows: PyqShiftPaper[];
  }>;
}

export interface PyqScrapedData {
  title: string;
  url: string;
  scrapedAt: string;
  sections: PyqSection[];
}

export interface PyqExamCategory {
  name: string;
  slug: string;
  category: string;
  url?: string;
  years?: number[];
}

export interface PyqExamsResponse {
  success: boolean;
  data: {
    count: number;
    exams: PyqExamCategory[];
  };
}

export interface PyqYearsData {
  exam: string;
  sourceUrl?: string;
  years: number[];
}

export interface PyqYearsResponse {
  success: boolean;
  data: PyqYearsData;
}

export interface PyqExamTierInfo {
  name: string;
  type: string;
  shifts: number;
  papers: number;
  dates: string[];
}

export interface PyqYearBreakdown {
  exam: string;
  year: number;
  exams: PyqExamTierInfo[];
  tiers: Record<string, { dates: string[]; shifts: string[] }>;
}

export interface PyqTierPapersData {
  sectionHeading: string;
  exam: string;
  year: number;
  tier: string;
  totalPapers: number;
  papers: PyqShiftPaper[];
}

export interface PyqTierPapersResponse {
  success: boolean;
  data: PyqTierPapersData;
}



export type UserAnswers = Record<string, number>;

export interface TestResult {
  totalQuestions: number;
  attempted: number;
  correct: number;
  incorrect: number;
  score: number;
}
