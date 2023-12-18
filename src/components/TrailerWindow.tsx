import { Alert, AlertTitle, Box, Button, Modal, Skeleton, Typography } from "@mui/material"
import ReactPlayer from "react-player"
import { useRecoilValue, useSetRecoilState } from "recoil"
import { modal$, trailerMovieId$ } from "./state/atoms/data"
import { fetchOptions } from "../App"
import { Video, Videos } from "../types/tmdb"
import { useQuery } from "@tanstack/react-query"
import { modalStatus$ } from "./state/selectors/selectors"
import { IoIosCloseCircle } from "react-icons/io";


const TrailerMenu = () => {

    const open = useRecoilValue(modal$)
    const id = useRecoilValue(trailerMovieId$);
    const setModalStatus = useSetRecoilState(modal$)
    
    const getVideos = async () => {      
            const response = await fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, fetchOptions);            
            const data: Videos = await response.json() 
            const filtered = data.results.filter((vid) => vid.type == "Trailer" && vid.site == "YouTube")
            const sorted = filtered.sort((a, b) => b.size - a.size)[0];  
            return sorted        
    }

    const {data, isLoading, isError}= useQuery({queryKey: ["trailer"], queryFn: getVideos})
    if(isError) {
        return <Modal  open={open}>
        <Box height={"100%"} sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",            
            gap: {xs: 2,sm:5},            
        }}>
          <Alert action={<Button  onClick={() => setModalStatus(false)}><IoIosCloseCircle size={45}/></Button>} severity="error">
                    <AlertTitle>Error</AlertTitle>
                    Seems like we couldn't find the trailer for that movie
            </Alert>
        </Box>
    </Modal>
    }
    if(!open) {
        return null
    }
    
    return(<Modal  open={open}>
        <Box height={"100%"} sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            gap: {xs: 2,sm:5},            
        }}>
            <Button  onClick={() => setModalStatus(false)}><IoIosCloseCircle size={45}/></Button>
            {isLoading ?
            <Skeleton sx={{ bgcolor: "grey" }} width={"80%"} height={"70%"}/>
            :
            <ReactPlayer width={"80%"} height={"70%"}  controls url={`https://www.youtube.com/watch?v=${data!.key}`} />
            }

        </Box>
    </Modal>)
}


const TrailerWindow = () => {
    const modal = useRecoilValue(modalStatus$)
    
    if(!modal) {
        return null
    }

    return(<TrailerMenu />)
}

export default TrailerWindow