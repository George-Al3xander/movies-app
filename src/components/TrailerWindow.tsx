import { Alert, AlertTitle, Box, Button, Modal, Skeleton, Stack, Typography } from "@mui/material"
import ReactPlayer from "react-player"
import { useRecoilValue, useSetRecoilState } from "recoil"
import { modal$, trailerProduct$ } from "../state/atoms/data"
import {  Videos } from "../types/tmdb"
import { useQuery } from "@tanstack/react-query"
import { modalStatus$ } from "../state/selectors/selectors"
import { IoIosCloseCircle } from "react-icons/io";
import { fetchFromTmdb } from "../utils"
import ModalWrapper from "./ModalWrapper"


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
    
    if(!open) {
        return null
    }
    
    return(<ModalWrapper  open={open} handleClose={() => setModalStatus(false)}>
        {isLoading ?
            <Box width={"100%"} height={"30%"}><Skeleton sx={{ bgcolor: "grey"}} width={"100%"} height={"250%"}/> </Box>          
            :
            isError?
            <Stack justifyContent={"center"} alignItems={"center"} width={"100%"} height={"60%"}>
                 <Typography color={"var(--clr-primary)"} variant="h1">404</Typography>
                 <Typography textAlign={"center"} color={"var(--clr-primary)"} variant="h5">Seems like we couldn't find the trailer for that movie</Typography>
            </Stack>
            :
            <ReactPlayer width={"100%"} height={"80%"}  controls url={`https://www.youtube.com/watch?v=${data!.key}`} />
        }
    </ModalWrapper>)
}


const TrailerWindow = () => {
    const modal = useRecoilValue(modalStatus$)
    
    if(!modal) {
        return null
    }

    return(<TrailerMenu />)
}

export default TrailerWindow