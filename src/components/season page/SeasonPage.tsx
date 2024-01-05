import {  Box, Button, Container, Stack, Typography } from "@mui/material"
import { NavLink, useParams } from "react-router-dom"
import { fetchFromTmdb } from "../../utils"
import { SeasonDetails } from "../../types/tmdb"
import { useQuery } from "@tanstack/react-query"
import { PropagateLoader } from "react-spinners"
import Err404 from "../Err404"
import SeasonPageHeader from "./SeasonPageHeader"
import SeasonTabs from "./SeasonTabs"
import { RiMovie2Fill } from "react-icons/ri";

//Works for the review page pagination
// const [searchParams, setSearchParams] = useSearchParams();
// console.log(searchParams.get("page"))



const SeasonPage = () => {   
    const path = window.location.hash.replace("#", "");
    const {id, seasonNumber} = useParams()
    const apiLink = `https://api.themoviedb.org/3${path}`    
    const fetch = async () => await fetchFromTmdb(apiLink)  as SeasonDetails
    const {data,isLoading,isError} = useQuery({queryKey: ["season-details", id,seasonNumber,apiLink, path], queryFn: fetch, refetchOnWindowFocus:false})
    if(isLoading) return <Stack justifyContent={"center"} alignItems={"center"} width={"100vw"} height={"80vh"}>
        <PropagateLoader color="var(--clr-primary)"/>
    </Stack>
    if(isError || data == undefined) return <Err404 />
    const {overview,episodes} = data
    

    return (<Box>     
        <SeasonPageHeader {...data} apiLink={apiLink}/>
        <Container   maxWidth="xl">
            <Stack sx={{pt:4,mb: 4, borderTop: '1px solid white'}} direction={"column"} spacing={2}>
                <Typography variant="h6">Story line</Typography>
                <Typography sx={{opacity: ".7"}} variant="subtitle1" fontSize={16}>{overview}</Typography>
            </Stack>             
            <SeasonTabs apiLink={apiLink} episodes={episodes}/>
            <Box sx={{mt: 10, textAlign: "center"}}>
                <NavLink  to={"/tv/"+episodes[0].show_id}>
                    <Button variant="outlined" startIcon={<RiMovie2Fill />}>Go back to the shows page</Button>
                </NavLink>
            </Box>
       </Container>   
                
    </Box>)
}

export default SeasonPage