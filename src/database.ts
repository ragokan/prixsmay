import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()
const { user: User, post: Post, vote: Vote, comment: Comment, commentVote: CommentVote } = prisma

export { prisma, User, Post, Vote, Comment, CommentVote }
