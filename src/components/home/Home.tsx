import { Box, Modal } from "@mui/material"
import HomeHeader from "./HomeHeader"

import OrderedTop from "../ordered top/OrderedTop"
import ItemsVertical from "../vertical/ItemsVertical"
import HorizontalItems from "../horizontal/HorizontalItems"
import CardsBlock from "./cards block/CardsBlock"




const Home = () => {


    return(<Box>
        <HomeHeader apiUrl={'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc'}/>
        {/* <ItemsVertical title={"still in theaters"} apiUrl='https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1'/>         */}
        {/* <OrderedTop title="top of the week" apiUrl="https://api.themoviedb.org/3/trending/all/week?language=en-US"/> */}
        <CardsBlock apiUrl={`https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=${Math.floor(Math.random() * (100 - 1) + 1)}`}/>
        {/* <HorizontalItems title="Series" apiUrl='https://api.themoviedb.org/3/tv/top_rated'/> */}
        {/* <ItemsVertical title={"top rated"} apiUrl='https://api.themoviedb.org/3/movie/top_rated'/>         */}
    </Box>)
}

export default Home