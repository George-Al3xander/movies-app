import { useQuery } from "@tanstack/react-query"
import { fetchOptions } from "../../App"
import { Movie, PopularMovies, TV, TrendingMediaType, TrendingResults } from "../../types/tmdb"
import { Alert, Box, Stack, Typography } from "@mui/material"
import ItemsVertical from "../vertical/ItemsVertical"
import { Genres, MovieRating, VerticalItemInfo } from "../styled/styled"

const HorizontalItem = ({movie}: {movie: Movie, index: number}) => {
    const {backdrop_path, vote_average, genre_ids,title} = movie

    return(<Stack spacing={1}>        
        <img style={{borderRadius: "1rem"}}   src={`http://image.tmdb.org/t/p/w500${backdrop_path}`} alt={title} />
        <Box>
            <Typography fontSize={20} variant="h6">{title}</Typography>
            <Stack alignItems={"start"} direction={"row"} spacing={.5}>
                <MovieRating fontSize={16}>{vote_average}</MovieRating>
                <Genres fontSize={16}  before={" | "} genre_ids={genre_ids}/>
            </Stack>
        </Box>
       
       
    </Stack>)
}


const HorizontalItems = ({apiUrl, title}:{apiUrl:string,title: string}) => {
    // const getMovies =  async () => {
    //     const response = await fetch(apiUrl, fetchOptions)
    //     const data = await response.json() as PopularMovies & TrendingResults<TrendingMediaType>
    //     if(data.results.some((el) => el.media_type)) {
    //         return data.results.filter((el) => el.media_type == "movie" || el.media_type == "tv")            
    //     } else {
    //         return data.results 
    //     }
    // }

    // const {data: movies, isLoading, isError} = useQuery({queryKey: ["vertical-movies", title], queryFn: getMovies})

    
    
    // if(isLoading) {
    //     return "Loading"
    // }
    
    // if(isError) {
    //     return <Alert severity="error">Failed to fetch movies, try reloading page!</Alert>
    // }
     

    return(<span className="horizontal-items"><ItemsVertical spaceBetween={20} apiUrl={apiUrl} title={title} CustomItem={HorizontalItem} /></span>)
}

export default HorizontalItems