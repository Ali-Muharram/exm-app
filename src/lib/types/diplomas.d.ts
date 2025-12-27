export type DiplomasResponse = {
  metadata: Metadata;
  subjects: Subject[];
};

export type Subject = {
  _id: string;
  name: string;
  icon: string;
  createdAt: string;
};

export type Metadata = {
  currentPage: number;
  numberOfPages: number;
  limit: number;
};
