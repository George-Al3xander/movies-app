import { selector, selectorFamily } from "recoil";
import { genres$, sliderIndex } from "../atoms/data";
import { Genre } from "../../../types/tmdb";



export const isButtonActive$ = selectorFamily({
    key: "ActiveSlide",
    get: ((number) => ({get}) => {
        const curr = get(sliderIndex)
        return number == curr
    })
})

export const genreNames$ = selectorFamily({
    key: "GenresName",
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
