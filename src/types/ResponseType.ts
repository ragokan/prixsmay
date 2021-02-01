export interface IResponse {
  success: boolean;
  message: string;
}

export interface IUserResponse extends IResponse {
  user?: any;
}
