import { useQuery } from "@tanstack/react-query"
import TopBar from "../topbar/TopBar"
import { fetchOptions } from "../../App"
import { Movie } from "../../types/tmdb"

type fetchResult = {
    results: Movie[]
}

const HomeHeader = () => {

    const getMovies =  async () => {
        const response = await fetch('https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc', fetchOptions)
        const data = await response.json() as fetchResult
        return data
    }


    const {data, isLoading, isError} = useQuery({queryKey: ["header-movies"], queryFn: getMovies})

    if(isLoading) {
        return "Loading..."
    }

    if(isError) {
        return "Error..."
    }

    console.log(data)

    return(<header>
       <TopBar />
       {data?.results.map((movie) => {
        return <li>{movie.title}</li>
       })}
    </header>)
}

export default HomeHeader