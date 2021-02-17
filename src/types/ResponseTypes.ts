import { IComment } from "./CommentType"
import { IPost } from "./PostType"
import { ICommentVote, IVote } from "./VoteType"

export interface IResponse {
  success: boolean
  message: string
}

export interface IUserResponse extends IResponse {
  user?: any
}

export interface IPostResponse extends IResponse {
  post?: IPost
  posts?: IPost[]
}

export interface ICommentResponse extends IResponse {
  comments?: IComment[]
  comment?: IComment
}

export interface IVoteResponse extends IResponse {
  votes?: IVote[] | ICommentVote[]
}
