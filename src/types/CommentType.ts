import { ICommentVote } from "./VoteType"

export interface IComment {
  id: number
  text: string
  postId: number
  userId: number
  votes: ICommentVote[]
}
