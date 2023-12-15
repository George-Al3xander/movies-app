import TopBar from "../topbar/TopBar"
import { HomeHeaderBox } from "../styled/styled"
import HeaderMoviesSwiper from "./header/swiper/HeaderMoviesSwiper"



const HomeHeader = () => {
    

    return(<HomeHeaderBox>
        <TopBar />       
       <HeaderMoviesSwiper apiUrl='https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc'/>
    </HomeHeaderBox>)

     
}

export default HomeHeader