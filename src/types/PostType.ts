import { IComment } from "./CommentType"
import { IVote } from "./VoteType"

export interface IPost {
  id: number
  title: string
  content: string
  authorId: number
  votes?: IVote[]
  comments?: IComment[]

  createdAt: Date
  updatedAt: Date
}
