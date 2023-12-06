import { Alert, Box, Button, ButtonGroup, Skeleton, Stack, Typography } from "@mui/material"
import { CiBookmark } from "react-icons/ci"
import { FaPlayCircle } from "react-icons/fa"
import { Movie, PopularMovies } from "../../../types/tmdb"
import { useRecoilValue } from "recoil"
import { sliderIndex } from "../../state/atoms/data"
import { useRef } from "react"
import useAnimateSlide from "../../../hooks/useAnimateSlide"
import { useQuery } from "@tanstack/react-query"
import { fetchOptions } from "../../../App"
import SliderControls from "../SliderControls"
import HeaderMovieDisplay from "./HeaderMovieDisplay"
import HeaderMovieSkeleton from "./HeaderMovieSkeleton"


//top - 4~5rem
//bottom




   


const HeaderMovie = () => {
   

    const getMovies =  async () => {
        const response = await fetch('https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc', fetchOptions)
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

    return(<Box  sx={{
        display: "flex",
        flexDirection: "column"}}>
        <HeaderMovieDisplay movies={movies!}/>
        <SliderControls />        
   </Box>)
    
}

export default HeaderMovie