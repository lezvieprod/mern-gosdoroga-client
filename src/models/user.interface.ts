import { IPost } from "./post.interface";

export interface IUser {
  email: string,
  password?: string,
  userLogin: string,
  regDate: number,
  verified: number,
  post: IPost[]
}