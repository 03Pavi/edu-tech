import { Test, TestGroup } from './test-types';

export const mockGroups: TestGroup[] = [
  {
    id: 'ssc',
    title: 'SSC Mock Tests',
    description: 'Complete preparation for SSC CGL, CHSL, and MTS exams.',
  },
  {
    id: 'banking',
    title: 'Banking Exams',
    description: 'Specialized tests for IBPS PO, Clerk, and SBI exams.',
  },
];

export const mockTests: Test[] = [
  {
    id: '1',
    groupId: 'ssc',
    title: 'General Science Mock Test',
    durationMinutes: 10,
    questions: [
      {
        id: 'q1',
        text: 'What is the chemical symbol for water?',
        options: ['H2O', 'CO2', 'O2', 'NaCl'],
        correctOptionIndex: 0,
      },
      {
        id: 'q2',
        text: 'Which planet is known as the Red Planet?',
        options: ['Earth', 'Mars', 'Jupiter', 'Saturn'],
        correctOptionIndex: 1,
      },
      {
        id: 'q3',
        text: 'What is the powerhouse of the cell?',
        options: ['Nucleus', 'Ribosome', 'Mitochondria', 'Golgi apparatus'],
        correctOptionIndex: 2,
      },
      {
        id: 'q4',
        text: 'What is the closest star to Earth?',
        options: ['Sirius', 'Proxima Centauri', 'The Sun', 'Betelgeuse'],
        correctOptionIndex: 2,
      },
      {
        id: 'q5',
        text: 'Which gas do plants absorb from the atmosphere?',
        options: ['Oxygen', 'Nitrogen', 'Carbon Dioxide', 'Hydrogen'],
        correctOptionIndex: 2,
      },
    ],
  },
  {
    id: '2',
    groupId: 'ssc',
    title: 'Mathematics Basics',
    durationMinutes: 15,
    questions: [
      {
        id: 'q1',
        text: 'What is 5 + 7?',
        options: ['10', '11', '12', '13'],
        correctOptionIndex: 2,
      },
      {
        id: 'q2',
        text: 'What is 12 x 12?',
        options: ['124', '144', '148', '164'],
        correctOptionIndex: 1,
      },
      {
        id: 'q3',
        text: 'What is the square root of 81?',
        options: ['7', '8', '9', '10'],
        correctOptionIndex: 2,
      },
      {
        id: 'q4',
        text: 'What is 100 divided by 4?',
        options: ['20', '25', '30', '40'],
        correctOptionIndex: 1,
      },
      {
        id: 'q5',
        text: 'What is the value of Pi (to 2 decimal places)?',
        options: ['3.12', '3.14', '3.16', '3.18'],
        correctOptionIndex: 1,
      },
    ],
  },
  {
    id: '3',
    groupId: 'banking',
    title: 'Banking Awareness Quiz',
    durationMinutes: 12,
    questions: [
      {
        id: 'q1',
        text: 'What does ATM stand for?',
        options: ['Any Time Money', 'Automated Teller Machine', 'Automated Transaction Machine', 'Active Teller Machine'],
        correctOptionIndex: 1,
      },
      {
        id: 'q2',
        text: 'Which bank is known as the Bankers Bank in India?',
        options: ['SBI', 'RBI', 'HDFC', 'ICICI'],
        correctOptionIndex: 1,
      },
    ],
  },
];
