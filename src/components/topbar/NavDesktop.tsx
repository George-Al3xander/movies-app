import { Stack, Typography } from "@mui/material"
import { NavLink } from "react-router-dom"




const Nav = () => {
    const links = ["home", "movie release", "about"]


    return(<Stack sx={{display: {xs: "none", md: "block"}}} direction="row" spacing={1}>        
        {links.map((link) => {
          return <NavLink  to={link == "home" ? "/" : link.replace(" ", "")}><Typography  variant="button">{link}</Typography></NavLink>
        })}  
      </Stack>)
}

export default Nav