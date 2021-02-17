import { Prisma } from "@prisma/client"

export const userIncludeOptions: Prisma.UserArgs = { select: { id: true, email: true, name: true, profile: true } }

export const postIncludeOptions: Prisma.PostInclude = {
  author: userIncludeOptions,
  votes: { select: { type: true, userId: true } },
  comments: {
    select: { text: true, user: userIncludeOptions, votes: { select: { type: true, userId: true } } },
  },
}
