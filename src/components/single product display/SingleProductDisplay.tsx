import { Box, Container, Stack, Typography } from "@mui/material"
import { useParams } from "react-router-dom"
import { fetchFromTmdb } from "../../utils"
import { useQuery } from "@tanstack/react-query"
import { BelongsToCollection, Credits, MovieDetails,  TvShowDetails } from "../../types/tmdb"
import SDPHeader from "./SPDHeader"
import PeopleDisplay from "./PeopleDisplay"
import BackdropSlider from "../horizontal/backdrop/BackdropSlider"

import { PropagateLoader} from "react-spinners"
import Err404 from "../Err404"
import Tabs from "./Tabs"
import useApiLink from "../../hooks/useApiLink"




const Collection = (props:BelongsToCollection | undefined) => {
    if(props == undefined || Object.keys(props).length == 0) return null
    const {name,id} = props;
      
    return (<BackdropSlider  title={name} apiUrl={`https://api.themoviedb.org/3/collection/${id}`} />)
}


const  SingleProductDisplay = () => {
    const {id,apiLink} = useApiLink()

    
    const fetch = async () => await fetchFromTmdb(apiLink+"?append_to_response=credits")  as MovieDetails & TvShowDetails & {credits:Credits}
    const {data,isLoading,isError} = useQuery({queryKey: ["single-product-display",  apiLink], queryFn: fetch})
    if(isLoading) return <Stack justifyContent={"center"} alignItems={"center"} width={"100vw"} height={"80vh"}>
        <PropagateLoader color="var(--clr-primary)"/>
    </Stack>
    if(isError || data == undefined) return <Err404 />

    

    const {overview} = data
    return(<Box  key={`single-product-${id}`}>       
       <SDPHeader product={data!} />
       <Container sx={{mt:4}} maxWidth="xl">
            <Stack direction={"column"} spacing={2}>
                <Typography variant="h6">Story line</Typography>
                <Typography sx={{opacity: ".7"}} variant="subtitle1" fontSize={16}>{overview}</Typography>
            </Stack> 
            <PeopleDisplay title="Top Cast" apiLink={`${apiLink}/credits`}/>
            <Tabs apiLink={apiLink} data={data}/>
            <Collection {...data!.belongs_to_collection!}/>
            <BackdropSlider apiUrl={`${apiLink}/recommendations`} title="Simillar Movies for you"/>
       </Container>       
    </Box>)
}

export default  SingleProductDisplay