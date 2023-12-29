import { Button, ButtonGroup, Stack} from "@mui/material"

import { FaPlayCircle } from "react-icons/fa";
import { CiBookmark } from "react-icons/ci";
import { HeaderContainer, StyledSkeleton } from "../styled/styled";

type Props = {
    noDesc?: boolean
}

export const HeaderMovieInfoSkeleton = ({noDesc}: Props) => {
    const disabledClr = "grey";

    return(<Stack sx={{zIndex: 4, m: "auto 0 3rem 1rem"}} spacing={1} direction="column" >
        <StyledSkeleton  variant="text" width={"70%"} height={35} />                     
        <StyledSkeleton  sx={{ fontSize: "12px"}} variant="text" width={"40%"} height={15} />                     
        {!noDesc &&
        <StyledSkeleton  variant="text" width={"90%"} height={100} />     
        }
        <ButtonGroup sx={{display: "flex", justifyContent:{xs: "center", sm: "flex-start"}}}>
            <Button sx={{"&.Mui-disabled": {background: disabledClr}
            }}  disabled startIcon={<FaPlayCircle/>} size="small" variant="contained">Watch trailer</Button>
            <Button sx={{"&.Mui-disabled": { color: disabledClr, border: disabledClr}
            }}  disabled color="info" startIcon={<CiBookmark />} size="small" variant="outlined">Add Watchlist</Button>
        </ButtonGroup>
    </Stack>)
}

const HeaderMovieSkeleton = () => {

    return(<HeaderContainer maxWidth="xl" sx={{minHeight: "29rem"}}>
        <HeaderMovieInfoSkeleton />
    </HeaderContainer>)
}


export default HeaderMovieSkeleton