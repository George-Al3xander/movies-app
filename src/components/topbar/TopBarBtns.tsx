import { Box, Button } from "@mui/material"
import { CiSearch } from "react-icons/ci";
import { HiMenuAlt3 } from "react-icons/hi";


const TopBarBtns = () => {


    return(<Box sx={{display: "flex", gap: ".5rem", alignItems: "center"}}>
        <button><CiSearch size={25}/></button>
        <Button sx={{display: {xs: "none", md: "block"}}}  variant="outlined">Sign up</Button>
        <Button sx={{display: {xs: "none", md: "block"}}}  variant="contained">Login</Button>
        <Box sx={{display: {xs: "block", md: "none"}}} ><HiMenuAlt3 size={30}/></Box>
  </Box>)
}

export default TopBarBtns