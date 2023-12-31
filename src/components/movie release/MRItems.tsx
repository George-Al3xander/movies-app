import { FC } from "react";
import { UpcomingElemnt } from "../../types/type";
import { Avatar, Box, Stack, Typography } from "@mui/material";
import moment from "moment";
import OrderedItem from "../horizontal/ordered top/OrderedItem";


interface Props  {
    items: UpcomingElemnt[]
}

const MRItems : FC<Props> = ({items}) => (<Stack spacing={4}>
    {items.map((item) => {
        return <Box key={`mr-${item.month}`}>
        <Typography sx={{py: 2, borderBottom: ".5px solid silver"}} variant="h4">{item.month}</Typography>
        <Box sx={{py: 2,display: "grid", gridTemplateColumns: {xs: 'repeat(1, 1fr)',sm:'repeat(2, 1fr)'}, gap: 4}}>
            {item.results.map((mov) => {                
                return <Stack direction={"row"} spacing={2}>
                    <Avatar sx={{ width: 50, height: 50 ,fontWeight: 600,fontSize: 26 ,bgcolor: "white", color: "black"}}>{moment(mov.release_date).format("DD")}</Avatar>
                    <OrderedItem {...mov}/>
                </Stack>
            })}
        </Box>
        </Box>
    })}
</Stack>)

export default  MRItems