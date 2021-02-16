import { Prisma } from "@prisma/client"

export const userIncludeOptions: Prisma.UserArgs = { select: { id: true, email: true, name: true, profile: true } }

export const postIncludeOptions: Prisma.PostInclude = {
  author: userIncludeOptions,
  votes: { select: { id: true, type: true, userId: true } },
  comments: {
    select: { text: true, votes: { select: { type: true, userId: true } } },
    include: { user: userIncludeOptions },
  },
}
