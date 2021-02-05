import { IVote } from "./VoteType";

export interface IPost {
  id: number;
  title: string;
  content: string;
  authorId: number;
  votes?: IVote[];

  createdAt: Date;
  updatedAt: Date;
}
