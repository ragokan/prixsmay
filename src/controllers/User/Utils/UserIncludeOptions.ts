import { Prisma } from "@prisma/client"
import { commentIncludeOptions } from "../../Post/Comment/Utils/CommentIncludeOptions"
import { postIncludeOptions } from "../../Post/Utils/PostIncludeOptions"

export const userProfileArgs: Prisma.ProfileArgs = { select: { picture: true, about: true } }
export const userIncludeOptions: Prisma.UserInclude = {
  posts: { include: postIncludeOptions },
  profile: userProfileArgs,
  comments: { include: commentIncludeOptions },
}
export const userSelectOptions: Prisma.UserSelect = {
  id: true,
  username: true,
  profile: userProfileArgs,
  communities: true,
}
