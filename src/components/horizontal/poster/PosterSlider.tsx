import PosterItem from './PosterItem';
import { StyledSkeleton } from '../../styled/styled';
import SliderTemp from '../../SliderTemp';


const SkeletonItem = () => (<StyledSkeleton variant="rounded"  sx={{height:  {xs: "12rem",sm: "18rem"}}}/>)

const PosterSlider = ({apiUrl, title}:{apiUrl:string,title: string}) => {
    
         
    return(<span className="poster-items main-block"><SliderTemp apiUrl={apiUrl} title={title} LoadingItemCoomp={SkeletonItem} ItemCoomp={PosterItem} /></span>)
}

export default PosterSlider