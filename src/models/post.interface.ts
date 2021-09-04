import { IUser } from "./user.interface";

export interface IPost {
  readonly id: number,
  title: string,
  description: string,
  owner: IUser,
  imageBefore: string,
  imageAfter: string,
  views: number,
  createDate: Date,
  fullUrl: string,
  isCompleted: boolean
}
