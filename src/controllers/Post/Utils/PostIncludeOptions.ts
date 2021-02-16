import { Prisma } from "@prisma/client"

export const postIncludeOptions: Prisma.PostInclude = {
  author: { select: { email: true, name: true, id: true } },
  votes: { select: { id: true, type: true, userId: true } },
  comments: true,
}
