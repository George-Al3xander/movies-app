import TopBar from "../topbar/TopBar"
import { HomeHeaderBox } from "../styled/styled"
import HeaderMoviesSwiper from "./header/swiper/HeaderMoviesSwiper"
import { Box, Container } from "@mui/material"



const HomeHeader = ({apiUrl}:{apiUrl: string}) => {
    

    return(
        <Box>
            <TopBar />       
            <HeaderMoviesSwiper apiUrl={apiUrl}/>
        </Box>
    )

     
}

export default HomeHeader