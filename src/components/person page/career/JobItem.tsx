import { Box, Stack, Typography } from "@mui/material";
import { PersonMovieCast, PersonMovieCrew, PersonTvShowCast, PersonTvShowCrew } from "../../../types/tmdb";
import { PiTelevisionDuotone } from "react-icons/pi";
import { GiFilmProjector } from "react-icons/gi";
import { NavLink } from "react-router-dom";

const JobItem = ({year,title,name,id,episode_count,job,character}:PersonMovieCast & PersonTvShowCast & PersonMovieCrew & PersonTvShowCrew & {year: number}) => {
    

    return(<Stack py="1.5rem"  alignItems={"center"} direction={"row"} spacing={2}>
        <Typography variant="subtitle1">{year}</Typography>
        <Box display={{xs: "none", sm: "initial"}}>{title ? <GiFilmProjector size={20}/> : <PiTelevisionDuotone size={20}/>}</Box>
        <Stack>
            <NavLink to={`/${title ? "movie" : "tv"}/${id}`}><Typography >{title ? title : name}</Typography></NavLink>
            <Typography sx={{opacity: ".7"}}>{job ? "..." + job :  <><span style={{opacity: ".5"}}>{episode_count ? `(${episode_count} episode${episode_count == 1 ? "" : "s"})` : ""} as </span> {character}</>}</Typography>
        </Stack>
    </Stack>)
}

export default JobItem