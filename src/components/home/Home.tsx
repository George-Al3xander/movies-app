import { Box, Modal } from "@mui/material"
import HomeHeader from "./HomeHeader"
import ItemsVertical from "../vertical/ItemsVertical"
import CardsBlock from "./cards block/CardsBlock"




const Home = () => {


    return(<Box>
        {/* <HomeHeader/> */}
        <ItemsVertical title={"still in theaters"} apiUrl='https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1'/>        
        <CardsBlock apiUrl="https://api.themoviedb.org/3/movie/upcoming"/>
        {/* <ItemsVertical title={"top rated"} apiUrl='https://api.themoviedb.org/3/movie/top_rated'/>         */}
    </Box>)
}

export default Home