import { Button, ButtonGroup, Stack} from "@mui/material"

import { FaPlayCircle } from "react-icons/fa";
import { CiBookmark } from "react-icons/ci";
import { HeaderMovieContainer, StyledSkeleton } from "../styled/styled";



const HeaderMovieSkeleton = () => {
    const disabledClr = "grey";

    return(<HeaderMovieContainer sx={{minHeight: "29rem"}}>
        <Stack sx={{zIndex: 4, m: "auto 0 3rem 1rem"}} spacing={1} direction="column" >
            <StyledSkeleton  variant="text" width={"70%"} height={35} />                     
            <StyledSkeleton  sx={{ fontSize: "12px"}} variant="text" width={"40%"} height={15} />                     
            <StyledSkeleton  variant="text" width={"90%"} height={100} />     
            <ButtonGroup sx={{display: "flex", justifyContent:{xs: "center", sm: "flex-start"}}}>
                <Button sx={{"&.Mui-disabled": {background: disabledClr}
                }}  disabled startIcon={<FaPlayCircle/>} size="small" variant="contained">Watch trailer</Button>
                <Button sx={{"&.Mui-disabled": { color: disabledClr, border: disabledClr}
                }}  disabled color="info" startIcon={<CiBookmark />} size="small" variant="outlined">Add Watchlist</Button>
            </ButtonGroup>
        </Stack>
    </HeaderMovieContainer>)
}


export default HeaderMovieSkeleton