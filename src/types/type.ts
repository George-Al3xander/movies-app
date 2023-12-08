import { StackProps, TypographyProps } from "@mui/material";

export interface GenresProps extends TypographyProps {
    genre_ids:  number[],
    before?: string | number,
    after?: string | number
}


export interface RatingProps extends StackProps {
        children:  number,
        svgSize?: number,
        
}
