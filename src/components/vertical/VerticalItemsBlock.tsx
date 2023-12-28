import { Box, Chip, Container, Stack } from "@mui/material"
import GridSlider from "./GridSlider"
import { Images, Movie, TV } from "../../types/tmdb"
import HeaderMovieInfo from "../home/header/swiper/HeaderMovieInfo"
import OrderedItem from "../horizontal/ordered top/OrderedItem"
import { fetchFromTmdb } from "../../utils"
import { useQuery } from "@tanstack/react-query"
import { StyledSkeleton } from "../styled/styled"


type ContentItem = {title: string, apiUrl: string}
const Loading = () => (<div>"Loading...</div>)

const MainCoomp = (props: Movie & TV) =>  {
    const {id,title,name,backdrop_path,release_date, first_air_date} = props
    const getPics =  async () => {  
        const data = await fetchFromTmdb(`https://api.themoviedb.org/3/${title ? "movie" : "tv"}/${id}/images`) as Images
        return data.backdrops.filter((el) => el.iso_639_1 == "en")
    }
    
    const {data, isLoading, isError} = useQuery({queryKey: ["vertical-item","main", "backdrop",id], queryFn: getPics})
    
    
    
    return (<Stack spacing={4}>
    {isLoading ?
    <StyledSkeleton height={300}/>
    :
        <img style={{ maxHeight: "20rem", objectFit: "cover"}}   src={`http://image.tmdb.org/t/p/original${(data?.length! == 0 || isError) ?  backdrop_path : data![0]!.file_path}`} alt={title ? title : name} />
    } 
    <Chip sx={{width: "30%", fontSize: 18}} color="info" label={(release_date ? release_date : first_air_date).split("-")[0]}/>
    <HeaderMovieInfo rating {...props}/>

</Stack>)}


const VerticalItemsBlock = ({content}: {content: [ContentItem,ContentItem,ContentItem]}) => {


    const [firstItem,secondItem,thirdItem] = content


    return(<Container maxWidth="xl">
    <Box sx={{display: "flex",   mx: "auto", justifyContent: "space-between", flexDirection: {xs: "column", sm: "row"}}}>
        <GridSlider className="main-slider" rows={1} {...firstItem}  LoadingItemCoomp={Loading} ItemCoomp={MainCoomp} />
        <GridSlider className="side-slider" rows={4} {...secondItem} LoadingItemCoomp={Loading} ItemCoomp={OrderedItem} />
        <GridSlider className="side-slider" rows={4} {...thirdItem}  LoadingItemCoomp={Loading} ItemCoomp={OrderedItem} />
    </Box>
    </Container>)
}

export default VerticalItemsBlock