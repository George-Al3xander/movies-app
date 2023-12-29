import { Alert, Box, Container, Stack, Typography } from "@mui/material"
import { useQuery } from "@tanstack/react-query"
import { Movie, PopularMovies, TV } from "../../types/tmdb"
import { Swiper, SwiperClass, SwiperRef, SwiperSlide } from "swiper/react"
import { EffectCards, EffectFade, Thumbs } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-cards';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';

import { useState } from "react"
import HeaderMovieInfo from "../home/header/swiper/HeaderMovieInfo"
import {  HeaderContainer, StyledSkeleton} from "../styled/styled"
import ItemVertical from "../horizontal/poster/PosterItem"
import { fetchFromTmdb } from "../../utils";
import  { HeaderMovieInfoSkeleton } from "../skeleton/HeaderMovieSkeleton";







const CardsBlock = ({apiUrl}:{apiUrl: string}) => {   
    const getMovies =  async () => (await fetchFromTmdb(apiUrl)).results as (Movie & TV)[]

    
    const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
    const [currIndex, setCurrIndex] = useState(0)
    
    const handleCardSwipe = (swiper: SwiperClass) => {
        setCurrIndex(swiper.realIndex );
    }

    const {data: movies, isLoading, isError} = useQuery({queryKey: ["cards-block", apiUrl], queryFn: getMovies})


    
    if(isError) {
        return <Alert severity="error">Failed to fetch header info, try reloading page!</Alert>
    }
   

    return(<Box sx={{py: 4,my: 4, position: "relative", background: isLoading ? "linear-gradient(to bottom, #00925d, #526525, #503c19, #321d18, #000000)" : "initial"}} className="cards-block">
        <HeaderContainer  sx={{
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
                {isLoading ? <HeaderMovieInfoSkeleton /> : <HeaderMovieInfo {...movies![currIndex]}/>}
            </Box>
            {isLoading ?
            <StyledSkeleton height={400} variant="rounded" width={300}/>
            :
        
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
                        <ItemVertical {...movie}/>   
                    </SwiperSlide>
                })}
            </Swiper>
            }
        </HeaderContainer>
        
        
        
        {!isLoading && <Swiper
        modules={[EffectFade, Thumbs]}
       
        className="background"
        onSwiper={setThumbsSwiper}
        allowTouchMove={false}           
        slidesPerView={1}
        >
        {movies!.map(({backdrop_path, title, name}) => {
            return <SwiperSlide>
                {backdrop_path ? 
                <img  src={`http://image.tmdb.org/t/p/original${backdrop_path}`} alt={title ? title : name} />
                :
                <Box sx={{borderRadius: 1, display: "flex",justifyContent: "center",alignItems: "center",position: "absolute",top: 0, height: "100%", width: "100%", background: "linear-gradient(to bottom, #00925d, #526525, #503c19, #321d18, #000000)"}}></Box>
                }                
            </SwiperSlide>
        })}
        </Swiper>}      
    </Box>)
}

export default  CardsBlock