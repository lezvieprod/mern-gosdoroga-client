import { IPost } from "./post.interface";

export interface IUser {
  readonly _id?: string,
  readonly token?: string,
  accessLevel: number,
  verified: number,
  email: string,
  password?: string,
  userLogin: string,
  userPhoto: string,
  readonly regDate: number
}