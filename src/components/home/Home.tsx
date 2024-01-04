import { Box, Modal } from "@mui/material"
import HomeHeader from "./HomeHeader"

import OrderedTop from "../horizontal/ordered top/OrderedTop"
import PosterSlider from "../horizontal/poster/PosterSlider"
import BackdropSlider from "../horizontal/backdrop/BackdropSlider"
import CardsBlock from "../cards block/CardsBlock"
import VerticalItemsBlock from "../vertical/VerticalItemsBlock"
import WatchByGenre from "../by genre block/WatchByGenreBlock"




const Home = () => {


    return(<Box>
        <HomeHeader apiUrl={'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc'}/>
        {/* <PosterSlider title={"still in theaters"} apiUrl='https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1'/>         */}
        {/* <OrderedTop title="top of the week" apiUrl="https://api.themoviedb.org/3/trending/all/week?language=en-US"/> */}
        <CardsBlock apiUrl={`https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=${Math.floor(Math.random() * (100 - 1) + 1)}`}/>
        <BackdropSlider title="Series" apiUrl='https://api.themoviedb.org/3/tv/top_rated'/>
        {/* <WatchByGenre /> */}
        {/* <PosterSlider title={"top rated"} apiUrl='https://api.themoviedb.org/3/movie/top_rated'/>         */}
        {/* <VerticalItemsBlock content={[{title: "Col 1", apiUrl: "https://api.themoviedb.org/3/tv/top_rated"}, {title: "Col 2", apiUrl: "https://api.themoviedb.org/3/tv/top_rated"}, {title: "Col 3", apiUrl: "https://api.themoviedb.org/3/tv/top_rated"}]} /> */}
    </Box>)
}

export default Home