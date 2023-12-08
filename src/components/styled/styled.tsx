import { Box, Stack, Typography, styled } from "@mui/material";
import { FC } from "react";
import { FaStar } from "react-icons/fa";
import { GenresProps, RatingProps } from "../../types/type";
import { useRecoilValue } from "recoil";
import { genreNames$ } from "../state/selectors/selectors";



export const Genres : FC<GenresProps> = ({genre_ids,before,after,variant="caption",fontSize=12,...props}) => {
    const genres = useRecoilValue(genreNames$(genre_ids))

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