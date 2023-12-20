import { StackProps, TypographyProps } from "@mui/material";
import { ComponentType, ReactPropTypes } from "react";
import { SwiperProps } from "swiper/react";

export interface GenresProps extends TypographyProps {
    genre_ids:  number[],
    before?: string | number,
    after?: string | number
}


export interface RatingProps extends StackProps {
        children:  number,
        svgSize?: number,
        
}

export interface SliderTempProps extends  SwiperProps {
    apiUrl:string, 
    title: string,
    LoadingItemCoomp: ComponentType<any>,
    ItemCoomp: ComponentType<any>,
}
