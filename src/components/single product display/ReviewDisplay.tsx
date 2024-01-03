import { Stack, Typography } from "@mui/material"
import { Review } from "../../types/tmdb"
import { FaStar } from "react-icons/fa"




const ReviewDisplay = ({author_details,content}: Review) => {


    return(<Stack>
        <Stack alignItems={"center"}  direction={"row"} spacing={.5} >
            <FaStar size={12} style={{fill: "gold"}}/>
            <Typography variant="caption" fontSize={12}>{author_details.rating} / 10</Typography>
        </Stack>
        <Typography>
            {content}
        </Typography>

    </Stack>)
}

export default ReviewDisplay