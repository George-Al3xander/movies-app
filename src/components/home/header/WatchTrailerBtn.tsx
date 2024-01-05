import { Button } from "@mui/material"
import { FaPlayCircle } from "react-icons/fa"
import { Movie, TV } from "../../../types/tmdb"
import { modal$, trailerProduct$ } from "../../../state/atoms/data"
import { useSetRecoilState } from "recoil"




const WatchTrailerBtn = ({product} : {product: (Movie & TV)}) => {
    const setTrailerProduct = useSetRecoilState(trailerProduct$)
    const setModalStatus = useSetRecoilState(modal$)

    const open = () => {    
        setTrailerProduct(product);
        setModalStatus(true)
    }
    
    return(<Button onClick={open} startIcon={<FaPlayCircle/>} size="small" variant="contained">Watch trailer</Button>)
}

export default WatchTrailerBtn