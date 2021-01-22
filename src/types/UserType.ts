export enum UserRoleType {
  admin,
  user,
}

export interface UserType {
  id: number;
  name: string;
  email: string;
  password: string;
  type: UserRoleType;
  isActivated: boolean;
  //   createdAt: Date;
  //   updatedAt: Date;
}
