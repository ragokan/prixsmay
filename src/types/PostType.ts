import { IComment } from "./CommentType"
import { ICommunity } from "./CommunityType"
import { IVote } from "./VoteType"

export interface IPost {
  id: number
  title: string
  content: string
  authorId: number
  votes?: IVote[]
  comments?: IComment[]
  community?: ICommunity

  createdAt: Date
  updatedAt: Date
}
