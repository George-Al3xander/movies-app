import { Movie, TV } from "../../../../types/tmdb"
import {  Box, Button, ButtonGroup, Stack, Typography } from "@mui/material";
import { Genres, MovieRating } from "../../../styled/styled";
import WatchTrailerBtn from "../WatchTrailerBtn";
import { CiBookmark } from "react-icons/ci";
import { NavLink } from "react-router-dom";


interface HeaderMovieInfoProps extends Movie, TV {
    rating?: boolean,
    noDesc?: boolean
}


const HeaderMovieInfo = (props:HeaderMovieInfoProps) => {
    
    const {title, name ,release_date, genre_ids, id, overview, vote_average, rating, noDesc} = props

    return(<Stack key={"header-"+id} className="header-movie-info" sx={{zIndex: 4, mt: "auto"}} spacing={2} direction="column" >
    <NavLink className={"link-primary"} to={`/${title ? "movie" : "tv"}/${id}`}>            
        <Typography className={"link-primary"}  variant="h4">{title ? title : name}</Typography>                 
    </NavLink>           
    <Stack alignItems={"start"} direction={"row"} spacing={.5}>
    {rating && <MovieRating fontSize={16}>{vote_average}</MovieRating>}
    <Genres isTv={title == undefined} fontSize={16} before={rating ? " | " : "" + new Date(release_date).getFullYear() + " • "} genre_ids={genre_ids}/>
    </Stack>
    {!noDesc && 
    <Box>
        <Typography sx={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: '3',
            WebkitBoxOrient: 'vertical'               
            }} variant="subtitle1" fontSize={16}>
                {overview}
        </Typography>
        <NavLink to={`/${title ? "movie" : "tv"}/${id}`}>            
                <Typography className="read-more-link">Read more</Typography>
        </NavLink>
        
    </Box>
    }
    <ButtonGroup sx={{display: "flex", justifyContent:{xs: "center", sm: "flex-start"}}}>
        <WatchTrailerBtn product={props}/>
        <Button color="info" startIcon={<CiBookmark />} size="small" variant="outlined">Add Watchlist</Button>
    </ButtonGroup>
</Stack>)
}

export default HeaderMovieInfo