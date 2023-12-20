import 'react-multi-carousel/lib/styles.css';
import ItemVertical from './ItemVertical';
import { StyledSkeleton } from '../styled/styled';
import SliderTemp from '../SliderTemp';


const SkeletonItem = () => (<StyledSkeleton variant="rounded"  sx={{height:  {xs: "12rem",sm: "18rem"}}}/>)

const ItemsVertical = ({apiUrl, title}:{apiUrl:string,title: string}) => {
    
         
    return(<SliderTemp apiUrl={apiUrl} title={title} LoadingItemCoomp={SkeletonItem} ItemCoomp={ItemVertical} />)
}

export default ItemsVertical