export type ExamResultResponse = {
  correct: number;
  wrong: number;
  total: string;
  WrongQuestions: WrongQuestion[];
  correctQuestions: CorrectQuestion[];
};

type WrongQuestion = {
  QID: string;
  Question: string;
  inCorrectAnswer: string;
  correctAnswer: string;
  answers: Record<string, unknown>;
};

type CorrectQuestion = {
  QID: string;
  Question: string;
  correctAnswer: string;
  answers: Record<string, unknown>;
};
