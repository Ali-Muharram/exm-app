type Metadata = {
  currentPage: number;
  numberOfPages: number;
  limit: number;
};

type Exam = {
  _id: string;
  title: string;
  duration: number;
  subject: string;
  numberOfQuestions: number;
  active: boolean;
  createdAt: string;
};

export type ExamsResponse = {
  metadata: Metadata;
  exams: Exam[];
};
