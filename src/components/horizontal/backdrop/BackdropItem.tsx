import { useQuery } from "@tanstack/react-query"
import { Images, Movie,  TV} from "../../../types/tmdb"
import {  Box, Stack, Typography } from "@mui/material"
import { Genres, MovieRating, StyledSkeleton} from "../../styled/styled"
import { fetchFromTmdb } from "../../../utils"



interface BackdropItemProps extends Movie, TV {}

const BackdropItem = ({backdrop_path, vote_average, genre_ids,title, name, id}: BackdropItemProps) => {


const getMovies =  async () => {  
    const data = await fetchFromTmdb(`https://api.themoviedb.org/3/${title ? "movie" : "tv"}/${id}/images`) as Images
    return data.backdrops.filter((el) => el.iso_639_1 == "en")
}

const {data, isLoading, isError} = useQuery({queryKey: ["horizontal-item", "backdrop",id], queryFn: getMovies})




    
return(<Stack spacing={1}> 
    {isLoading ?
    <StyledSkeleton height={300}/>
    :
    backdrop_path ?

    <img style={{borderRadius: "1rem"}}   src={`http://image.tmdb.org/t/p/w500${(data?.length! == 0 || isError) ?  backdrop_path : data![0]!.file_path}`} alt={title ? title : name} />
    :
    <Box sx={{borderRadius: 1, display: "flex",justifyContent: "center",alignItems: "center", width: "100%", minHeight: "10rem",height: "auto", background: "linear-gradient(to bottom, #00925d, #526525, #503c19, #321d18, #000000)"}}>
            <Typography  fontSize={18} textTransform="uppercase" fontStyle="italic" variant="subtitle2">No poster </Typography>
        </Box>
    }       
    <Box>
        <Typography fontSize={20} variant="h6">{title ? title : name}</Typography>
        <Stack alignItems={"start"} direction={"row"} spacing={.5}>
            <MovieRating fontSize={16}>{vote_average}</MovieRating>
            <Genres isTv={title == undefined} fontSize={16}  before={" | "} genre_ids={genre_ids}/>
        </Stack>
    </Box>
    
    
</Stack>)
}

export default BackdropItem