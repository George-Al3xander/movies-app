import { Box,  Stack, Typography } from "@mui/material"
import { Movie, TV } from "../../../types/tmdb"
import { Genres, MovieRating } from "../../styled/styled"

interface OrderedItemProps extends  Movie, TV {
    index?: number
}

const OrderedItem = ({title,name, poster_path,genre_ids, vote_average, release_date, media_type,index}: OrderedItemProps) => {
   

    return(<Box className="ordered-item">
        {index != undefined && <Typography fontWeight={700} sx={{alignSelf: "center"}} variant="h1">{index + 1}</Typography>}
        {poster_path? 
        <img  src={`http://image.tmdb.org/t/p/w300${poster_path}`} alt={title ? title : name}/>
        :
        <Box sx={{borderRadius: 1, display: "flex",justifyContent: "center",alignItems: "center", height: "100%", width: "5rem", background: "linear-gradient(to bottom, #00925d, #526525, #503c19, #321d18, #000000)"}}>
            <Typography  fontSize={14} textTransform="uppercase" fontStyle="italic"  variant="caption">No poster </Typography>
        </Box>
        }
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
                }} variant="h5">{title ? title : name}</Typography>
                <Genres isTv={title == undefined} fontSize={16} genre_ids={genre_ids}/>
                {vote_average > 0 ?
                <MovieRating fontSize={16}>{vote_average}</MovieRating>
                :
                <Typography sx={{opacity: ".5"}} textTransform={"uppercase"} variant="caption">Not yet rated</Typography>
                }
           </Box>
        </Box>
        
      
    </Box>)
}


export default OrderedItem