import { Movie } from "../../../types/tmdb";
import {sliderIndex } from "../../state/atoms/data";
import { useRecoilValue } from "recoil"
import { useRef } from "react"
import useAnimateSlide from "../../../hooks/useAnimateSlide"
import {Button, ButtonGroup, Stack, Typography } from "@mui/material"
import { FaPlayCircle } from "react-icons/fa";
import { CiBookmark } from "react-icons/ci";

import { Genres } from "../../styled/styled";



const HeaderMovieDisplay = ({movies}: {movies:Movie[]}) => {
    const currIndex = useRecoilValue(sliderIndex);
    const {title, overview, genre_ids, release_date} = movies[currIndex];
    const imgRef = useRef<HTMLImageElement>(null)
    const {url} = useAnimateSlide(imgRef, movies)
   

    return(<Stack sx={{maxWidth: {xs: "100%", sm: "60%"}}} >
        <img ref={imgRef} className={"fade-in-image"} style={{
            boxShadow: 
            `inset 0px 5rem  2rem -10px rgba(0,0,0,.7),
            inset 0px -10rem  2rem -10px rgba(0,0,0,.7)`,        
            position: "absolute",
            top: "0",
            zIndex: "1",
            left: "0",        
            width: "100%",
            height: "100%",
            objectFit: "cover",      
        }} src={url} alt={title} />
        <Stack sx={{zIndex: 4}} spacing={1} direction="column" >
            <Typography variant="h4">{title}</Typography>             
           
            <Genres before={new Date(release_date).getFullYear() + " • "} genre_ids={genre_ids}/>
            <Typography sx={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: '3',
                WebkitBoxOrient: 'vertical'               
                }} variant="subtitle1" fontSize={12}>
                    {overview}
            </Typography>           
            <ButtonGroup sx={{display: "flex", justifyContent:{xs: "center", sm: "flex-start"}}}>
                <Button startIcon={<FaPlayCircle/>} size="small" variant="contained">Watch trailer</Button>
                <Button color="info" startIcon={<CiBookmark />} size="small" variant="outlined">Add Watchlist</Button>
            </ButtonGroup>
        </Stack>
    </Stack>)
}

export default HeaderMovieDisplay
