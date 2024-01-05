import { Box, Button, Container, Pagination, Stack } from "@mui/material"
import { PropagateLoader } from "react-spinners";
import Err404 from "../Err404";
import useReviewPagination from "../../hooks/useReviewPagination";
import ReviewsPageHeader from "./ReviewsPageHeader";
import ReviewDisplay from "../single product display/review/ReviewDisplay";
import { FaPencilAlt } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { RiMovie2Fill } from "react-icons/ri";




const ReviewsPage = () => {
    
    const {currentPage: currentPage , data, isLoading, isError, handleChnage} = useReviewPagination()
    const productPath = window.location.hash.replace("#", "") .split("?")[0].replace("/reviews", "")  

    if(isLoading) return <Stack justifyContent={"center"} alignItems={"center"} width={"100vw"} height={"80vh"}>
        <PropagateLoader color="var(--clr-primary)"/>
    </Stack>

    

    if(isError || data == undefined || data.results.length == 0) return <Err404 />

    const {total_pages} =  data

    return(<Box   className="reviews-page">
        <ReviewsPageHeader {...data}/>

        <Container>
            <Stack py={4} alignItems={{sm:"flex-end"}}><Button variant="contained" size="large" startIcon={<FaPencilAlt />}>Write  review</Button></Stack>
            
            <Stack spacing={4}>            
                {data!.results.map((review) => <ReviewDisplay  {...review}/>)}
            </Stack>
            <Stack spacing={10} sx={{mt: 10, textAlign: "center"}}>
                {total_pages > 1 && <Pagination sx={{alignSelf: "center"}} page={currentPage} onChange={handleChnage}  count={total_pages} shape="rounded" />}
                <NavLink  to={productPath}>
                    <Button variant="outlined" startIcon={<RiMovie2Fill />}>Go back to the main page</Button>
                </NavLink>
            </Stack>
        </Container>
     
    </Box>)
}

export default ReviewsPage