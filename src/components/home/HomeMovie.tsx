import { Box, Button, ButtonGroup, Stack, Typography } from "@mui/material"
import { CiBookmark } from "react-icons/ci"
import { FaPlayCircle } from "react-icons/fa"
import { Movie } from "../../types/tmdb"
import { useRecoilValue } from "recoil"
import { sliderIndex } from "../state/atoms/data"
import { useRef } from "react"
import useAnimateSlide from "../../hooks/useAnimateSlide"




const HomeMovie = ({movies}: {movies:Movie[]}) => {
    const currIndex = useRecoilValue(sliderIndex);
    const {title, overview, backdrop_path} = movies[currIndex]
    const imgUrl = `http://image.tmdb.org/t/p/original${backdrop_path}`
    const imgRef = useRef<HTMLImageElement>(null)
    const {url} = useAnimateSlide(imgRef, movies)

    return(<Stack sx={{maxWidth: {xs: "100%", sm: "60%"}}} >
    <img ref={imgRef} className={"fade-in-image"} style={{
        position: "absolute",
        top: "0",
        left: "0",
        width: "100%",
        height: "100%",
        objectFit: "cover",      
    }} src={url} alt={title} />
    <Stack sx={{zIndex: 4}} spacing={1} direction="column" >
        <Typography variant="h4">{title}</Typography>  
        <Typography fontSize={12} sx={{opacity: ".4"}} variant="caption">Lorem ipsum dolor sit.</Typography>
        <Typography sx={{
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        display: '-webkit-box',
        WebkitLineClamp: '3',
        WebkitBoxOrient: 'vertical',
    }} variant="subtitle1" fontSize={12}>{overview}</Typography>    
        <ButtonGroup sx={{display: "flex", justifyContent:{xs: "center", sm: "flex-start"}}}>
            <Button startIcon={<FaPlayCircle/>} size="small" variant="contained">Watch trailer</Button>
            <Button color="info" startIcon={<CiBookmark />} size="small" variant="outlined">Add Watchlist</Button>
        </ButtonGroup>
    </Stack>
</Stack>)
}

export default HomeMovie