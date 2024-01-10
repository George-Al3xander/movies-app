import { atom } from "recoil";
import { Genre, Movie, TV } from "../../types/tmdb";


export const sliderIndex = atom({
    key: "sliderIndex",
    default: 0
})

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
    default: false
})