import { Prisma } from "@prisma/client"

const userSelectOptions: Prisma.UserArgs = { select: { id: true, email: true, name: true, profile: true } }

export const postIncludeOptions: Prisma.PostInclude = {
  author: userSelectOptions,
  votes: { select: { type: true, userId: true } },
  comments: {
    select: { id: true, text: true, user: userSelectOptions, votes: { select: { type: true, userId: true } } },
  },
}
