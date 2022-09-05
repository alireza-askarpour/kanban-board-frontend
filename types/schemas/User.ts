export interface IUser {
  _id: string
  fullname: string
  username: string
  email: string
  password: string
  avatar?: string
  skills?: [string]
  teams?: [string]
  roles?: [string]
  createdAt: string
  updatedAt: string
}
