import { Box, Button, Typography } from "@mui/material"
import TopBarBtns from "./TopBarBtns";
import Nav from "./NavDesktop";



const TopBar = () => {
    return(<Box sx={{zIndex: 4,color: "white", display: "flex", justifyContent: "space-between", alignItems: 'center', py: 2}}>
        <Typography sx={{textTransform: "uppercase"}} variant="h5">Screen Score</Typography>
        <Nav />
        <TopBarBtns />
    </Box>)
}

export default TopBar