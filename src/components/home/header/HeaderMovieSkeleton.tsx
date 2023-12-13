import { Box, Button, ButtonGroup, Skeleton, Stack} from "@mui/material"
import SliderControls from "../SliderControls"
import { FaPlayCircle } from "react-icons/fa";
import { CiBookmark } from "react-icons/ci";



const HeaderMovieSkeleton = () => {
    const disabledClr = "grey";

    return(
    <Stack>
        <Box  sx={{    
            maxWidth: {xs: "100%", sm: "60%"},        
            display: "flex",
            p:2,
            flexDirection: "column"}}>
                <Stack sx={{zIndex: 4}} spacing={1} direction="column" >
                    <Skeleton sx={{ bgcolor: disabledClr }} variant="text" width={"70%"} height={35} />                     
                    <Skeleton  sx={{ bgcolor: disabledClr , fontSize: "12px"}} variant="text" width={"40%"} height={15} />                     
                    <Skeleton sx={{ bgcolor: disabledClr }} variant="text" width={"90%"} height={100} />     
                    <ButtonGroup sx={{display: "flex", justifyContent:{xs: "center", sm: "flex-start"}}}>
                        <Button sx={{"&.Mui-disabled": {background: disabledClr}
                        }}  disabled startIcon={<FaPlayCircle/>} size="small" variant="contained">Watch trailer</Button>
                        <Button sx={{"&.Mui-disabled": { color: disabledClr, border: disabledClr}
                        }}  disabled color="info" startIcon={<CiBookmark />} size="small" variant="outlined">Add Watchlist</Button>
                    </ButtonGroup>
                </Stack>

        </Box>
        <SliderControls disabled />       

    </Stack>
   )
}


export default HeaderMovieSkeleton