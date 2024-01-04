import { Avatar, Box, Container, Stack, Typography } from "@mui/material";
import { Episode } from "../../types/tmdb";
import { displayTime, tmdbImage } from "../../utils";
import { MovieRating, StyledSlider } from "../styled/styled";
import { SwiperSlide } from "swiper/react";



const EpisodeDisplay = ({name, overview, still_path,episode_number,vote_average, runtime,show_id}:Episode) => (<Stack className="episode" direction={{sm:"row"}} spacing={{xs: 3,sm:2}}>
    <Stack direction={"row"} alignItems={"center"} justifyContent={"space-between"}>
        <Typography display={{sm: "none"}}  variant="h5">{name}</Typography>   
        <Avatar  sx={{ width: 50, height: 50 ,fontWeight: 600,fontSize: 26 ,bgcolor: "white", color: "black", alignSelf: {sm:"center"}}}>{episode_number}</Avatar>
    </Stack>
    {/* <Typography fontWeight={700} sx={{alignSelf: "center"}} variant="h1">{episode_number}</Typography> */}
   { still_path ?
    <img style={{borderRadius: "1rem", maxWidth: "300px",height: "100%", objectFit: "cover"}}   src={tmdbImage(still_path, 500)} alt={ name} />
    :
    <Box sx={{borderRadius: 1, display: "flex",justifyContent: "center",alignItems: "center", width: "100%", minHeight: "10rem",height: "100%", background: "linear-gradient(to bottom, #00925d, #526525, #503c19, #321d18, #000000)"}}>
        <Typography  fontSize={18} textTransform="uppercase" fontStyle="italic" variant="subtitle2">No poster</Typography>
    </Box>        
    } 
   <Stack spacing={2}>
        <Box>
            <Typography display={{xs: "none", sm: "initial"}} fontSize={20} variant="h6">{name}</Typography>    
            <Stack direction={"row"} spacing={2} alignItems={"center"}>
                    <MovieRating fontSize={16}>{vote_average}</MovieRating>
                    <Typography sx={{opacity: ".7"}}>{displayTime(runtime)}</Typography>
            </Stack> 
        </Box>
        <Typography sx={{opacity: ".7"}} variant="subtitle1" fontSize={16}>{overview}</Typography>
    </Stack>   
</Stack>) 


const EpisodesDisplay = ({episodes}: {episodes: Episode[]}) => {
    const pagination = {
        clickable: true,
        renderBullet: function (index: number, className: string) {
          return '<span class="' + className + '">' + (index + 1) + '</span>';
        },
    };
    if(episodes.length == 0) return null

    return(<span className="episodes-display">
        <StyledSlider 
            spaceBetween={60}             
            slidesPerView={"auto"}>
        
        {episodes.map((ep) => {
            return <SwiperSlide><EpisodeDisplay {...ep}/></SwiperSlide>
        })}    
        </StyledSlider>
    </span>)
}

export default EpisodesDisplay