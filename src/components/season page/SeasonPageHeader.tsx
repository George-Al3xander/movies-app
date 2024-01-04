import { Stack, Typography } from "@mui/material";
import { HeaderContainer, MovieRating } from "../styled/styled";
import PeopleDisplay from "../single product display/PeopleDisplay";
import { Episode, Season, SeasonDetails } from "../../types/tmdb";
import { tmdbImage } from "../../utils";



interface Prop extends SeasonDetails{
    apiLink: string,
   
}


const handleBg = (episodes: Episode[]) => {
    
    if(episodes && episodes.length > 0) {
        const withPics = episodes.filter((ep) => ep.still_path)
        if(withPics.length > 0) {
            return  `url(${tmdbImage(withPics[0].still_path)})`
        }       
    }

    return "linear-gradient(to bottom, #00925d, #526525, #503c19, #321d18, #000000)"
}


const SeasonPageHeader = ({vote_average, name, episodes, apiLink}: Prop) => (<HeaderContainer  shadowStrong maxWidth="xl" sx={{
    backgroundSize: "cover",backgroundPosition: "center",backgroundImage: `${handleBg(episodes)}`,
}}>
    <Stack  marginBlock={"auto 1rem"} zIndex={4} direction={"column"} spacing={2}>
        <Typography textTransform={"capitalize"} fontWeight={"600"} variant="h3">{name}</Typography>
        <Stack direction="row" alignItems={"center"}  spacing={2}>
            <MovieRating fontSize={16}>{vote_average}</MovieRating>
            <Typography sx={{opacity: ".7"}} variant="subtitle1">{episodes.length} episode{episodes.length == 1 ? "" : "s"}</Typography>
        </Stack>
        <PeopleDisplay title="Top Cast" apiLink={`${apiLink}/credits`}/>
    </Stack>
</HeaderContainer> )

export default SeasonPageHeader