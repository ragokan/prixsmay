import { Prisma } from "@prisma/client"
import { userProfileArgs } from "../../../User/Utils/UserIncludeOptions"

const userSelectOptions: Prisma.UserArgs = {
  select: { id: true, email: true, username: true, profile: userProfileArgs },
}

export let commentIncludeOptions: Prisma.CommentInclude = {
  votes: true,
  user: userSelectOptions,
  comments: true,
}
