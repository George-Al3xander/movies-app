import { Box, Button, Typography, TypographyProps } from "@mui/material"
import TopBarBtns from "./TopBarBtns";
import Nav from "./NavDesktop";
import useScrolled from "../../hooks/useScrolled";
import { TopBarContainer } from "../styled/styled";

export const Logo = ({variant="h5", ...props}: TypographyProps) => (<Typography sx={{textTransform: "uppercase"}} variant={variant} {...props}>Screen Score</Typography>)


const TopBar = () => {

    const isScrolled = useScrolled();
   
    return(<TopBarContainer className="top-bar" sx={{backgroundColor: isScrolled ? "#0D0C0F" : "transparent"}}>
        <Logo />
        <Nav />
        <TopBarBtns />
    </TopBarContainer>)
}

export default TopBar