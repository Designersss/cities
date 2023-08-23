
export interface ITours {
    id: number,
    name: string,
    subscribe: boolean
}

export interface ICities {
    id: number,
    city: string,
    tours: ITours[]
}

export interface IUser {
    id?: number,
    name: string,
    email: string,
    password: string,
    tours: ICities[]
}