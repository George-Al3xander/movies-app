import { useQuery } from "@tanstack/react-query"
import { Images, Movie,  TV} from "../../types/tmdb"
import {  Box, Stack, Typography } from "@mui/material"

import { Genres, MovieRating, StyledSkeleton} from "../styled/styled"
import { fetchFromTmdb } from "../../utils"
import SliderTemp from "../SliderTemp"


const SkeletonItem = () => (<StyledSkeleton variant="rounded"  sx={{height:  {xs: "6rem",sm: "12rem"}}}/>)

interface HorizontalItemProps extends Movie, TV {}

const HorizontalItem = ({backdrop_path, vote_average, genre_ids,title, name, id}: HorizontalItemProps) => {
    
    
    const getMovies =  async () => {  
        const data = await fetchFromTmdb(`https://api.themoviedb.org/3/tv/${id}/images`) as Images
        return data.backdrops.filter((el) => el.iso_639_1 == "en")
    }

    const {data, isLoading, isError} = useQuery({queryKey: ["horizontal-item",id], queryFn: getMovies})

    

   
     
    return(<Stack spacing={1}> 
        {isLoading ?
        <StyledSkeleton height={300}/>
        :
        <img style={{borderRadius: "1rem"}}   src={`http://image.tmdb.org/t/p/w500${(data?.length! == 0 || isError) ?  backdrop_path : data![0]!.file_path}`} alt={title ? title : name} />
        }       
        <Box>
            <Typography fontSize={20} variant="h6">{title ? title : name}</Typography>
            <Stack alignItems={"start"} direction={"row"} spacing={.5}>
                <MovieRating fontSize={16}>{vote_average}</MovieRating>
                <Genres fontSize={16}  before={" | "} genre_ids={genre_ids}/>
            </Stack>
        </Box>
       
       
    </Stack>)
}

const HorizontalItems = ({apiUrl, title}:{apiUrl:string,title: string}) => {   
    return(<span className="horizontal-items"><SliderTemp apiUrl={apiUrl} title={title} ItemCoomp={HorizontalItem} LoadingItemCoomp={SkeletonItem}/></span>)
}

export default HorizontalItems