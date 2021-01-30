export enum EUserRole {
  user = "user",
  admin = "admin",
}

export interface IUser {
  id: number;
  name: string;
  email: string;
  type: EUserRole;
  isActivated: boolean;
  //   createdAt: Date;
  //   updatedAt: Date;
}
