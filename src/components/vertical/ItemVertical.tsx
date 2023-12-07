import { Box, Typography } from "@mui/material"
import { Movie } from "../../types/tmdb"




const ItemVertical = ({movie}: {movie: Movie}) => {
    const {poster_path, title} = movie

    return(<Box sx={{
        borderRadius: 1, 
        overflow: "hidden", 
        maxWidth: "12rem", 
        postiion: "relative",
        '&::before': {
            content: '""',
            position: "absolute",
            inset: '0',
            //opacity: ".7",
            zIndex:"2",
            background: "linear-gradient(0deg, rgba(0,0,0, .7) 5%, rgba(0,0,0, .3))",
        }

        }}>        
        <img  src={`http://image.tmdb.org/t/p/original${poster_path}`} alt={title} />
    </Box>)
}

export default ItemVertical