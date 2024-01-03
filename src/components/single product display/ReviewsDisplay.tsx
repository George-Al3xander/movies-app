import { FC } from "react"
import { fetchFromTmdb } from "../../utils"
import { useQuery } from "@tanstack/react-query"
import { Review, Reviews } from "../../types/tmdb"
import { Box } from "@mui/material"
import ReviewDisplay from "./ReviewDisplay"

interface Props {
    apiLink: string
}


const ReviewsDisplay : FC<Props> = ({apiLink}) => {

    const fetch = async () => await fetchFromTmdb(apiLink+"/reviews")  as Reviews
    const {data,isLoading,isError} = useQuery({queryKey: ["single-product-display", "reviews"], queryFn: fetch})
    if(isLoading) return "Loading..."
    if(isError) return "ERORR"

    return(<Box>
        {data?.results.slice(0,3).map((review) => <ReviewDisplay {...review}/>)}
    </Box>)

}

export default ReviewsDisplay