import { ICommentVote } from "./VoteType"

export interface IComment {
  id: number
  text: string
  postId: number | null
  commentId: number | null
  userId: number
  votes?: ICommentVote[]
  comments?: IComment[]
}
