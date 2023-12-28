import { useRecoilValue } from "recoil"
import { StyledSlider } from "../../styled/styled"
import { genresMovie$, genresTv$ } from "../../../state/atoms/data"
import GenrePickSlide from "./GenrePickSlide"
import { Swiper, SwiperClass } from "swiper/react"
import { EffectFade } from "swiper/modules"

import { useEffect, useState } from "react"
import 'swiper/css';
import 'swiper/css/effect-cards';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import GenreMoviesDisplay from "../GenreMoviesDisplay"
import { useWatchGenreCtx } from "../../../hooks/useWatchGenreCtx"
import { Box } from "@mui/material"
interface props {
    isTv: boolean,    
}



const GenresPickSlider = ({isTv}: props) => {

    const genresTv = useRecoilValue(genresTv$)    
    const genresMovie = useRecoilValue(genresMovie$)   
    const genres = (isTv && genresTv.length > 0 ) ? genresTv  : genresMovie;
    
    return(<Box>
         {genres.map((props) => <GenreMoviesDisplay  {...props}/>)}

        <Box className="genre-pick-slider">
            <StyledSlider  
            slideToClickedSlide 
            slidesPerView={"auto"} 
            spaceBetween={20}            
            >
            {genres.map((props) => <GenrePickSlide {...props}/>)}
            </StyledSlider>
        </Box>
    </Box>)
}

export default GenresPickSlider