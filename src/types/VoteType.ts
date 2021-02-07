export interface VoteType {
  up: "up";
  down: "down";
}

export interface IVote {
  id: number;
  type: VoteType;
  postId: number;
  authorId: number;
}
