import { useCurrGenreMovies } from "../../hooks/useWatchGenreCtx"
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';
import { EffectFade, Pagination, Thumbs } from "swiper/modules";
import { Swiper,  SwiperSlide } from "swiper/react";
import {  CustomSwiperBtn, HeaderMovieContainer, ImageHeader } from "../styled/styled";
import HeaderMovieInfo from "../home/header/swiper/HeaderMovieInfo";

import useOuterBtns from "../../hooks/useOuterBtns";
import { Box, Chip,  Stack } from "@mui/material";
import { Genre, Movie, MovieDiscoverResult, TV, TvShowDiscoverResult } from "../../types/tmdb";
import { fetchFromTmdb } from "../../utils";
import { useQuery } from "@tanstack/react-query";



 



const GenreMoviesList = () => {

    const movies = useCurrGenreMovies()
    
   
    
    if(movies.length == 0) return <div>WE FUCKED</div>

    return(<Box className="genre-movies-list">
        
        <Swiper
        modules={[EffectFade, Thumbs]} 
        onSwiper={setThumbsSwiper}
        allowTouchMove={false}           
        slidesPerView={1}
        >
            
        </Swiper>   
        </Box>)
}

export default GenreMoviesList