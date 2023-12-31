import { Alert, AlertTitle, Box, Button, Modal, Skeleton } from "@mui/material"
import ReactPlayer from "react-player"
import { useRecoilValue, useSetRecoilState } from "recoil"
import { modal$, trailerProduct$ } from "../state/atoms/data"
import {  Videos } from "../types/tmdb"
import { useQuery } from "@tanstack/react-query"
import { modalStatus$ } from "../state/selectors/selectors"
import { IoIosCloseCircle } from "react-icons/io";
import { fetchFromTmdb } from "../utils"


const TrailerMenu = () => {

    const open = useRecoilValue(modal$)
    const {id,title} = useRecoilValue(trailerProduct$)!;
    const setModalStatus = useSetRecoilState(modal$)
    
    const getVideos = async () => {  
            const data: Videos = await fetchFromTmdb(`https://api.themoviedb.org/3/${title ? "movie" : "tv"}/${id}/videos?language=en-US`)
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