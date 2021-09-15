
export interface IUser {
  readonly _id?: string,
  readonly token?: string,
  readonly regDate: number,
  readonly userId: number
  accessLevel: number,
  verified: number,
  email: string,
  password?: string,
  userLogin: string,
  userPhoto: string
}