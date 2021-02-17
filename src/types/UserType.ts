import { IPost } from "./PostType"

export enum UserRole {
  user = "user",
  admin = "admin",
}

export interface IUser {
  id: number
  email: string
  password: string
  username: string
  type: UserRole
  isActivated: boolean
  profile: Profile | null
  posts?: IPost[]
  createdAt: Date
  updatedAt: Date
}

export interface Profile {
  id: number
  picture: string
  userId: number
  createdAt: Date
  updatedAt: Date
}
