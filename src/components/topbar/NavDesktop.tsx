import { Breadcrumbs, Stack, SxProps, Typography } from "@mui/material"
import { NavLink } from "react-router-dom"




const Nav = ({sep, sx, fontSize}: {sep?:boolean,sx?: SxProps, fontSize?: number | string}) => {
    const links = [
      {name: "home", link: "/"}, 
      {name: "movie release", link: "/upcoming"}, 
      {name: "about", link: "/about"}
    ]


    if(sep) {
      return (<Breadcrumbs   sx={{...sx,color: "white"}}>        
      {links.map(({link, name}) => {
        return <NavLink className="navigation-link"  to={link}><Typography fontSize={fontSize && fontSize}  variant="button">{name}</Typography></NavLink>
      })}  
    </Breadcrumbs>)
    }

    return(<Stack sx={{...sx,display: {xs: "none", md: "block"}}} direction="row" spacing={1}>        
        {links.map(({link, name}) => {
          return <NavLink className="navigation-link"  to={link}><Typography fontSize={fontSize && fontSize}  variant="button">{name}</Typography></NavLink>
        })}  
      </Stack>)
}

export default Nav