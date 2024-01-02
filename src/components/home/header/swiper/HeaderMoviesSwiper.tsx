import { useSetRecoilState } from "recoil";
import { genresMovie$, genresTv$ } from "../../../../state/atoms/data";
import { fetchFromTmdb, fetchOptions } from "../../../../utils";
import { Genre, Movie, PopularMovies, PopularTvShowResult, SimilarTvShows, TV } from "../../../../types/tmdb";
import HeaderMovieSkeleton from "../../../skeleton/HeaderMovieSkeleton";
import { useQuery } from "@tanstack/react-query";
import { Alert, Container} from "@mui/material";
import { HeaderContainer, ImageHeader } from "../../../styled/styled";
import HeaderMovieInfo from "./HeaderMovieInfo";
import { Swiper, SwiperSlide } from "swiper/react"
import { EffectFade, Pagination} from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';


const HeaderMoviesSwiper = ({apiUrl}:{apiUrl: string}) => {
    const setGenresTv = useSetRecoilState(genresTv$)
    const setGenresMovie = useSetRecoilState(genresMovie$)

    const fetchGenre = async (link: string) => {
        try {
          return (await (await fetchFromTmdb(link))).genres as Genre[]   
        } catch (error) {            
            return [] as Genre[]
        }
    }

    const getGenres = async () => {      
        try {
            const movie = await fetchGenre('https://api.themoviedb.org/3/genre/movie/list?language=en')
            const tv = await fetchGenre('https://api.themoviedb.org/3/genre/tv/list?language=en')
            setGenresMovie(movie)         
            setGenresTv(tv)         
        } catch (error) {
            console.log(error)
        }            
    }

    const getMovies =  async () => {
        await getGenres()       
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
                        <ImageHeader src={`http://image.tmdb.org/t/p/original${movie.backdrop_path}`} alt={movie.title}/>
                        <HeaderMovieInfo {...movie}/>                          
                    </HeaderContainer>
                
        </SwiperSlide>})}
    </Swiper>    
    </>)
}


export default HeaderMoviesSwiper