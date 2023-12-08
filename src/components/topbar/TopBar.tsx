import { Box, Button, Typography } from "@mui/material"
import TopBarBtns from "./TopBarBtns";
import Nav from "./NavDesktop";
import useScrolled from "../../hooks/useScrolled";



const TopBar = () => {

    const isScrolled = useScrolled();

    return(<Box sx={{
        zIndex: 14,
        color: "white", 
        display: "flex", 
        justifyContent: "space-between", 
        alignItems: 'center', 
        p: 2,
        backgroundColor: isScrolled ? "black" : "transparent",
        position: "sticky",
        top: 0,
        transition: "background-color .3s ease",
     

        }}>
        <Typography sx={{textTransform: "uppercase"}} variant="h5">Screen Score</Typography>
        <Nav />
        <TopBarBtns />
    </Box>)
}

export default TopBar