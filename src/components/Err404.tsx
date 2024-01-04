import { Button, Stack, Typography } from "@mui/material"
import { NavLink } from "react-router-dom"




const Err404 = () =>(<Stack justifyContent={"center"} alignItems={"center"} width={"100vw"} height={"80vh"}>
    <Typography color={"var(--clr-primary)"} variant="h1">404</Typography>
    <Typography color={"var(--clr-primary)"} variant="h5">Not found</Typography>
    
    <NavLink style={{marginTop: "1rem"}} to="/"><Button variant="outlined">Go Home</Button></NavLink>    
</Stack>)

export default Err404
