import { Typography } from "@mui/material"
import { NavLink } from "react-router-dom"




const Nav = () => {
    const links = ["home", "movie release", "about"]


    return(<nav className="desktop">        
        {links.map((link) => {
          return <NavLink to={link == "home" ? "/" : link.replace(" ", "")}><Typography variant="button">{link}</Typography></NavLink>
        })}  
      </nav>)
}

export default Nav