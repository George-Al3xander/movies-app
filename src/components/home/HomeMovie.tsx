import { Box, Button, ButtonGroup, Stack, Typography } from "@mui/material"
import { CiBookmark } from "react-icons/ci"
import { FaPlayCircle } from "react-icons/fa"
import { Movie } from "../../types/tmdb"




const HomeMovie = ({title, overview}: Movie) => {


    return(<Stack sx={{maxWidth: {xs: "100%", sm: "60%"}}} spacing={1} direction="column">
    <Typography variant="h4">{title}</Typography>  
    <Typography fontSize={12} sx={{opacity: ".4"}} variant="caption">Lorem ipsum dolor sit.</Typography>
    <Typography sx={{
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      display: '-webkit-box',
      WebkitLineClamp: '3',
      WebkitBoxOrient: 'vertical',
   }} variant="subtitle1" fontSize={12}>{overview}</Typography>    
    <ButtonGroup>
        <Button startIcon={<FaPlayCircle/>} size="small" variant="contained">Watch trailer</Button>
        <Button color="info" startIcon={<CiBookmark />} size="small" variant="outlined">Add Watchlist</Button>
    </ButtonGroup>
</Stack>)
}

export default HomeMovie