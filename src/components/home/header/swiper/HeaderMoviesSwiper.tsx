import { fetchFromTmdb,  tmdbImage } from "../../../../utils";
import { Movie, PopularMovies,  SimilarTvShows, TV } from "../../../../types/tmdb";
import HeaderMovieSkeleton from "../../../skeleton/HeaderMovieSkeleton";
import { useQuery } from "@tanstack/react-query";
import { Alert} from "@mui/material";
import { HeaderContainer, ImageHeader } from "../../../styled/styled";
import HeaderMovieInfo from "./HeaderMovieInfo";
import { Swiper, SwiperSlide } from "swiper/react"
import { EffectFade, Pagination} from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';


const HeaderMoviesSwiper = ({apiUrl}:{apiUrl: string}) => {
    

    const getMovies =  async () => {         
        const data = await fetchFromTmdb(apiUrl) as PopularMovies | SimilarTvShows
        return data.results.slice(0,6) as (Movie & TV)[]
    }

    const {data: movies, isLoading, isError} = useQuery({queryKey: ["header-movies"], queryFn: getMovies})

    if(isLoading) {
        return <HeaderMovieSkeleton />
    }
    
    if(isError) {
        return <Alert severity="error">Failed to fetch header info, try reloading page!</Alert>
    }

    return(<>
    <Swiper
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
        {movies?.map((movie) => {
            return <SwiperSlide key={movie.id + "header"}>
                    <HeaderContainer sx={{minHeight: "70vh"}} maxWidth="xl">
                        <ImageHeader src={tmdbImage(movie.backdrop_path)} alt={movie.title}/>
                        <HeaderMovieInfo {...movie}/>                          
                    </HeaderContainer>
                
        </SwiperSlide>})}
    </Swiper>    
    </>)
}


export default HeaderMoviesSwiper