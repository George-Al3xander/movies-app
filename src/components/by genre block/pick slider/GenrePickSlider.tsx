import { useRecoilValue } from "recoil"
import { StyledSlider } from "../../styled/styled"
import { genresMovie$, genresTv$ } from "../../../state/atoms/data"
import GenrePickSlide from "./GenrePickSlide"
import { Swiper, SwiperClass } from "swiper/react"
import { EffectFade } from "swiper/modules"

import { useState } from "react"
import 'swiper/css';
import 'swiper/css/effect-cards';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import GenreMoviesDisplay from "../GenreMoviesDisplay"
interface props {
    isTv: boolean,    
}



const GenresPickSlider = ({isTv}: props) => {

    const genresTv = useRecoilValue(genresTv$)    
    const genresMovie = useRecoilValue(genresMovie$)
    const [mainRef, setMainRef] = useState<SwiperClass>();


    const genres = (isTv && genresTv.length > 0 ) ? genresTv  : genresMovie;
    
    return(<span>
        <Swiper
        modules={[EffectFade]} 
        onSwiper={setMainRef}
        allowTouchMove={false}           
        slidesPerView={1}
        >
            {genres.map((props) => <GenreMoviesDisplay  {...props}/>)}

        </Swiper>

        <button onClick={() => {
            if(mainRef) {
                console.log(mainRef)
            }
        }}>Click</button>

        <span className="genre-pick-slider">
            <StyledSlider  
            slideToClickedSlide 
            slidesPerView={"auto"} 
            spaceBetween={20}            
            >
            {genres.map((props, index) => <GenrePickSlide onClick={() => {
                if(mainRef) {
                    mainRef.slideTo(index, 500)
                }
            }} index={index} {...props}/>)}
            </StyledSlider>
        </span>


    </span>)
}

export default GenresPickSlider