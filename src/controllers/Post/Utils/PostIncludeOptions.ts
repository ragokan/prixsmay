import { Prisma } from "@prisma/client"
import { userSelectOptions } from "../../User/Utils/UserSelectOptions"
import { commentIncludeOptions } from "../Comment/Utils/CommentIncludeOptions"

export const postIncludeOptions: Prisma.PostInclude = {
  author: { select: userSelectOptions },
  votes: { select: { type: true, userId: true } },
  comments: {
    include: commentIncludeOptions,
    orderBy: { id: "desc" },
  },
  community: {
    select: { id: true, description: true, name: true, picture: true, members: { select: { id: true } } },
  },
}
