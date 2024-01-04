import { useQuery } from "@tanstack/react-query";
import { checkKey, fetchFromTmdb } from "../utils";
import { FC, useEffect} from "react";
import 'react-multi-carousel/lib/styles.css';
import { Alert,Container, Typography } from '@mui/material';
import {SwiperSlide } from 'swiper/react';
import { StyledSlider } from './styled/styled';
import { JSX } from "react/jsx-runtime";
import { SliderTempProps } from "../types/type";
import { Movie, TV } from "../types/tmdb";




const SliderTemp : FC< SliderTempProps> = ({apiUrl, title, ItemCoomp, LoadingItemCoomp, spaceBetween, slidesPerView, customKey}) => {

    const fetch = async () => {        
        const data = await fetchFromTmdb(apiUrl);
        if(data.results) {
            if(data.results.some((el: TV & Movie) => el.media_type)) {            
                return {results: data.results.filter((el: TV & Movie) => el.media_type == "movie" || el.media_type == "tv") }           
            } else {
                return data
            }
        } else {
            return data
        }
    }
    
    const tempItems = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]
    
    const {data,isLoading,  isError} = useQuery({queryKey: ["horizontal-items", title, apiUrl], queryFn: fetch})
    
    if(isError) return <Alert severity="error">Failed to fetch "{ title && title.toUpperCase()}", try reloading page!</Alert>
    
    return(<Container className='horizontal-items' maxWidth="xl">
        {title && <Typography sx={{textTransform: "capitalize", py: 2, fontWeight: "700"}} variant='h5'>{title}</Typography>}
        <ul style={{marginInline: "auto"}}>   
            <StyledSlider  slidesPerView={slidesPerView ? slidesPerView : "auto"} spaceBetween={spaceBetween ? spaceBetween : 10}>
                {isLoading ?
                tempItems.map((num) => {                        
                    return <SwiperSlide key={apiUrl + num}><LoadingItemCoomp index={num}/></SwiperSlide>
                })
                :
                (customKey ? data[customKey] : checkKey(data)).length > 0 && (customKey ? data[customKey] : checkKey(data)).map((element: JSX.IntrinsicAttributes, index: number) => {                        
                        return <SwiperSlide><ItemCoomp index={index}  {...element}/></SwiperSlide>
                })                
                }
            </StyledSlider>
        </ul>
  </Container>)
}

export default SliderTemp