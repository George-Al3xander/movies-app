import { atom } from "recoil";
import { Genre, Movie, TV } from "../../types/tmdb";
import { CustomUser } from "../../types/type";




export const genresTv$ = atom({
    key: "genresTv",
    default: [] as Genre[]
})

export const genresMovie$ = atom({
    key: "genresMovie",
    default: [] as Genre[]
})

export const modal$ = atom({
    key: "modalStatus",
    default: false
})

export const trailerProduct$ = atom({
    key: "TrailerUrl",
    default: null as null | (Movie & TV)
})


export const loginModal$ = atom({
    key: "LoginModalStatus",
    default: false
})

export const registerModal$ = atom({
    key: "RegisterModalStatus",
    default: true
})


export const currentUser = atom<CustomUser | undefined>({
    key: "Current user",
    default: undefined
})