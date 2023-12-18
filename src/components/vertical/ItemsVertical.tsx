import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import ItemVertical from './ItemVertical';
import { Alert,Container, Typography } from '@mui/material';
import { Movie, PopularMovies, TrendingMediaType, TrendingResults } from '../../types/tmdb';
import { useQuery } from '@tanstack/react-query';
import { fetchOptions } from '../../App';
import { Swiper,  SwiperProps, SwiperSlide } from 'swiper/react';

import { Navigation } from 'swiper/modules';
import VerticalItemsSkeleton from '../skelton/VerticalItemsSkelton';
import { StyledSlider } from '../styled/styled';


interface ItemsVerticalProps extends  SwiperProps {
    apiUrl:string, 
    title: string,
    CustomItem?: ({ movie, index }: { movie: Movie; index: number; }) => JSX.Element
}

const ItemsVertical = ({apiUrl, title,slidesPerView,CustomItem, spaceBetween}:ItemsVerticalProps) => {
    
    

      const getMovies =  async () => {
        const response = await fetch(apiUrl, fetchOptions)
        const data = await response.json() as PopularMovies & TrendingResults<TrendingMediaType>
        if(data.results.some((el) => el.media_type)) {
            return data.results.filter((el) => el.media_type == "movie" || el.media_type == "tv")            
        } else {
            return data.results 
        }
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
      spaceBetween={spaceBetween ? spaceBetween : 10}
      navigation={true} 
      modules={[Navigation]} 
      slidesPerView={slidesPerView ? slidesPerView : "auto"}
      
      // breakpoints={{
      //   0: {
      //     slidesPerView: 2
      //   },
      //   600: {
      //     slidesPerView: 6

      //   }
      // }}
       >
          

       </Swiper>
       <StyledSlider slidesPerView={slidesPerView ? slidesPerView : "auto"} spaceBetween={spaceBetween ? spaceBetween : 10}>
            {movies!.map((movie, index) => {
                    const tvMovie = {...movie, title: movie.title ? movie.title : movie.name as string}
                    return <SwiperSlide>
                            {CustomItem ?
                            <CustomItem {...{movie: tvMovie,index}}/>
                            :
                            <ItemVertical movie={tvMovie} key={movie.id}/>
                            }
                    </SwiperSlide>
                })}
       </StyledSlider>

      </ul>


    </Container>
    
    )
}

export default ItemsVertical