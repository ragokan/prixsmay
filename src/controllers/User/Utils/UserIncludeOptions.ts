import { Prisma } from "@prisma/client"

export const userProfileArgs: Prisma.ProfileArgs = { select: { picture: true } }
export const userIncludeOptions: Prisma.UserInclude = { posts: true, profile: userProfileArgs, comments: true }
