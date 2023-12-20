import { Movie, TV } from "../../../../types/tmdb"
import {  Button, ButtonGroup, Stack, Typography } from "@mui/material";
import { Genres } from "../../../styled/styled";
import WatchTrailerBtn from "../WatchTrailerBtn";
import { CiBookmark } from "react-icons/ci";




const HeaderMovieInfo = ({movie}:{movie: Movie & TV}) => {
    const {title, name ,release_date, genre_ids, id, overview} = movie

    return(<Stack className="header-movie-info" sx={{zIndex: 4, mt: "auto"}} spacing={2} direction="column" >
    <Typography variant="h4">{title ? title : name}</Typography>             
   
    <Genres fontSize={14} before={new Date(release_date).getFullYear() + " • "} genre_ids={genre_ids}/>
    <Typography sx={{
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        display: '-webkit-box',
        WebkitLineClamp: '3',
        WebkitBoxOrient: 'vertical'               
        }} variant="subtitle1" fontSize={16}>
            {overview}
    </Typography>
    <ButtonGroup sx={{display: "flex", justifyContent:{xs: "center", sm: "flex-start"}}}>
        <WatchTrailerBtn id={id}/>
        <Button color="info" startIcon={<CiBookmark />} size="small" variant="outlined">Add Watchlist</Button>
    </ButtonGroup>
</Stack>)
}

export default HeaderMovieInfo