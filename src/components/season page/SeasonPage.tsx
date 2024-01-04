import { Backdrop, Box, Container, Rating, Stack, Typography } from "@mui/material"
import { useParams } from "react-router-dom"
import { fetchFromTmdb, tmdbImage } from "../../utils"
import { Episode, SeasonDetails } from "../../types/tmdb"
import { useQuery } from "@tanstack/react-query"
import { PropagateLoader } from "react-spinners"
import Err404 from "../Err404"
import EpisodesDisplay from "./EpisodesDIsplay"
import SeasonPageHeader from "./SeasonPageHeader"
import SDPTabs, { TabProp } from "../single product display/SDPTabs"
import PeopleDisplay from "../single product display/PeopleDisplay"


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
    const {episodes,overview} = data
    const tabs :TabProp[] = [
        {
            title: "Episodes",
            Element: EpisodesDisplay,
            props: {
                episodes: episodes       
            }        
        },
        {   
            title: "Crew",
            Element: PeopleDisplay,
            props: {
                apiLink: `${apiLink}/credits`,
                crew: true
            }
        },
    ] 

    return (<Box>     
        <SeasonPageHeader {...data} apiLink={apiLink}/>
        <Container   maxWidth="xl">
            <Stack sx={{pt:4, borderTop: '1px solid white'}} direction={"column"} spacing={2}>
                <Typography variant="h6">Story line</Typography>
                <Typography sx={{opacity: ".7"}} variant="subtitle1" fontSize={16}>{overview}</Typography>
            </Stack>  
            {/* <Box sx={{mt:4, borderTop: '1px solid white'}}>
                <Typography sx={{my: 4}} variant="h6">Episodes</Typography>
                <EpisodesDisplay episodes={episodes}/>  
            </Box> */}
            <SDPTabs tabs={tabs}/>
       </Container>   
                
    </Box>)
}

export default SeasonPage