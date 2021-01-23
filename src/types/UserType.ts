export enum UserRoleType {
  user = "user",
  admin = "admin",
}

export interface UserType {
  id: number;
  name: string;
  email: string;
  type: UserRoleType;
  isActivated: boolean;
  //   createdAt: Date;
  //   updatedAt: Date;
}
