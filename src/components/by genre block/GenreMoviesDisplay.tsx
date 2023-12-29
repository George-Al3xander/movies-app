import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';
import { EffectFade, Pagination} from "swiper/modules";
import { Swiper,  SwiperSlide } from "swiper/react";
import {  CustomSwiperBtn, HeaderContainer, ImageHeader } from "../styled/styled";
import HeaderMovieInfo from "../home/header/swiper/HeaderMovieInfo";
import useOuterBtns from "../../hooks/useOuterBtns";
import { Box, Chip,  Stack } from "@mui/material";
import { Genre, Movie,  TV } from "../../types/tmdb";
import { fetchFromTmdb } from "../../utils";
import { useQuery } from "@tanstack/react-query";
import { useCheckGenreMatch } from '../../hooks/useWatchGenreCtx';
import { HeaderMovieInfoSkeleton } from '../skeleton/HeaderMovieSkeleton';

interface CustomGenreProps  extends Genre {
    index: number
}

const GenreMoviesDisplay = ({name, id, index}: CustomGenreProps) => {
    const {isBeginning, isEnd, handleNext, handlePrevious, handleSlideChange, setSwiperRef} = useOuterBtns()
    const getElems = async () => await fetchFromTmdb(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=${id}`)
    
    const isMatch = useCheckGenreMatch(id)

    const {data, isLoading} = useQuery({queryKey: ["genre-pick-movie", id, name], queryFn: getElems})
        
    if(isLoading && index == 0) return <Box sx={{position: "relative",display: "flex",minHeight: "70vh", background: "linear-gradient(to bottom, #00925d, #526525, #503c19, #321d18, #000000)"}}>
                    <Box sx={{mx: 2}}  className="info">
                        <Chip  sx={{width: "min-content",fontSize: 20,zIndex: 4, backgroundColor: "rgba(0,0,0, 1)"}} color="secondary" label={"Explore by the genre"}/>
                        <HeaderMovieInfoSkeleton noDesc/>
                        <Stack sx={{display: {xs: "none", sm:"flex"}}} zIndex={4} direction={"row"}  spacing={1}>
                            <CustomSwiperBtn disabled prev/>
                            <CustomSwiperBtn disabled/>                    
                        </Stack>
                    </Box>        
    </Box>  
    //if(index != 0) return null      
    if(data == undefined || !isMatch || (isLoading && index != 0)) return null        
    if(data != undefined && data.results.length == 0 ) return null



    return (
        <Swiper
            onSlideChange={handleSlideChange} 
            onSwiper={setSwiperRef}
            pagination={{
                clickable: true,
            }}
            speed={1000}
            className="swiper-header-home"
            slidesPerView={1}
            loop
            modules={[EffectFade,  Pagination]}
            effect="fade"
            breakpoints={{
                600: {
                    allowTouchMove: false
                }
            }}
        >
            {data?.results.slice(0,6).map((movie: TV & Movie) => {
            const {backdrop_path, title} = movie
                return <SwiperSlide style={{background: backdrop_path ? "" : "linear-gradient(to bottom, #00925d, #526525, #503c19, #321d18, #000000)"}} key={movie.id + "-watch-by-genre-block"}>
                        <HeaderContainer sx={{minHeight: "70vh", zIndex: 4}} maxWidth="xl">                            
                            <Box className="info" >
                                <Chip  sx={{width: "min-content",fontSize: 20,zIndex: 4, backgroundColor: "rgba(0,0,0, 1)"}} color="secondary" label={"Explore by the genre"}/>
                                <HeaderMovieInfo rating noDesc {...movie}/> 
                                <Stack sx={{display: {xs: "none", sm:"flex"}}} zIndex={4} direction={"row"}  spacing={1}>
                                    <CustomSwiperBtn disabled={isBeginning} prev onClick={handlePrevious}/>
                                    <CustomSwiperBtn disabled={isEnd}  onClick={handleNext}/>                    
                                </Stack>
                            </Box>                         
                            {backdrop_path && <ImageHeader  src={`http://image.tmdb.org/t/p/original${backdrop_path}`} alt={title}/>}
                        </HeaderContainer>                    
            </SwiperSlide>})}
        </Swiper>
   )
    }
    //GenreMoviesDisplay.displayName = 'SwiperSlide';
    export default GenreMoviesDisplay