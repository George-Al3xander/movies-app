import { Box, Container, Typography } from "@mui/material"
import { HeaderContainer } from "../styled/styled"
 
import HeaderBg from "../../assets/bg/stock-bg-1.jpg"



const MovieRelease = () => {




    return(<Box>
        <HeaderContainer shadowStrong maxWidth="xl" sx={{
            backgroundSize: "cover",backgroundImage: `url(${HeaderBg})`,
           // backgroundColor: "red"
          
            }}>
                <Typography>Danb</Typography>
        </HeaderContainer>

        <Container maxWidth="xl">
Damn
        </Container>
    </Box>)
}

export default MovieRelease