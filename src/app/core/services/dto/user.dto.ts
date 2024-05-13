export interface IUser {
    id: number
    name: string
    email: string
    role: string
    phone: string
    createdAt: string
    updatedAt: string
    updatedBy: number
}
export interface IUsersRole {
    data: IUser[]
    total: number
}
