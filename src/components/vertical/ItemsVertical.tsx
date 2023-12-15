import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import ItemVertical from './ItemVertical';
import { Alert,Container, Typography } from '@mui/material';
import { PopularMovies } from '../../types/tmdb';
import { useQuery } from '@tanstack/react-query';
import { fetchOptions } from '../../App';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import VerticalItemsSkeleton from '../skelton/VerticalItemsSkelton';

const ItemsVertical = ({apiUrl, title}:{apiUrl:string, title: string}) => {
    
    

      const getMovies =  async () => {
        const response = await fetch(apiUrl, fetchOptions)
        const data = await response.json() as PopularMovies
        return data.results
    }

    const {data: movies, isLoading, isError} = useQuery({queryKey: ["vertical-movies", title], queryFn: getMovies})

    
    
    if(isLoading) {
        return <VerticalItemsSkeleton title={title}/>
    }
    
    if(isError) {
        return <Alert severity="error">Failed to fetch movies, try reloading page!</Alert>
    }
     
    return(<Container className='items-vertical' maxWidth="xl">
      <Typography sx={{textTransform: "capitalize", py: 2, fontWeight: "700"}} variant='h5'>{title}</Typography>
      <ul style={{marginInline: "auto"}}>
      <Swiper 
      spaceBetween={10}
      navigation={true} 
      modules={[Navigation]} 
      slidesPerView={"auto"}
      
      // breakpoints={{
      //   0: {
      //     slidesPerView: 2
      //   },
      //   600: {
      //     slidesPerView: 6

      //   }
      // }}
       >
          {movies!.map((movie) => {
              return <SwiperSlide><ItemVertical movie={movie} key={movie.id}/></SwiperSlide>
          })}

       </Swiper>

      </ul>


    </Container>
    
    )
}

export default ItemsVertical