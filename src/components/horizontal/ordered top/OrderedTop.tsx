import OrderedItem from "./OrderedItem";
import { Box, Typography } from "@mui/material";
import SliderTemp from "../../SliderTemp";
import { StyledSkeleton } from "../../styled/styled";

const SkeletonItem = ({index}: {index: number}) =>  {
    return (<Box className="ordered-item">
        <Typography fontWeight={700} sx={{alignSelf: "center"}} variant="h1">{index}</Typography>
        <StyledSkeleton width={"100%"} variant="rounded"  sx={{height:  {xs: "8rem",sm: "12rem"}}}/>             
    </Box>)
}


const OrderedTop = (props:{apiUrl: string,title: string}) => {
    

    return(<Box sx={{my: 4}} className="ordered-top">
        <SliderTemp LoadingItemCoomp={SkeletonItem} spaceBetween={80} ItemCoomp={OrderedItem} {...props}/>
    </Box>)
}

export default OrderedTop