import { ContainerProps, StackProps, TypographyProps } from "@mui/material";
import { ButtonHTMLAttributes, ComponentType, ReactPropTypes } from "react";
import { SwiperProps } from "swiper/react";
import { Movie, TV } from "./tmdb";

export interface GenresProps extends TypographyProps {
    genre_ids:  number[],
    before?: string | number,
    after?: string | number,
    isTv: boolean
}


export interface RatingProps extends StackProps {
        children:  number,
        svgSize?: number,
        outOf?: boolean
        
}

export interface SliderTempProps extends  SwiperProps {
    apiUrl:string, 
    title?: string,
    LoadingItemCoomp: ComponentType<any>,
    ItemCoomp: ComponentType<any>,    
    customKey?: string
}

export interface GridSliderProps extends SliderTempProps {
    rows: number

}


export interface StyledGridSliderProps extends SwiperProps {
    rows: number
}

 
export interface CustomSwiperBtnProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    prev?: boolean,
    size?: number
}

export interface HeaderContainerProps extends ContainerProps {
    shadowStrong?: boolean
}

export interface UpcomingElemnt {
    month: string,
    results: (Movie & TV)[]
}
