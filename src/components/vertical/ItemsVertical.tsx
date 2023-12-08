import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import ItemVertical from './ItemVertical';
import { Alert,Container, Typography } from '@mui/material';
import { PopularMovies } from '../../types/tmdb';
import { useQuery } from '@tanstack/react-query';
import { fetchOptions } from '../../App';



const ItemsVertical = ({apiUrl, title}:{apiUrl:string, title: string}) => {
    
    const responsive = {
        superLargeDesktop: {
          // the naming can be any, depends on you.
          breakpoint: { max: 4000, min: 3000 },
          items: 5
        },
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 4,
          slidesToSlide: 4
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 2,
          slidesToSlide: 2
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1,   

        }
      };

      const getMovies =  async () => {
        const response = await fetch(apiUrl, fetchOptions)
        const data = await response.json() as PopularMovies
        return data.results
    }

    const {data: movies, isLoading, isError} = useQuery({queryKey: ["vertical-movies"], queryFn: getMovies})

    
    
    if(isLoading) {
        return "Loading"
    }
    
    if(isError) {
        return <Alert severity="error">Failed to fetch movies, try reloading page!</Alert>
    }
      
    return(<Container>
      <Typography sx={{textTransform: "capitalize", py: 2, fontWeight: "700"}} variant='h5'>{title}</Typography>
      <ul style={{marginInline: "auto"}}>
        <Carousel centerMode focusOnSelect   responsive={responsive}>
          {movies!.map((movie) => {
              return <ItemVertical movie={movie} key={movie.id}/>
          })}
        </Carousel>

      </ul>


    </Container>
    
    )
}

export default ItemsVertical