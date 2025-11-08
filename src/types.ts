export type Idea = {
  _id: string;
  title: string;
  summary: string;
  description: string;
  tags: string[];
  createdAt: string;
  user: string;
};

export type IdeaWithUser = {
  _id: string;
  title: string;
  summary: string;
  description: string;
  tags: string[];
  createdAt: string;
  user?: {
    _id: string;
    name: string;
    email: string;
  };
};
