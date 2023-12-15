import { Box, Stack, Typography } from "@mui/material"
import { Movie } from "../../types/tmdb"
import { FaStar } from "react-icons/fa";
import { Genres, MovieRating } from "../styled/styled";



const ItemVertical = ({movie}: {movie: Movie}) => {
    const {poster_path, title, vote_average, genre_ids} = movie

    return(<Box className="item-vertical" onClick={() => console.log(title)} sx={{
        borderRadius: 1, 
        overflow: "hidden",       
       
        postiion: "relative",       
        // '&::before': {
        //     content: '""',
        //     position: "absolute",
        //     inset: '0',          
        //     zIndex:"2",
        //     width: "100%",
        //     background: "linear-gradient(0deg, rgba(0,0,0, .7) 5%, rgba(0,0,0, .3))",
        // }

        }}>        
        <img style={{position: "relative"}}  src={`http://image.tmdb.org/t/p/original${poster_path}`} alt={title} />
        <Box sx={{
            position: "absolute",
            bottom: 10,
            zIndex: 3,
            left: 5,
            maxWidth: {xs: '20rem',sm:"12rem"},

        }}>
            <Typography fontSize={15} variant="h6">{title}</Typography>
            <Stack alignItems={"start"} direction={"row"} spacing={.5}>
                <MovieRating >{vote_average}</MovieRating>
                <Genres  before={" | "} genre_ids={genre_ids}/>
            </Stack>
        </Box>
    </Box>)
}

export default ItemVertical