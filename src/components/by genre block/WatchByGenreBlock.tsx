import { Container, Stack } from "@mui/material"
import GenresPickSlider from "./pick slider/GenrePickSlider"
import { GenreCtxWrapper } from "../../hooks/useWatchGenreCtx"
import GenreMoviesList from "./GenreMoviesList"






const WatchByGenre = () => {
    
    

    return(<GenreCtxWrapper>
    <Stack className="watch-by-genre">
        {/* <GenreMoviesList /> */}
        <GenresPickSlider  isTv/>        
    </Stack>
    </GenreCtxWrapper>)
}

export default  WatchByGenre