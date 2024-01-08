import { Stack, Typography } from "@mui/material"
import { PersonDetails } from "../../../types/tmdb"
import ReviewParagraph from "../../single product display/review/ReviewParagraph"
import PosterSlider from "../../horizontal/poster/PosterSlider"
import useApiLink from "../../../hooks/useApiLink"




const PersonMainBlock = ({name,biography, known_for_department,id}: PersonDetails) => {
    
    return(<Stack sx={{flex: {sm:"90%"}}} spacing={5}>
        <Typography display={{xs: "none", sm: "initial"}}  variant="h3">{name}</Typography>
        <Stack display={{xs: "none", sm: "initial"}} spacing={"1rem"}>
            <Typography variant="h5">Biography</Typography>
            <ReviewParagraph content={biography}/>
        </Stack>
        <PosterSlider apiUrl={`https://api.themoviedb.org/3/discover/movie?with_${known_for_department.toLowerCase() == "acting" ? "cast": "crew"}=${id}`} title="Known For"/>

    </Stack>)

}

export default PersonMainBlock