import { FC } from "react";
import { Movie, MovieDetails, TV, TvShowDetails } from "../../types/tmdb";
import HeaderMovieInfo from "../home/header/swiper/HeaderMovieInfo";
import { Genres, HeaderContainer } from "../styled/styled";
import {  Button, ButtonGroup, Chip, Stack, Typography } from "@mui/material";

import { CiBookmark } from "react-icons/ci";
import WatchTrailerBtn from "../home/header/WatchTrailerBtn";
import moment from "moment";
import { displayTime } from "../../utils";

interface Props {
    product: MovieDetails & TvShowDetails 
}



const SDPHeader: FC<Props> = ({product}) => (
    <HeaderContainer   maxWidth="xl" sx={{
        backgroundPosition: "center",backgroundSize: "cover",backgroundImage: product.backdrop_path ? `url(http://image.tmdb.org/t/p/original${product.backdrop_path})` : "linear-gradient(to bottom, #00925d, #526525, #503c19, #321d18, #000000)",
        
    }}>      
    <Stack className="header-movie-info" sx={{zIndex: 4, mt: "auto", mb: '3%'}} spacing={2} direction="column" >
    <Chip sx={{width: "min-content", fontSize: 14, textTransform: "uppercase"}} color="info" label={(product.title ? "movie" : "series")}/>
        <Typography variant="h4">{product.title ? product.title : product.name}</Typography>             
        <Stack alignItems={"start"} direction={"row"} spacing={.5}>
            <Typography  sx={{
                opacity: ".4",
                display: '-webkit-box',
                        WebkitLineClamp: '1',
                        WebkitBoxOrient: 'vertical',
                        overflow: "hidden",
                whiteSpace: "pre-wrap",        
            }} fontSize={16} variant={"caption"}>
                {[product.runtime ? displayTime(product.runtime) : `${product.number_of_seasons} season${product.number_of_seasons == 1 ? "" : "s"}`,(product.release_date ? product.release_date : product.first_air_date).split("-")[0]].concat(product.genres.map((gen) => gen.name).slice(0,3)).toLocaleString().split(",").join(" • ")}
            </Typography>        
        </Stack>   
        <ButtonGroup sx={{display: "flex", justifyContent:{xs: "center", sm: "flex-start"}}}>
            <WatchTrailerBtn product={{...product, genre_ids: []}}/>
            <Button color="info" startIcon={<CiBookmark />} size="small" variant="outlined">Add Watchlist</Button>
        </ButtonGroup>               
    </Stack>
    </HeaderContainer>
)

export default SDPHeader