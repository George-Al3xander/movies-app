import { Box, Button, Typography } from "@mui/material"
import TopBarBtns from "./TopBarBtns";
import Nav from "./NavDesktop";
import useScrolled from "../../hooks/useScrolled";
import { TopBarContainer } from "../styled/styled";



const TopBar = () => {

    const isScrolled = useScrolled();
    

    return(<TopBarContainer sx={{backgroundColor: isScrolled ? "#0D0C0F" : "transparent"}}>
        <Typography sx={{textTransform: "uppercase"}} variant="h5">Screen Score</Typography>
        <Nav />
        <TopBarBtns />
    </TopBarContainer>)
}

export default TopBar