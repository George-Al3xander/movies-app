import { atom } from "recoil";
import { Genre } from "../../types/tmdb";


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

export const trailerMovieId$ = atom({
    key: "TrailerUrl",
    default: null as null | number
})