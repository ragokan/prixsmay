import { IPost } from "./PostType";

export interface IResponse {
  success: boolean;
  message: string;
}

export interface IUserResponse extends IResponse {
  user?: any;
}

export interface IPostResponse extends IResponse {
  post?: IPost;
  posts?: IPost[];
}
