import { Box, Container, Skeleton, Stack, Typography, styled } from "@mui/material";
import { FC } from "react";
import { FaStar } from "react-icons/fa";
import { CustomSwiperBtnProps, GenresProps, RatingProps, StyledGridSliderProps } from "../../types/type";
import { useRecoilValue } from "recoil";
import { genreNamesMovies$, genreNamesTv$ } from "../../state/selectors/selectors";
import { Swiper, SwiperProps } from "swiper/react";
import { Navigation, Grid, Thumbs } from "swiper/modules";
import 'swiper/css';
import 'swiper/css/grid';
import 'swiper/css/navigation';




export const Genres : FC<GenresProps> = ({genre_ids,before,after,variant="caption",fontSize=12,isTv,...props}) => {
    const genresTv = useRecoilValue(genreNamesTv$(genre_ids))
    
    const genresMovie = useRecoilValue(genreNamesMovies$(genre_ids))
    const genres = (isTv && genresTv.length > 0 ) ? genresTv  : genresMovie;

    

    if(genres.length == 0) {
        return null
    }

    return (<Typography  sx={{
        opacity: ".4",
        display: '-webkit-box',
                WebkitLineClamp: '1',
                WebkitBoxOrient: 'vertical',
                overflow: "hidden",
        whiteSpace: "pre-wrap",
        
        }} fontSize={fontSize} variant={variant} {...props}>
         {before && before}{genres.slice(0,3).toLocaleString().split(",").join(" • ")}{after && after}
    </Typography>)
}


export const MovieRating : FC<RatingProps> = ({children,spacing = .5,fontSize = 12,svgSize = 12, ...props}) => {
    
    return(<Stack alignItems={"center"}  direction={"row"} spacing={spacing} {...props}>
            <FaStar size={svgSize} style={{fill: "gold"}}/>
            <Typography variant="caption" fontSize={fontSize}>{children.toFixed(1)}</Typography>
        </Stack>)
}


export const HomeHeaderBox = styled(Container)(() => ({     
    minHeight: "80vh",      
}))

export const StyledSkeleton = styled(Skeleton)(() => ({
     backgroundColor: "grey"
}))


export const ImageHeader = styled("img")(() => ({
    boxShadow: 
        `inset 0px 5rem  2rem -10px rgba(0,0,0,.7),
        inset 0px -10rem  2rem -10px rgba(0,0,0,.7)`,        
        position: "absolute",
        top: "0",
        zIndex: "1",
        left: "0",        
        width: "100vw",
        height: "100%",
        objectFit: "cover", 
        
}))


export const CustomContainer = styled(Box)((props) => ({
    maxWidth:  "100%",
    [props.theme.breakpoints.up("sm")]: {
        maxWidth: "60%",
        paddingInline:  "10%",
    },  
    paddingBlock: "1rem",
    paddingInline:  "1rem",
}))

export const HeaderContainer = styled(Container)((props) => ({   
    // [props.theme.breakpoints.up("sm")]: {
    //     maxWidth: "60%",
    //     paddingInline:  "10%",
    // },  
    // paddingBlock: "1rem",
    // paddingInline:  "1rem",
    minHeight: "70vh",
    display: "flex", 
    '&::before': {
        content: '""',
        position: "absolute",
        inset: '0',                   
        zIndex:"2",
        background: "linear-gradient(0deg, rgba(0,0,0, .7) 40%, rgba(0,0,0, .3)) 90%",
    }
}))


export const TopBarContainer = styled(Box)((props) => ({
    zIndex: 14,
    color: "white", 
    display: "flex", 
    justifyContent: "space-between", 
    alignItems: 'center', 
    [props.theme.breakpoints.up("sm")]: {        
        paddingInline:  "10%",
    },
    paddingBlock: "1rem",
    paddingInline:  "1rem",
    position: "fixed",
    width: "100%",
    top: 0,
    left: 0,
    "&::hover": {
    transition: "background-color .5s ease-in-out",    

    },
    transition: "background-color .5s ease-in-out",    
}))


export const VerticalItemInfo = styled(Box)(() => ({
    position: "absolute",
    bottom: 0,
    zIndex: 3,
    marginTop: "auto",
    display: "flex",
    alignItems: "flex-end",
    padding: ".5rem 1rem",
    width: "100%",
    height: "100%",
    boxShadow: "inset 2px -150px 42px -5px rgba(0,0,0,0.75)",
    
}))




export const StyledSlider : FC<SwiperProps> = ({...props}) => {
    return <Swiper className="styled-slider"  navigation   modules={[Navigation, Thumbs]} {...props} />
}


export const StyledGridSlider : FC<StyledGridSliderProps> = ({rows,className,...props}) => {
    return <Swiper  spaceBetween={20} slidesPerView={1}  grid={{rows, fill: "row"}} className={`styled-slider styled-grid-slider ${className ? className : ""}`}    modules={[Grid]} {...props} />

}




export const CustomSwiperBtn : FC<CustomSwiperBtnProps> = ({prev, ...props}) => (
<button {...props}   className={`custom-swiper-btn custom-swiper-btn-${prev ? "prev" : "next"}`} />)