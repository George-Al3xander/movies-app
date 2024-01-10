import { Box, Stack, Typography } from "@mui/material"
import { Movie, TV } from "../../../types/tmdb"
import { Genres, MovieRating, VerticalItemInfo } from "../../styled/styled";
import { MdOpenInNew } from "react-icons/md";
import { GrContactInfo } from "react-icons/gr";
import { NavLink } from "react-router-dom";

const PosterItem = ({poster_path, vote_average, genre_ids,title, name,id}: Movie & TV) => {
    return(<Box key={`poster-item-${id}`} className="poster-item"  sx={{
            borderRadius: 1, 
            overflow: "hidden", 
            postiion: "relative",  
        }}>       
        <NavLink to={`/${title ? "movie" : "tv"}/${id}`}>
            <span className="hover-layer"><MdOpenInNew size={50}/></span>
        </NavLink>
        {poster_path ?
        <img className="horizontal-item-img" style={{position: "relative"}}  src={`http://image.tmdb.org/t/p/w500${poster_path}`} alt={title ? title : name} />
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
                    <Genres isTv={title == undefined} fontSize={16}  before={" | "} genre_ids={genre_ids}/>
                </Stack>
            </Box>
        </VerticalItemInfo>
    </Box>)
}

export default PosterItem