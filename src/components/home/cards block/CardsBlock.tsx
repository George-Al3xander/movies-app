import { Alert, Box, Typography } from "@mui/material"
import { useQuery } from "@tanstack/react-query"
import { fetchOptions } from "../../../App"
import { PopularMovies } from "../../../types/tmdb"
import { Swiper, SwiperClass, SwiperRef, SwiperSlide } from "swiper/react"
import { EffectCards, EffectFade, Thumbs } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-cards';
import 'swiper/css/effect-fade';
import { useState } from "react"
import HeaderMovieInfo from "../header/swiper/HeaderMovieInfo"
import { HeaderMovieContainer } from "../../styled/styled"
import ItemVertical from "../../vertical/ItemVertical"







const CardsBlock = ({apiUrl}:{apiUrl: string}) => {

    const getMovies =  async () => {
        
        const response = await fetch(apiUrl, fetchOptions)
        const data = await response.json() as PopularMovies
        return data.results
    }

    
    const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
    const [currIndex, setCurrIndex] = useState(0)
    
    const handleCardSwipe = (swiper: SwiperClass) => {
        setCurrIndex(swiper.realIndex );
    }

    const {data: movies, isLoading, isError} = useQuery({queryKey: ["cards-block", apiUrl], queryFn: getMovies})

    if(isLoading) {
        return "Loading..."
    }
    
    if(isError) {
        return <Alert severity="error">Failed to fetch header info, try reloading page!</Alert>
    }
    console.log(movies![0].genre_ids)

    return(<Box sx={{py: 4, position: "relative"}} className="cards-block">
        <HeaderMovieContainer>
            <Swiper
                effect={'cards'}
                grabCursor={true}
                className="block"
                onSlideChange={handleCardSwipe}
                thumbs={{swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null}}
                modules={[EffectCards, Thumbs]}       
                >
                {movies!.map((movie) => {
                    return <SwiperSlide>
                        <ItemVertical movie={movie}/>                       
                    </SwiperSlide>
                })}
            </Swiper>
            <HeaderMovieInfo movie={movies![currIndex]}/>


        </HeaderMovieContainer>

        <Swiper
        modules={[EffectFade, Thumbs]}
        effect={'fade'}
        className="background"
        onSwiper={setThumbsSwiper}
        allowTouchMove={false}    
        slidesPerView={1}
        >
        {movies!.map((movie) => {
            return <SwiperSlide>
                <img src={`http://image.tmdb.org/t/p/original${movie.backdrop_path}`} alt={movie.title} />
            </SwiperSlide>
        })}
        </Swiper>      
    </Box>)
}

export default  CardsBlock