import { IUser } from "./user.interface";

export interface IPostAuthor {
  readonly _id: string,
  userLogin: string,
  accessLevel: number
}
export interface IPost {
  readonly _id: string,
  readonly postId: number,
  title: string,
  description: string,
  owner: IUser,
  imageBefore: string,
  views: number,
  createDate: Date,
  lastEdited: number,
  fullUrl: string,
  author: IPostAuthor,
  slugTitle: string
}
