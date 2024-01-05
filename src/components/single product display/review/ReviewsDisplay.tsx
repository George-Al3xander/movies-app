import { FC } from "react"
import { fetchFromTmdb } from "../../../utils"
import { useQuery } from "@tanstack/react-query"
import { Reviews } from "../../../types/tmdb"
import { Alert, Button, Container, Stack } from "@mui/material"
import ReviewDisplay from "./ReviewDisplay"
import { StyledSkeleton } from "../../styled/styled"
import { FaPencilAlt } from "react-icons/fa";
import { NavLink } from "react-router-dom"
interface Props {
    apiLink: string,
}


const Skeleton = () => {
    const dummy = [1,2,3]
    return(<Container>
        <Stack py={4} alignItems={{sm:"flex-end"}}><Button variant="contained" size="large" startIcon={<FaPencilAlt />}>Write  review</Button></Stack>

        <Stack spacing={4}>       
            {dummy.map((el) => {
                return <StyledSkeleton variant="rounded" height={200} key={"review-dummy"+el}/>
            })}        
        </Stack>
         <Stack py={2} alignItems={{sm:"flex-end"}}><Button sx={{fontSize: 18}} size="large">Read more...</Button></Stack>
    </Container>)
}


const ReviewsDisplay : FC<Props> = ({apiLink}) => {

    const fetch = async () => await fetchFromTmdb(apiLink+"/reviews")  as Reviews
    const {data,isError,isLoading} = useQuery({queryKey: ["single-product-display", "reviews"], queryFn: fetch})
    
    if(isLoading) return <Skeleton />

    if(isError || data == undefined) return <Alert  severity="error">Couldn't fetch people list</Alert>
    
    
    return(<Container>
        <Stack py={4} alignItems={{sm:"flex-end"}}><Button variant="contained" size="large" startIcon={<FaPencilAlt />}>Write  review</Button></Stack>
        
        <Stack spacing={4}>            
            {data!.results.slice(0,3).map((review) => <ReviewDisplay  {...review}/>)}
        </Stack>
        {(data!.total_results > 3 && !isLoading) && <Stack py={2} alignItems={{sm:"flex-end"}}><NavLink to="reviews?page=1"><Button sx={{fontSize: 18}} size="large">Read more...</Button></NavLink></Stack>}
    </Container>)

}

export default ReviewsDisplay