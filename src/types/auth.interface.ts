export interface ILoginSubmit {
  email: string,
  password: string
}
export interface IRegSubmit {
  email: string,
  password: string,
  userLogin: string,
  userPhoto: any,
  password_repeat?: string | number
}
export interface ILoginResponse {
  token: string,
  userLogin: string,
  _id: string
}
