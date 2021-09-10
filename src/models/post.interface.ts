import { IUser } from "./user.interface";

export interface IPostAuthor {
  readonly _id: string,
  userLogin: string,
  accessLevel: number
}

export interface IPost {
  readonly _id: string,
  title: string,
  description: string,
  owner: IUser,
  imageBefore: string,
  imageAfter: string,
  views: number,
  createDate: Date,
  lastEdited: number,
  fullUrl: string,
  isCompleted: boolean,
  author: IPostAuthor,
  slugTitle: string,
  readonly postId: number
}
