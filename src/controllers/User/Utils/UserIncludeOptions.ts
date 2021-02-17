import { Prisma } from "@prisma/client"

export const userIncludeOptions: Prisma.UserInclude = { posts: true, profile: true }
