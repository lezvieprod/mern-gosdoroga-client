import { IPost } from "./post.interface";

export interface IUser {
  accessLevel: number,
  verified: number,
  post: IPost[],
  email: string,
  password?: string,
  userLogin: string,
  readonly regDate: number
}