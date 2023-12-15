import { Container, Typography } from "@mui/material"
import { Navigation } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"
import { StyledSkeleton } from "../styled/styled"




const VerticalItemsSkeleton = ({title}: {title:string}) => {
    const movies = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]

    return(<Container className='items-vertical' maxWidth="xl">
    <Typography sx={{textTransform: "capitalize", py: 2, fontWeight: "700"}} variant='h5'>{title}</Typography>
    <ul style={{marginInline: "auto"}}>
    <Swiper 
    spaceBetween={10}
    navigation={true} 
    modules={[Navigation]} 
    slidesPerView={"auto"}
    >
        {movies!.map((movie) => {
            return <SwiperSlide key={movie}>
                <StyledSkeleton variant="rounded"  sx={{height:  {xs: "12rem",sm: "18rem"}}}/>
            </SwiperSlide>
        })}
     </Swiper>
    </ul>


  </Container>)
}

export default VerticalItemsSkeleton