import { Button } from "@mui/material"
import { FaPlayCircle } from "react-icons/fa"
import { Movie } from "../../../types/tmdb"
import { modal$, trailerMovieId$ } from "../../../state/atoms/data"
import { useSetRecoilState } from "recoil"




const WatchTrailerBtn = ({id} : Partial<Movie>) => {
    const setTrailerMovieId = useSetRecoilState(trailerMovieId$)
    const setModalStatus = useSetRecoilState(modal$)

    const open = () => {    
        setTrailerMovieId(id!);
        setModalStatus(true)

    }
    
    return(<Button onClick={open} startIcon={<FaPlayCircle/>} size="small" variant="contained">Watch trailer</Button>)
}

export default WatchTrailerBtn