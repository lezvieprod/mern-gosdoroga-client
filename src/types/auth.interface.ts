export interface ILoginSubmit {
  email: string,
  password: string
}

export interface IRegSubmit {
  email: string,
  password: string,
  userLogin: string,
  password_repeat: string | number
}