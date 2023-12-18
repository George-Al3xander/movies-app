import { Box, Container, Skeleton, Stack, Typography, styled } from "@mui/material";
import { FC } from "react";
import { FaStar } from "react-icons/fa";
import { GenresProps, RatingProps } from "../../types/type";
import { useRecoilValue } from "recoil";
import { genreNames$ } from "../state/selectors/selectors";
import { Swiper, SwiperProps } from "swiper/react";
import { Navigation } from "swiper/modules";
import 'swiper/css';
import 'swiper/css/navigation';



export const Genres : FC<GenresProps> = ({genre_ids,before,after,variant="caption",fontSize=12,...props}) => {
    const genres = useRecoilValue(genreNames$(genre_ids))


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
    // display: "flex",
    // flexDirection: "column",
    // justifyContent: "space-between",   
    minHeight: "80vh",   
    // backgroundPosition: "center",
    // backgroundSize: "cover",
    // backgroundRepeat: "no-repeat", 
    // animationDelay: "5s",
    // animationTimingFunction: "ease-in-out",
    //animation-timing-function: ease-in-out;
    //-webkit-animation-timing-function: ease-in-out;
    // isolation: "isolate",
    // '&::before': {
    //     content: '""',
    //     position: "absolute",
    //     inset: '0',
    //     //opacity: ".7",
    //     zIndex:"2",
    //     background: "linear-gradient(0deg, rgba(0,0,0, .7) 40%, rgba(0,0,0, .3)) 90%",
    // }
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

export const HeaderMovieContainer = styled(Stack)((props) => ({
    maxWidth:  "100%",
    [props.theme.breakpoints.up("sm")]: {
        maxWidth: "60%",
        paddingInline:  "10%",
    },
    paddingBlock: "1rem",
    paddingInline:  "1rem",
    minHeight: "80vh",
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
   // background: "black",
    // "&::before": {
    //     content: '""',
    //     position: "absolute",
    //     inset: 0,                   
    //     zIndex: 2,
    //     bottom: 0,
    //     boxShadow:  inset 2px -110px 52px -26px rgba(0,0,0,0.75)
    // }
    boxShadow: "inset 2px -150px 42px -5px rgba(0,0,0,0.75)",
    
}))




export const StyledSlider : FC<SwiperProps> = ({...props}) => {
    return <Swiper className="styled-slider"  navigation   modules={[Navigation]} {...props} />
}