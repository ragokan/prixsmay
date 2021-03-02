import { Prisma } from "@prisma/client"
import { userProfileArgs } from "./UserIncludeOptions"

export const userSelectOptions: Prisma.UserSelect = {
  id: true,
  username: true,
  profile: userProfileArgs,
  communities: true,
}
