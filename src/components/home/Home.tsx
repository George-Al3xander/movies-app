import { Box } from "@mui/material"
import HomeHeader from "./HomeHeader"
import ItemsVertical from "../vertical/ItemsVertical"




const Home = () => {


    return(<Box>
        <HomeHeader/>
        <ItemsVertical title={"still in theaters"} apiUrl='https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1'/>
    </Box>)
}

export default Home