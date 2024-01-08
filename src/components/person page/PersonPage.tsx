import { Box, Container, Stack } from "@mui/material"
import { useParams } from "react-router-dom"
import useApiLink from "../../hooks/useApiLink"
import { fetchFromTmdb } from "../../utils";
import { PersonDetails } from "../../types/tmdb";
import { PropagateLoader } from "react-spinners";
import { useQuery } from "@tanstack/react-query";
import Err404 from "../Err404";
import PersonSideBlock from "./PersonSideBlock";
import PersonMainBlock from "./main block/PersonMainBlock";




const PersonPage = () => {
    const {id,apiLink} = useApiLink();
    
    const fetch = async () => await fetchFromTmdb(apiLink)  as PersonDetails
    const {data,isLoading,isError} = useQuery({queryKey: ["person-display",  apiLink,id], queryFn: fetch})

    if(isLoading) return <Stack justifyContent={"center"} alignItems={"center"} width={"100vw"} height={"80vh"}>
        <PropagateLoader color="var(--clr-primary)"/>
    </Stack>
    if(isError || data == undefined) return <Err404 />
    

    return(<Container maxWidth="xl">      
        {/* <PersonHeader /> */}
        <Stack sx={{mt:15}} direction={{xs: "column",sm: "row"}} spacing={5}>
            <PersonSideBlock {...data}/>
            <PersonMainBlock {...data}/>
        </Stack>
    </Container>)
}

export default PersonPage