import { Box, Stack, Typography } from "@mui/material"
import { Movie, TV } from "../../types/tmdb"
import { Genres, MovieRating, VerticalItemInfo } from "../styled/styled";



const ItemVertical = ({poster_path, vote_average, genre_ids,title, name}: Movie & TV) => {
    return(<Box className="item-vertical" onClick={() => console.log(11)} sx={{
        borderRadius: 1, 
        overflow: "hidden", 
        postiion: "relative",  
        }}>       
       
        {poster_path ?
        <img className="vertical-item-img" style={{position: "relative"}}  src={`http://image.tmdb.org/t/p/w500${poster_path}`} alt={title ? title : name} />
        :
        <Box sx={{borderRadius: 1, display: "flex",justifyContent: "center",alignItems: "center",position: "absolute",top: 0, height: "100%", width: "100%", background: "linear-gradient(to bottom, #00925d, #526525, #503c19, #321d18, #000000)"}}>
            <Typography  fontSize={18} textTransform="uppercase" fontStyle="italic" variant="subtitle2">No poster </Typography>
        </Box>
        }
        <VerticalItemInfo  className="info">
            <Box>
                <Typography fontSize={20} variant="h6">{title ? title : name}</Typography>
                <Stack alignItems={"start"} direction={"row"} spacing={.5}>
                    <MovieRating fontSize={16}>{vote_average}</MovieRating>
                    <Genres fontSize={16}  before={" | "} genre_ids={genre_ids}/>
                </Stack>
            </Box>
        </VerticalItemInfo>
    </Box>)
}

export default ItemVertical