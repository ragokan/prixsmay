import { Prisma } from "@prisma/client"
import { userProfileArgs } from "../../User/Utils/UserIncludeOptions"
import { commentIncludeOptions } from "../Comment/Utils/CommentIncludeOptions"

const userSelectOptions: Prisma.UserArgs = {
  select: { id: true, email: true, username: true, profile: userProfileArgs },
}

export const postIncludeOptions: Prisma.PostInclude = {
  author: userSelectOptions,
  votes: { select: { type: true, userId: true } },
  comments: {
    include: commentIncludeOptions,
    orderBy: { id: "desc" },
  },
}
