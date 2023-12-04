import { selector, selectorFamily } from "recoil";
import { sliderIndex } from "../atoms/data";



export const isButtonActive$ = selectorFamily({
    key: "ActiveSlide",
    get: ((number) => ({get}) => {
        const curr = get(sliderIndex)
        return number == curr
    })
})