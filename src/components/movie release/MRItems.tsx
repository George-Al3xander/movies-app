import { FC } from "react";
import { UpcomingElemnt } from "../../types/type";
import { Avatar, Box, Stack, Typography } from "@mui/material";
import moment from "moment";


interface Props  {
    items: UpcomingElemnt[]
}

const MRItems : FC<Props> = ({items}) => (<Stack>
    {items.map((item) => {
        return <Box>
            <Typography sx={{py: 2, borderBottom: ".5px solid silver"}} variant="h4">{item.month}</Typography>
            {item.results.map((mov) => {
                return <Box>
                    <Avatar sx={{ bgcolor: "white", color: "black"}}>{moment(mov.release_date).format("D")}</Avatar>
                </Box>
            })}
            </Box>
    })}
</Stack>)

export default  MRItems