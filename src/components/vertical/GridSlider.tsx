import { FC} from "react";
import { GridSliderProps } from "../../types/type";
import { useQuery } from "@tanstack/react-query";
import { Alert, Box, Container, Stack, Typography } from "@mui/material";
import { fetchFromTmdb } from "../../utils";
import { Movie, TV } from "../../types/tmdb";
import { CustomSwiperBtn, StyledGridSlider } from "../styled/styled";
import {  SwiperSlide } from "swiper/react";

import 'swiper/css';
import useOuterBtns from "../../hooks/useOuterBtns";



const GridSlider : FC<GridSliderProps> = ({apiUrl, title, ItemCoomp, LoadingItemCoomp, spaceBetween, rows, className}) => {
    
    
    
    const {isBeginning, isEnd, handleNext, handlePrevious, handleSlideChange, setSwiperRef} = useOuterBtns()
    
    
    
    
    const fetch = async () => {
        const data = await fetchFromTmdb(apiUrl);
        if(data.results.some((el: TV & Movie) => el.media_type)) {
            return {results: data.results.filter((el: TV & Movie) => el.media_type == "movie" || el.media_type == "tv") }           
        } else {
            return data
        }
    }
    const tempItems = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]

    const {data,isLoading,  isError} = useQuery({queryKey: ["grid-items", title, apiUrl], queryFn: fetch})
    
    if(isError) return <Alert severity="error">Failed to fetch {title}, try reloading page!</Alert>
    

    return(<Box className={`items-vertical ${className}`}>
        <Box sx={{py: 2, position: "relative"}}>
            <Box sx={{py: 2, display: "flex", justifyContent: "space-between"}}>
                <Typography sx={{textTransform: "capitalize", fontWeight: "700"}} variant='h5'>{title}</Typography>
                <Stack direction={"row"} spacing={1}>
                    <CustomSwiperBtn disabled={isBeginning} prev onClick={handlePrevious}/>
                    <CustomSwiperBtn disabled={isEnd}  onClick={handleNext}/>                    
                </Stack>
            </Box>
            <ul style={{marginInline: "auto"}}>
                <StyledGridSlider onSlideChange={handleSlideChange} onSwiper={setSwiperRef}   /*className={className}*/ slidesPerView={1} spaceBetween={spaceBetween} rows={rows}>
                    {isLoading ?
                    tempItems.map((num) => {                        
                        return <SwiperSlide key={apiUrl + num}><LoadingItemCoomp index={num}/></SwiperSlide>
                    })
                    :
                    data.results.length > 0 && data.results.map((element: JSX.IntrinsicAttributes, index: number) => {                        
                            return <SwiperSlide><ItemCoomp  {...element}/></SwiperSlide>
                    })                
                    }
                </StyledGridSlider> 
            </ul>
        </Box>
    </Box>)
}

export default GridSlider