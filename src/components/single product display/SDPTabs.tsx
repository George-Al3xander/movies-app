import { Box, Stack, Tabs } from "@mui/material"
import {  FC, useState } from "react"
import {  StyledTab } from "../styled/styled";
import { SDPTabsProps, TabPanelProps } from "../../types/type";




const TabPanel : FC<TabPanelProps> = ({children,index, currIndex}) =>  {
    //if(currIndex != index) return null    
    return(<Box sx={{my: "2rem", display: currIndex != index ? "none":"initial"}}>{children}</Box>)
}


const SDPTabs: FC<SDPTabsProps> = ({tabs}) => {

    const [currIndex, setCurrIndex] = useState(0);

    const handleChange = (__event: React.SyntheticEvent, newValue: number) => {
        setCurrIndex(newValue);
      };

    return(<Stack>
        <Tabs 
            //variant={"fullWidth"}
            aria-label="scrollable auto tabs example" 
            color="white"             
            textColor={"primary"} 
            value={currIndex} 
            onChange={handleChange} >            
                {tabs.map((tab) => {
                    return <StyledTab label={tab.title} />
                })}
        </Tabs>      
        {tabs.map((tab, index) => {
            return <TabPanel currIndex={currIndex} index={index}><tab.Element {...tab.props}/></TabPanel>
        })}
    </Stack>)
}

export default SDPTabs