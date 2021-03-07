import { Prisma } from "@prisma/client";
import { postIncludeOptions } from "../../Post/Utils/PostIncludeOptions";
import { userSelectOptions } from "../../User/Utils/UserSelectOptions";

export const communityIncludeOptions = (limit: number = 10, page: number = 1): Prisma.CommunityInclude => ({
  members: { select: userSelectOptions },
  posts: {
    include: { ...postIncludeOptions, community: false },
    orderBy: { createdAt: "desc" },
    take: limit || 10,
    skip: page ? (page - 1) * 10 : 0,
  },
});

export const communitySelectOptions: Prisma.CommunitySelect = { name: true, description: true, picture: true };
