import { IPost } from "./PostType"
import { IUser } from "./UserType"

export interface ICommunity {
  id: number
  name: string
  description: string
  picture: string
  posts?: IPost[]
  users?: IUser[]
  createdAt: Date
  updatedAt: Date
}
