import { useSetRecoilState } from "recoil";
import { genres$ } from "../../../state/atoms/data";
import { fetchOptions } from "../../../../App";
import { Genre, PopularMovies } from "../../../../types/tmdb";
import HeaderMovieSkeleton from "../../../skelton/HeaderMovieSkeleton";
import { useQuery } from "@tanstack/react-query";
import { Alert} from "@mui/material";
import { HeaderMovieContainer, ImageHeader } from "../../../styled/styled";
import HeaderMovieInfo from "./HeaderMovieInfo";
import { Swiper, SwiperSlide } from "swiper/react"
import { EffectFade, Pagination} from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';


const HeaderMoviesSwiper = ({apiUrl}:{apiUrl: string}) => {
    const setGenres = useSetRecoilState(genres$)

    const fetchGenre = async (link: string) => {
        try {
          return (await (await fetch(link, fetchOptions)).json()).genres as Genre[]   
        } catch (error) {            
            return [] as Genre[]
        }
      }

    const getGenres = async () => {      
        try {
            const movie = await fetchGenre('https://api.themoviedb.org/3/genre/movie/list?language=en')
            const tv = await fetchGenre('https://api.themoviedb.org/3/genre/tv/list?language=en')
            setGenres(movie.concat(tv));           
        } catch (error) {
            console.log(error)
        }            
    }

    const getMovies =  async () => {
        await getGenres()
        const response = await fetch(apiUrl, fetchOptions)
        const data = await response.json() as PopularMovies
        return data.results.slice(0,6)
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
            return <SwiperSlide>
                    <HeaderMovieContainer>
                        <ImageHeader src={`http://image.tmdb.org/t/p/original${movie.backdrop_path}`} alt={movie.title}/>
                        <HeaderMovieInfo movie={movie}/>     
                    </HeaderMovieContainer>
                
        </SwiperSlide>})}
    </Swiper>    
    </>)
}


export default HeaderMoviesSwiper