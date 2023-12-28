import { Breadcrumbs, Stack, SxProps, Typography } from "@mui/material"
import { NavLink } from "react-router-dom"




const Nav = ({sep, sx, fontSize}: {sep?:boolean,sx?: SxProps, fontSize?: number | string}) => {
    const links = ["home", "movie release", "about"]


    if(sep) {
      return (<Breadcrumbs   sx={{...sx,color: "white"}}>        
      {links.map((link) => {
        return <NavLink className="navigation-link"  to={link == "home" ? "/" : link.replace(" ", "")}><Typography fontSize={fontSize && fontSize}  variant="button">{link}</Typography></NavLink>
      })}  
    </Breadcrumbs>)
    }

    return(<Stack sx={{...sx,display: {xs: "none", md: "block"}}} direction="row" spacing={1}>        
        {links.map((link) => {
          return <NavLink  to={link == "home" ? "/" : link.replace(" ", "")}><Typography fontSize={fontSize && fontSize}  variant="button">{link}</Typography></NavLink>
        })}  
      </Stack>)
}

export default Nav