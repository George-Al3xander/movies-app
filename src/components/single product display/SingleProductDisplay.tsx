import { Box, Container, Stack, Typography } from "@mui/material"
import { useParams } from "react-router-dom"
import { fetchFromTmdb } from "../../utils"
import { useQuery } from "@tanstack/react-query"
import { BelongsToCollection, Movie, MovieDetails, TV, TvShowDetails } from "../../types/tmdb"
import SDPHeader from "./SPDHeader"
import CastDisplay from "./CastDisplay"
import BackdropSlider from "../horizontal/backdrop/BackdropSlider"
import SDPTabs from "./SDPTabs"



const Collection = (props:BelongsToCollection | undefined) => {
    if(props == undefined || Object.keys(props).length == 0) return null
    const {name,id} = props
      
    return (<BackdropSlider  title={name} apiUrl={`https://api.themoviedb.org/3/collection/${id}`} />)
}


const  SingleProductDisplay = () => {
    const path = window.location.hash.replace("#", "")
    const {id} = useParams();
    const apiLink = `https://api.themoviedb.org/3${path}`
    const fetch = async () => await fetchFromTmdb(apiLink)  as MovieDetails & TvShowDetails 
    const {data,isLoading,isError} = useQuery({queryKey: ["single-product-display", path, apiLink], queryFn: fetch})
   
    if(isLoading) return "Loading..."
    if(isError) return "ERORR"
    const {overview} = data!
    return(<Box  key={`single-product-${id}`}>       
       <SDPHeader product={data!} />
       <Container sx={{mt:4}} maxWidth="xl">
            <Stack direction={"column"} spacing={2}>
                <Typography variant="h6">Story line</Typography>
                <Typography sx={{opacity: ".7"}} variant="subtitle1" fontSize={16}>{overview}</Typography>
            </Stack> 
            <CastDisplay apiLink={apiLink}/>
            <SDPTabs data={data} apiLink={apiLink}/>
            <Collection {...data!.belongs_to_collection!}/>
            <BackdropSlider apiUrl={`${apiLink}/recommendations`} title="Simillar Movies for you"/>
       </Container>       
    </Box>)
}

export default  SingleProductDisplay