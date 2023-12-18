import OrderedItem from "./OrderedItem";
import ItemsVertical from "../vertical/ItemsVertical";
import { Box } from "@mui/material";



const OrderedTop = (props:{apiUrl: string,title: string}) => {


    

    return(<Box className="ordered-top">
        <ItemsVertical spaceBetween={80} CustomItem={OrderedItem} {...props}/>
    </Box>)
}

export default OrderedTop