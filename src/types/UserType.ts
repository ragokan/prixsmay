import { IPost } from "./PostType";

export enum UserRole {
  user = "user",
  admin = "admin",
}

export interface IUser {
  id: number;
  email: string;
  password: string;
  name: string;
  type: UserRole;
  isActivated: boolean;
  posts: IPost[];
  createdAt: Date;
  updatedAt: Date;
}
