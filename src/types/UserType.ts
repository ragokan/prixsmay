export enum UserRole {
  user = "user",
  admin = "admin",
}

export interface IUser {
  id: number;
  name: string;
  email: string;
  type: UserRole;
  isActivated: boolean;
  //   createdAt: Date;
  //   updatedAt: Date;
}
