import { User } from "@prisma/client";

enum UserRoleType {
  admin,
  user,
}

interface UserType {
  id: number;
  name: string;
  email: string;
  password: string;
  type: UserRoleType;
  isActivated: boolean;
  //   createdAt: Date;
  //   updatedAt: Date;
}
