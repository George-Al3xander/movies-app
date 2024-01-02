import { Box, Stack, Tab, Tabs, Typography } from "@mui/material"
import { FC, useState } from "react"
import { StyledSlider, StyledTab } from "../styled/styled";
import { Movie, MovieDetails, TV, TvShowDetails } from "../../types/tmdb";
import { SwiperSlide } from "swiper/react";
import SeasonsDisplay from "./SeasonsDisplay";


interface TabPanelProps {
    children?: React.ReactNode,
    index: number,
    currIndex: number     
}

interface SDPTabsProps {
    apiLink: string,
    data?: MovieDetails &  TvShowDetails
}

const TabPanel : FC<TabPanelProps> = ({children,index, currIndex}) =>  {

    if(currIndex != index) return null

    
    return(<Box sx={{my: "2rem"}}>{children}</Box>)
}


const SDPTabs: FC<SDPTabsProps> = ({data,apiLink}) => {

    const [currIndex, setCurrIndex] = useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setCurrIndex(newValue);
      };

    return(<Stack>
        <Tabs color="white" TabScrollButtonProps={{style: {color:'red'}}}  textColor={"primary"} value={currIndex} onChange={handleChange} aria-label="basic tabs example">
            <StyledTab  label={data!.name ?
            data!.seasons!.length > 0 ?
            "Seasons"
            :
            "Tv series with no seasons"
            :
            "Movie"
        }  />
            <StyledTab  label="Item Two"  />
            <StyledTab  label="Reviews"  />
        </Tabs>        
        <TabPanel index={0} currIndex={currIndex}>
        {data!.name ?
            data!.seasons!.length > 0 ?
            <SeasonsDisplay  seasons={data?.seasons!}/>
            :
            "Tv series with no seasons"
            :
            "Movie"
        }</TabPanel>
        <TabPanel index={1} currIndex={currIndex}>{apiLink} 1</TabPanel>
        <TabPanel index={2} currIndex={currIndex}>{apiLink} 2</TabPanel>

    </Stack>)
}

export default SDPTabs