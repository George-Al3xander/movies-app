import { Stack } from "@mui/material"
import { useParams } from "react-router-dom"
import { fetchFromTmdb } from "../../utils"
import { SeasonDetails } from "../../types/tmdb"
import { useQuery } from "@tanstack/react-query"
import { PropagateLoader } from "react-spinners"
import Err404 from "../Err404"


//Works for the review page pagination
// const [searchParams, setSearchParams] = useSearchParams();
// console.log(searchParams.get("page"))


const SeasonPage = () => {
    const {id,seasonNumber} = useParams()   
    const path = window.location.hash.replace("#", "")
    const apiLink = `https://api.themoviedb.org/3${path}`
    //console.log(apiLink)
    const fetch = async () => await fetchFromTmdb(apiLink)  as SeasonDetails
    const {data,isLoading,isError} = useQuery({queryKey: ["season-details", apiLink], queryFn: fetch, refetchOnWindowFocus:false})
    if(isLoading) return <Stack justifyContent={"center"} alignItems={"center"} width={"100vw"} height={"80vh"}>
        <PropagateLoader color="var(--clr-primary)"/>
    </Stack>
    if(isError) return <Err404 />
    
    return <div>      
        {data?.name}
    </div>
}

export default SeasonPage