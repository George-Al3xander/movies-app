import { Stack, Typography } from "@mui/material"
import { PersonCombinedCredits, PersonDetails } from "../../../types/tmdb"
import ReviewParagraph from "../../single product display/review/ReviewParagraph"
import PosterSlider from "../../horizontal/poster/PosterSlider"
import useApiLink from "../../../hooks/useApiLink"
import CareerBlock from "../career/CareerBlock"




const PersonMainBlock = ({name,biography, known_for_department,id}: PersonDetails) => {
    
    return(<Stack sx={{flex: {sm:"90%"},background: "black", p:2, borderRadius: "1rem"}} spacing={5}>
        <Typography display={{xs: "none", sm: "initial"}}  variant="h3">{name}</Typography>
        <Stack display={{xs: "none", sm: "initial"}} spacing={"1rem"}>
            <Typography variant="h6">Biography</Typography>
            <ReviewParagraph content={biography}/>
        </Stack>
        <PosterSlider apiUrl={`https://api.themoviedb.org/3/discover/movie?with_${known_for_department.toLowerCase() == "acting" ? "cast": "crew"}=${id}&sort_by=vote_average.desc`} title="Known For"/>
        <CareerBlock />
    </Stack>)
}

export default PersonMainBlock