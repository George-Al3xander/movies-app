import { Chip, Stack, Typography } from "@mui/material"
import { HeaderContainer,  StyledSkeleton } from "../styled/styled"
import { MovieDetails, Reviews, TvShowDetails } from "../../types/tmdb"
import { fetchFromTmdb, tmdbImage } from "../../utils"
import { UseQueryResult, useQuery } from "@tanstack/react-query"
import { NavLink } from "react-router-dom"


const handleBg = (query: UseQueryResult<MovieDetails & TvShowDetails, Error>) => {
    const {data,isLoading,isError} = query
    if(data && data.backdrop_path  && !isLoading && !isError) {        
        return  `url(${tmdbImage(data.backdrop_path)})`             
    }

    return "linear-gradient(to bottom, #00925d, #526525, #503c19, #321d18, #000000)"
}

interface Props extends Reviews{

}


const ReviewsPageHeader = ({total_results} : Props) => {
    const path = window.location.hash.replace("#", "") .split("?")[0].replace("/reviews", "")   
    const apiLink = `https://api.themoviedb.org/3${path}`
    const fetch = async () => await fetchFromTmdb(apiLink)  as MovieDetails & TvShowDetails 

    const queryRes = useQuery({queryKey: ["reviews-page-header", path, apiLink], queryFn: fetch})
    const {data,isLoading, isError} = queryRes

    return(<HeaderContainer  shadowStrong maxWidth="xl" sx={{
        backgroundSize: "cover",backgroundPosition: "center",backgroundImage: handleBg(queryRes),
    }}>

        <Stack  marginBlock={"auto 1rem"} zIndex={4} direction={"column"} spacing={2}>
           
            <Chip sx={{width: "min-content", fontSize: 14, textTransform: "uppercase"}} color="info" label={(path.split("/")[1] == "movie" ? "movie" : "series")}/>
            {isLoading  ?
            <StyledSkeleton width={"30ch"} variant="text" height={50}/>
            :
            <Typography textTransform={"capitalize"} fontWeight={"600"} variant="h3">
                Reviews{!isError && <NavLink  to={path}>{": "+(data?.title ? data.title : data?.name)}</NavLink>} 
            </Typography>
            }
            <Stack direction="row" alignItems={"center"}  spacing={2}>                
                <Typography sx={{opacity: ".7"}} variant="subtitle1">{total_results} review{total_results == 1 ? "" : "s"}</Typography>        
            </Stack>           
        </Stack>
    </HeaderContainer> )
}

export default ReviewsPageHeader