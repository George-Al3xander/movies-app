import { Box, Container, MenuItem, Select, Stack, Typography } from "@mui/material"
import { HeaderContainer } from "../styled/styled"
 
import HeaderBg from "../../assets/bg/stock-bg-1.jpg"
import SelectElement from "./SelectElement"
import useGetUpcoming from "../../hooks/useGetUpcoming"



const MovieRelease = () => {

    const {handleRegionChange} = useGetUpcoming()


    return(<Box>
        <HeaderContainer shadowStrong maxWidth="xl" sx={{
            backgroundSize: "cover",backgroundImage: `url(${HeaderBg})`,
        }}>
        <Stack maxWidth={{sm:"50%"}} marginBlock={"auto 5%"} zIndex={4} direction={"column"} spacing={2}>
            <Typography textTransform={"capitalize"} fontWeight={"600"} variant="h3">Schedule release all movie around the world</Typography>
            <Typography sx={{opacity: ".7"}} variant="subtitle2">Get up to date to movie schedule release all around the world</Typography>
        </Stack>
        </HeaderContainer>

        <Container sx={{my: 2}} maxWidth="xl">
        <Box sx={{display: "flex", alignContent: "center", justifyContent: "space-between"}}>
            <Typography variant="h6" fontWeight={"600"} textTransform={"uppercase"}>Upcoming release</Typography>
           
            <Stack>
              <SelectElement />            
            </Stack>
        </Box>
        </Container>
    </Box>)
}

export default MovieRelease