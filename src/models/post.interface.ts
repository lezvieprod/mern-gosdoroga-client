import { IUser } from "./user.interface";

interface IPostAuthor {
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
  fullUrl: string,
  isCompleted: boolean,
  author: IPostAuthor,
  readonly postId: number
}
