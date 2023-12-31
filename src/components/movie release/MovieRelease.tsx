import { Box, Container} from "@mui/material"

import useGetUpcoming from "../../hooks/useGetUpcoming"
import MRHeader from "./MRHeader"
import MRMenu from "./MRMenu"
import MRItems from "./MRItems"




const MovieRelease = () => {

    const {handleRegionChange, handleYearChange,isLoading, isEmpty,isError,result} = useGetUpcoming()


    return(<Box>
        <MRHeader />
        <Container sx={{my: 2}} maxWidth="xl">
            <MRMenu handleRegionChange={handleRegionChange} handleYearChange={handleYearChange} />
            {isLoading ?
            "Wait"
            :
            (isEmpty || isError) ?
            "No results by that reach"
            :
            <MRItems items={result}/>
            }
        </Container>
    </Box>)
}

export default MovieRelease