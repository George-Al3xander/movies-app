import { Box, Stack, Typography } from "@mui/material"
import { Review } from "../../../types/tmdb"
import { FaStar } from "react-icons/fa"
import { MovieRating } from "../../styled/styled"
import moment from "moment"
import ReviewParagraph from "./ReviewParagraph"

interface ReviewProps extends Review {
    index?:number

}


const ReviewDisplay = ({author_details,content,created_at,index}: ReviewProps) => {
    const {rating,username} = author_details

    return(<Stack sx={{backgroundColor: "black"}} p={2} borderRadius={"1rem"} border={"1px solid white"} spacing={2}>
        <Stack spacing={1} >
            {rating && <MovieRating fontSize={16} outOf>{rating}</MovieRating>}
            <Stack direction={"row"} alignItems={"center"} spacing={1}>
                <Typography sx={{"&:hover": {textDecoration: "underline", cursor: "pointer"}}}>{username}</Typography>
                <Typography  sx={{opacity: ".7"}}>{moment(created_at).format("ll")}</Typography>
            </Stack>
        </Stack>             
        <ReviewParagraph content={content}/>
    </Stack>)
}

export default ReviewDisplay