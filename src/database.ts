import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()
const { user: User, post: Post, vote: Vote, comment: Comment, commentVote: CommentVote, community: Community } = prisma

export { prisma, User, Post, Vote, Comment, CommentVote, Community }
