import { Box, Container, Stack, Typography} from "@mui/material"
import useGetUpcoming from "../../hooks/useGetUpcoming"
import MRHeader from "./MRHeader"
import MRMenu from "./MRMenu"
import MRItems from "./MRItems"
import MRSkeleton from "../skeleton/MRSkeleton"
import { BiSolidCameraMovie } from "react-icons/bi";


const MovieRelease = () => {

    const {handleRegionChange, handleYearChange,isLoading, isEmpty,isError,result} = useGetUpcoming()

    

    return(<Box  className="movie-release">
        <MRHeader />
        <Container sx={{my: 2}} maxWidth="xl">
            <MRMenu handleRegionChange={handleRegionChange} handleYearChange={handleYearChange} />
            {isLoading ?
            <MRSkeleton />
            :
            (isEmpty || isError) ?
            <Stack alignItems={"center"} spacing={1} direction="column" sx={{py: 4, opacity: ".7"}}>
               <BiSolidCameraMovie size={60}/>
               <Typography  fontStyle="italic"  fontSize={20}  variant="body2">No movies will be released within the date and region you specified</Typography>
            </Stack>
            :
            <MRItems items={result}/>
            }
        </Container>
    </Box>)
}

export default MovieRelease