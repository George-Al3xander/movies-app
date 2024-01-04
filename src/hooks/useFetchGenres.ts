import { useQuery } from "@tanstack/react-query"
import { useSetRecoilState } from "recoil"
import { genresMovie$, genresTv$ } from "../state/atoms/data"
import { fetchFromTmdb } from "../utils"
import { Genre } from "../types/tmdb"
import { useEffect } from "react"




const useFetchGenre = () => {

    const setGenresTv = useSetRecoilState(genresTv$)
    const setGenresMovie = useSetRecoilState(genresMovie$)

    const fetchGenre = async (link: string) => {
        try {
          return (await (await fetchFromTmdb(link))).genres as Genre[]   
        } catch (error) {            
            return [] as Genre[]
        }
    }

    const getGenres = async () => {      
        try {
            const movie = await fetchGenre('https://api.themoviedb.org/3/genre/movie/list?language=en')
            const tv = await fetchGenre('https://api.themoviedb.org/3/genre/tv/list?language=en')
            setGenresMovie(movie)         
            setGenresTv(tv)         
        } catch (error) {
            console.log(error)
        }            
    }

    const {data, isLoading, isError} = useQuery({queryKey: ["genres-initial-fetch"], queryFn: getGenres, refetchOnWindowFocus: false})

    return {isLoading}
}

export default useFetchGenre