/* ----------------------------- / API Response ----------------------------- */
export type QuestionsResponse = {
  questions: Question[];
};

/* -------------------------------- Question -------------------------------- */
type Question = {
  _id: string;
  question: string;
  answers: Answer[];
  type: "single_choice" | "multiple_choice";
  correct: string;
  subject: string | null;
  exam: Exam;
  createdAt: string;
};

/* --------------------------------- Answer --------------------------------- */
type Answer = {
  answer: string;
  key: string;
};

/* ---------------------------------- Exam ---------------------------------- */
type Exam = {
  _id: string;
  title: string;
  duration: number;
  subject: string;
  numberOfQuestions: number;
  active: boolean;
  createdAt: string;
};

export type AnswersStudents = {
  questionId: string;
  correct: string;
};

export type AnswerRequest = {
  answers: AnswersStudents[];
};
