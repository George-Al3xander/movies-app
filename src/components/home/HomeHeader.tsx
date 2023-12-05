import { useQuery } from "@tanstack/react-query"
import TopBar from "../topbar/TopBar"
import { fetchOptions } from "../../App"
import {  PopularMovies } from "../../types/tmdb"
import { useState } from "react"
import { Box, Stack} from "@mui/material"
import {useRecoilValue} from "recoil"
import HomeMovie from "./HomeMovie"
import { sliderIndex } from "../state/atoms/data"
import SliderControls from "./SliderControls"


const HomeHeader = () => {
    const getMovies =  async () => {
        const response = await fetch('https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc', fetchOptions)
        const data = await response.json() as PopularMovies
        return data.results.slice(0,6)
    }

    


    const {data, isLoading, isError} = useQuery({queryKey: ["header-movies"], queryFn: getMovies})

    const [currentIndex,setCurrentIndex] = useState(0)
    //console.log(currIndex)
    
    if(isLoading) {
        return "Loading..."
    }
    
    if(isError) {
        return "Error..."
    }
    
    //const current = data![currIndex]


    /*

    primary color = #00925D;
    font default = 'Kanit', sans-serif;

    --------header cool stuff---------
    
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    box-shadow: 
        inset 0px 5rem  2rem -10px rgba(0,0,0,.7),
        inset 0px -10rem  2rem -10px rgba(0,0,0,.7);
    --------------------------------
    */
   

    return(<Box sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        px: 2,
        minHeight: "29rem",
        // backgroundImage: {
        //     xs: `url(http://image.tmdb.org/t/p/original${current.poster_path})`, 
        //     sm: `url(http://image.tmdb.org/t/p/original${current.backdrop_path})`
        // },
        position: "relative",
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        // boxShadow: 
        //     `inset 0px 5rem  2rem -10px rgba(0,0,0,.7),
        //     inset 0px -10rem  2rem -10px rgba(0,0,0,.7)`,
        animation: "mymove 5s",
        animationDelay: "5s",
        animationTimingFunction: "ease-in-out",

        //animation-timing-function: ease-in-out;
        //-webkit-animation-timing-function: ease-in-out;
        isolation: "isolate",
        '&::before': {
            content: '""',
            position: "absolute",
            inset: '0',
            //opacity: ".7",
            zIndex:"2",
            background: "linear-gradient(0deg, rgba(0,0,0, .7) 40%, rgba(0,0,0, .3)) 90%",
        }

        }}>        
       <TopBar />
       <Box  sx={{
        display: "flex",
        flexDirection: "column"}}>
            <HomeMovie movies={data!}/>
            <SliderControls />        
       </Box>
    </Box>)
}

export default HomeHeader