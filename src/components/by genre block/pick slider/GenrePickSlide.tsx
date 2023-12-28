import { StyledSkeleton } from "../../styled/styled"
import { Genre, Movie, MovieDiscoverResult, TV, TvShowDiscoverResult } from "../../../types/tmdb"
import { Box, Typography } from "@mui/material"
import { SwiperSlide } from "swiper/react"
import { useQuery } from "@tanstack/react-query"
import { fetchFromTmdb } from "../../../utils"
import { useCheckGenreMatch, useWatchGenreCtx} from "../../../hooks/useWatchGenreCtx"
import { useEffect, useState } from "react"


interface GenrePickSlideProps extends Genre {
    index: number,
    onClick: Function
}

const GenrePickSlide = ({name, id, index, onClick}: GenrePickSlideProps) => {
    const [firstRender, setFirstRender] = useState(false)
    const {handleClick} = useWatchGenreCtx()
    const isMatch = useCheckGenreMatch(id)
    
    const getElems = async () => await fetchFromTmdb(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=${id}`) as MovieDiscoverResult & TvShowDiscoverResult

    const {data, isLoading} = useQuery({queryKey: ["genre-pick-slide", id, name], queryFn: getElems})
    
    useEffect(() => {
        if(data && index == 1) {
            handleClick({name,id,results: data.results.filter((el) => el.backdrop_path) as (Movie & TV)[]})

        }
    },[data])
    
    
    
    if(data == undefined) return null
    if(data != undefined && data.results.length == 0 ) return null
    
    const filtered =  data!.results.filter((el) => el.backdrop_path) as (Movie & TV)[]
    const click = () => {
        if(!isMatch) {
             handleClick({name,id,results: filtered})
        }
    }
    const {backdrop_path} = filtered[0];
    
    return(<SwiperSlide className={isMatch ? "active" : ""} onClick={() => {
        onClick()
        click()
    }}>
        <Box position={"relative"}>
        <Box position={"absolute"} zIndex={4} top={"40%"} left={0} right={0} ml={"auto"} mr={"auto"} textAlign={"center"}>
            <Typography  fontSize={20} variant="h6">{name}</Typography>
        </Box>

        {isLoading ?
        <StyledSkeleton height={300}/>
        :
        backdrop_path ?

        <img style={{borderRadius: "1rem", opacity: ".3"}}   src={`http://image.tmdb.org/t/p/w500${backdrop_path}`} alt={name} />
        :
        <Box sx={{borderRadius: 1, display: "flex",left:0,justifyContent: "center",alignItems: "center", width: "100%", minHeight: "8rem",height: "auto", background: "linear-gradient(to bottom, #00925d, #526525, #503c19, #321d18, #000000)"}}></Box>
        } 
        </Box>
    </SwiperSlide>)
}

GenrePickSlide.displayName = 'SwiperSlide';

export default GenrePickSlide