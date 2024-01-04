import { Box, Stack, Tab, Tabs, Typography } from "@mui/material"
import { FC, useState } from "react"
import { StyledSlider, StyledTab } from "../styled/styled";
import { Credits, Movie, MovieDetails, TV, TvShowDetails } from "../../types/tmdb";
import { SwiperSlide } from "swiper/react";
import SeasonsDisplay from "./SeasonsDisplay";
import PeopleDisplay from "./PeopleDisplay";
import BackdropSlider from "../horizontal/backdrop/BackdropSlider";
import ReviewsDisplay from "./review/ReviewsDisplay";


interface TabPanelProps {
    children?: React.ReactNode,
    index: number,
    currIndex: number     
}

interface SDPTabsProps {
    apiLink: string,
    data?: MovieDetails &  TvShowDetails & {credits:Credits}
}



const TabPanel : FC<TabPanelProps> = ({children,index, currIndex}) =>  {
    if(currIndex != index) return null    
    return(<Box sx={{my: "2rem"}}>{children}</Box>)
}


const SDPTabs: FC<SDPTabsProps> = ({data,apiLink}) => {

    const [currIndex, setCurrIndex] = useState(2);

    const handleChange = (__event: React.SyntheticEvent, newValue: number) => {
        setCurrIndex(newValue);
      };

    return(<Stack>
        <Tabs color="white" TabScrollButtonProps={{style: {color:'red'}}}  textColor={"primary"} value={currIndex} onChange={handleChange} aria-label="basic tabs example">
            <StyledTab  label={
            data!.name && data!.seasons!.length > 0 ?
            "Seasons"
            :            
            "if you loved the cast"
        }  />
            <StyledTab  label="crew"  />
            <StyledTab  label="Reviews"  />
        </Tabs>        
        <TabPanel index={0} currIndex={currIndex}>
        {data!.name &&  data!.seasons!.length > 0 ?            
            <SeasonsDisplay  seasons={data?.seasons!}/>
            :                 
            <BackdropSlider apiUrl={`https://api.themoviedb.org/3/discover/${data?.title ? "movie" : "tv"}?with_cast=${data!.credits.cast.slice(0,8).map((person) => person.id).toString().split(',').join('|')}`} />
        }</TabPanel>
        <TabPanel index={1} currIndex={currIndex}><PeopleDisplay  apiLink={`${apiLink}/credits`} crew/> </TabPanel>
        <TabPanel index={2} currIndex={currIndex}><ReviewsDisplay apiLink={apiLink} /></TabPanel>

    </Stack>)
}

export default SDPTabs