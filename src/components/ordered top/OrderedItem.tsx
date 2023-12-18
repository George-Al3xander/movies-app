import { Box, Chip, Stack, Typography } from "@mui/material"
import { Movie } from "../../types/tmdb"
import { Genres, MovieRating } from "../styled/styled"



const OrderedItem = ({movie, index}:{movie: Movie, index:number}) => {
    const {title, poster_path,genre_ids, vote_average, release_date, media_type} = movie

    return(<Box className="ordered-item">
        <Typography fontWeight={700} sx={{alignSelf: "center"}} variant="h1">{index + 1}</Typography>
        <img  src={`http://image.tmdb.org/t/p/w300${poster_path}`} alt={title}/>
        <Box  className="info-wrapper">          
           <Stack direction={"row"} spacing={1}>
                {[media_type as string,  release_date as string].map((el,index) => {
                    if(el) {
                        return <Typography variant="subtitle2" fontStyle={index == 1 ? "italic" : "initial"}  textTransform={"uppercase"} sx={{opacity: ".7"}}>{el.split("-")[0]}</Typography>
                    }
                })}
           </Stack>
           <Box className="info" >
                <Typography sx={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: '2',
                    WebkitBoxOrient: 'vertical',
                    maxWidth: "100%",
                    overflowWrap: "break-word" 
                }} variant="h5">{title}</Typography>
                <Genres fontSize={16} genre_ids={genre_ids}/>
                <MovieRating fontSize={16}>{vote_average}</MovieRating>
           </Box>
        </Box>
        
      
    </Box>)
}


export default OrderedItem