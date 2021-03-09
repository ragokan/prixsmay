export const VoteType = {
  up: "up",
  down: "down",
}

export type VoteType = typeof VoteType[keyof typeof VoteType]

export interface IVote {
  id: number
  type: VoteType
  postId: number
  userId: number
}

export interface ICommentVote {
  id: number
  type: VoteType
  commentId: number
  userId: number
}
