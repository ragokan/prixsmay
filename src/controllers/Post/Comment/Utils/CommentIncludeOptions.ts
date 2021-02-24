import { Prisma } from "@prisma/client"
import { userSelectOptions } from "../../../User/Utils/UserIncludeOptions"

export const commentIncludeOptions: Prisma.CommentInclude = {
  votes: true,
  user: { select: userSelectOptions },
  comments: true,
}
