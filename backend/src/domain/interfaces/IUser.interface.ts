export interface IUser {
    id?: string,
    name: string,
    email: string,
    password: string,
}

export interface IAuth {
    email: string,
    password: string,
}