import { Container, Stack } from "@mui/material"
import GenresPickSlider from "./pick slider/GenrePickSlider"
import { GenreCtxWrapper } from "../../hooks/useWatchGenreCtx"







const WatchByGenre = () => {
    
    

    return(<GenreCtxWrapper>
    <Stack className="watch-by-genre">        
        <GenresPickSlider  isTv/>        
    </Stack>
    </GenreCtxWrapper>)
}

export default  WatchByGenre