import { useQuery } from "@tanstack/react-query"
import TopBar from "../topbar/TopBar"
import { fetchOptions } from "../../App"
import { Movie, MovieLists, PopularMovies } from "../../types/tmdb"
import { useState } from "react"
import { Box, Button, Typography } from "@mui/material"
import { FaPlayCircle } from "react-icons/fa";
import { CiBookmark } from "react-icons/ci";



const HomeHeader = () => {

    const getMovies =  async () => {
        const response = await fetch('https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc', fetchOptions)
        const data = await response.json() as PopularMovies
        return data.results.slice(0,6)
    }

    


    const {data, isLoading, isError} = useQuery({queryKey: ["header-movies"], queryFn: getMovies})

    const [currentIndex,setCurrentIndex] = useState(0)

    if(isLoading) {
        return "Loading..."
    }

    if(isError) {
        return "Error..."
    }

    const current = data![currentIndex]

   

    return(<header style={{backgroundImage: `url(http://image.tmdb.org/t/p/original${current.backdrop_path})`}}>
       <TopBar />
       {/* {data!.map((movie) => {
        return (<img src={`http://image.tmdb.org/t/p/original${movie.backdrop_path}`} alt={movie.title} />)
       })} */}
       {/* <Box sx={{display: "flex", flexDirection: "column", gap: "1rem"}}>
            <span>blah blah</span>
            <Typography  variant="caption">{current.overview}</Typography>
       </Box> */}
       <div className="header-info">
            <Typography variant="h4">{current.title}</Typography>  
            <span className="sum">Lorem ipsum dolor sit.</span>
            <p>{current.overview}</p>
            <div className="buttons">
                <Button size="small" variant="contained"><FaPlayCircle/> Watch trailer</Button>
                <Button size="small" variant="outlined"><CiBookmark /> Add Watchlist</Button>
            </div>
       </div>
       <button onClick={() => {
        setCurrentIndex((prev) => {
            if(prev + 1 > 5) return 0 
            return prev + 1
        })}}>Next</button>
    </header>)
}

export default HomeHeader