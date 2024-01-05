import { selector, selectorFamily } from "recoil";
import { genresTv$,genresMovie$, modal$, sliderIndex, trailerProduct$ } from "../atoms/data";
import { Genre } from "../../types/tmdb";



export const isButtonActive$ = selectorFamily({
    key: "ActiveSlide",
    get: ((number) => ({get}) => {
        const curr = get(sliderIndex)
        return number == curr
    })
})

export const genreNamesMovies$ = selectorFamily({
    key: "GenreNamesMovie",
    get: ((arr: number[]) => ({get}) => {
        const genres = get(genresMovie$);        
        return arr.map((num) => {
            const item = genres.find(({id}) => num == id)
            if(item) {
                return item.name
            }
        }).filter(item => item)
    })
})

export const genreNamesTv$ = selectorFamily({
    key: "GenreNamesTv",
    get: ((arr: number[]) => ({get}) => {
        const genres = get(genresTv$);        
        return arr.map((num) => {
            const item = genres.find(({id}) => num == id)
            if(item) {                
                return item.name
            }
        }).filter(item => item)
    })
})


export const modalStatus$ = selector({
    key: "ModalStatusSelektor",
    get: ({get}) => {
        const status = get(modal$);
        const trailerId = get(trailerProduct$)

        return [status, trailerId != null].every(el => el == true)
    }
})
