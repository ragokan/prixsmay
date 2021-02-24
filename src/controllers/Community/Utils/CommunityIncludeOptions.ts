import { Prisma } from "@prisma/client"
import { postIncludeOptions } from "../../Post/Utils/PostIncludeOptions"
import { userSelectOptions } from "../../User/Utils/UserIncludeOptions"

export const communityIncludeOptions = (limit: number = 10): Prisma.CommunityInclude => ({
  users: { select: userSelectOptions },
  posts: { include: { ...postIncludeOptions, community: false }, orderBy: { createdAt: "desc" }, take: limit },
})
