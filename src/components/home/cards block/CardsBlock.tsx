import { Alert, Box, Container, Stack, Typography } from "@mui/material"
import { useQuery } from "@tanstack/react-query"
import { fetchOptions } from "../../../App"
import { PopularMovies } from "../../../types/tmdb"
import { Swiper, SwiperClass, SwiperRef, SwiperSlide } from "swiper/react"
import { EffectCards, EffectFade, Thumbs } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-cards';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';

import { useState } from "react"
import HeaderMovieInfo from "../header/swiper/HeaderMovieInfo"
import { Genres, HeaderMovieContainer, MovieRating, VerticalItemInfo } from "../../styled/styled"
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
   

    return(<Box sx={{py: 4, position: "relative"}} className="cards-block">
        <HeaderMovieContainer  sx={{
            alignItems: "center",
            justifyContent: {sm:"space-between"},
                     
            gap:{xs: 4,sm:10},
            width: "100%",
            flexDirection: {xs: "column-reverse",sm: "row"}, 
            maxWidth: {sm: "100%"}, 
            }}>
            <Stack order={1}  sx={{zIndex: 4}} display={{sm: "none"}} spacing={2}>
                <Typography  variant="h3">Featured in Screen Score</Typography>
                <Typography sx={{opacity: ".7"}}  variant="h5">Best featured for you today</Typography>
            </Stack>

            <Box sx={{
                zIndex: 4, 
                display: "flex", 
                flexDirection: "column", 
                justifyContent: "space-between",
                height: "100%",
                maxHeight: "400px",  
                gap: 10             
                }} >
                <Stack display={{xs: "none", sm: "flex"}} spacing={2}>
                    <Typography  variant="h3">Featured in Screen Score</Typography>
                    <Typography sx={{opacity: ".7"}}  variant="h5">Best featured for you today</Typography>
                </Stack>
                <HeaderMovieInfo movie={movies![currIndex]}/>
            </Box>

            <Swiper
                effect={'cards'}
                grabCursor={true}
                navigation={true}
                className="block"
                onSlideChange={handleCardSwipe}
                thumbs={{swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null}}
                modules={[EffectCards, Thumbs, Navigation]}       
                >
                {movies!.map((movie) => {
                    return <SwiperSlide>
                        <ItemVertical movie={movie}/>   
                    </SwiperSlide>
                })}
            </Swiper>
        </HeaderMovieContainer>
        
        <Swiper
        modules={[EffectFade, Thumbs]}
       
        className="background"
        onSwiper={setThumbsSwiper}
        allowTouchMove={false}           
        slidesPerView={1}
        >
        {movies!.map((movie) => {
            return <SwiperSlide>
                {movie.backdrop_path ? 
                <img  src={`http://image.tmdb.org/t/p/original${movie.backdrop_path}`} alt={movie.title} />
                :
                <Box sx={{borderRadius: 1, display: "flex",justifyContent: "center",alignItems: "center",position: "absolute",top: 0, height: "100%", width: "100%", background: "linear-gradient(to bottom, #00925d, #526525, #503c19, #321d18, #000000)"}}></Box>
                }                
            </SwiperSlide>
        })}
        </Swiper>      
    </Box>)
}

export default  CardsBlock