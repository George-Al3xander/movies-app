import { selector, selectorFamily } from "recoil";
import { genres$, modal$, sliderIndex, trailerMovieId$ } from "../atoms/data";
import { Genre } from "../../../types/tmdb";



export const isButtonActive$ = selectorFamily({
    key: "ActiveSlide",
    get: ((number) => ({get}) => {
        const curr = get(sliderIndex)
        return number == curr
    })
})

export const genreNames$ = selectorFamily({
    key: "GenreNames",
    get: ((arr: number[]) => ({get}) => {
        const genres = get(genres$);
        //console.log(genres)
        return arr.map((num) => {
            const item = genres[num]
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
        const trailerId = get(trailerMovieId$)

        return [status, trailerId != null].every(el => el == true)
    }
})
