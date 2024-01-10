import { Box, Rating, Stack, Tab, Tabs, Typography } from "@mui/material"
import { FC, useState } from "react"
import { Movie, MovieDetails, Season, TV, TvShowDetails } from "../../types/tmdb";
import { SwiperSlide } from "swiper/react";
import { StyledSlider } from "../styled/styled";
import { NavLink } from "react-router-dom";


interface Props {
    seasons: Season[],    
}


const SeasonDisplay = ({name,overview,poster_path,air_date,season_number}: Season) => (<Stack direction={"row"} spacing={2}>
    <span className="ordered-item" >
        {poster_path?
            <img  src={`http://image.tmdb.org/t/p/w300${poster_path}`} alt={name}/>
            :
            <Box sx={{borderRadius: 1, display: "flex",justifyContent: "center",alignItems: "center", height: "100%", width: "5rem", background: "linear-gradient(to bottom, #00925d, #526525, #503c19, #321d18, #000000)"}}>
                <Typography  fontSize={14} textTransform="uppercase" fontStyle="italic"  variant="caption">No poster </Typography>
            </Box>
        }
    </span>

    <Stack direction={"column"} spacing={2}>
       <Stack>
            <Typography variant="h6">{name}</Typography>   
            {air_date && <Typography variant="subtitle2" fontStyle={"italic"}  textTransform={"uppercase"} sx={{opacity: ".7"}}>{air_date.split("-")[0]}</Typography>}
       </Stack>
       <Stack>
        <Typography sx={{
            maxWidth:"20ch",
            opacity: ".7",
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: '3',
            WebkitBoxOrient: 'vertical'               
            }} variant="caption" fontSize={16}>
                {overview}
        </Typography>
        <NavLink to={`season/${season_number}`}>
            <Typography color={"primary"} variant="caption" fontSize={16}>Read more</Typography>
        </NavLink>

      </Stack>
    </Stack>
</Stack>)


const SeasonsDisplay : FC<Props> = ({seasons}) =>  (<span className="seasons-display">
    <StyledSlider slidesPerView={"auto"} spaceBetween={20}>
        {seasons.map((season) => {
            return <SwiperSlide  key={"name"}><SeasonDisplay {...season}/></SwiperSlide>
        })}
</StyledSlider>
</span>)


export default SeasonsDisplay