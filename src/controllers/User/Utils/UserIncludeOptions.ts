import { Prisma } from "@prisma/client"

export const userProfileArgs: Prisma.ProfileArgs = { select: { picture: true, about: true } }
export const userIncludeOptions: Prisma.UserInclude = { posts: true, profile: userProfileArgs, comments: true }
export const userSelectOptions: Prisma.UserSelect = {
  id: true,
  username: true,
  profile: userProfileArgs,
  communities: true,
}
