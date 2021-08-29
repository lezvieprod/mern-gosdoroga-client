import { IPost } from "./post.interface";

export interface IUser {
  readonly _id?: string,
  accessLevel: number,
  verified: number,
  posts: IPost[],
  email: string,
  password?: string,
  userLogin: string,
  readonly regDate: number
}