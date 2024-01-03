import {   Stack} from "@mui/material"
import {StyledSkeleton} from "../../styled/styled"

import SliderTemp from "../../SliderTemp"
import BackdropItem from "./BackdropItem"


const SkeletonItem = () => (<Stack spacing={2}>
    <StyledSkeleton variant="rounded"  sx={{height:  {xs: "6rem",sm: "12rem"}}}/>
    <StyledSkeleton variant="text"  width={"80%"} sx={{height:  "2rem"}}/>
    <StyledSkeleton variant="text" width={"40%"}  sx={{height:  "2rem"}}/>
</Stack>)




const BackdropSlider = ({apiUrl, title}:{apiUrl:string,title?: string}) => {   
    return(<span className="backdrop-items"><SliderTemp apiUrl={apiUrl} title={title} ItemCoomp={BackdropItem} LoadingItemCoomp={SkeletonItem}/></span>)
}

export default BackdropSlider