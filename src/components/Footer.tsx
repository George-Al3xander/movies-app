import { Box, Breadcrumbs, Container, Link, Stack, Typography } from "@mui/material"
import Nav from "./topbar/NavDesktop"
import { FaFacebookSquare, FaInstagram,FaTwitterSquare  } from "react-icons/fa";
import { AiFillGoogleSquare } from "react-icons/ai";


const Footer = () => {


    const socialMedia = [
        {name: "Facebook", Icon: FaFacebookSquare, link: "https://www.facebook.com"},
        {name: "Instagram", Icon: FaInstagram, link: "https://www.instagram.com"},
        {name: "Twitter", Icon: FaTwitterSquare, link: "https://twitter.com"},
        {name: "Google", Icon: AiFillGoogleSquare, link: "https://www.google.com"},
    ]

    const bottomLinks = [
        {name: 'Privacy policy'},
        {name: 'Term of service'},
        {name: 'Language'},
    ]

    return(<Box sx={{borderTop: "0.1px solid lightgrey", pt: 10,mt: 10, pb: 2}}>
    <Container maxWidth="xl">
        <Box sx={{display: "flex",gap: 2,flexDirection: {xs: "column-reverse", sm: "column"}}}>
            <Nav fontSize={18} sx={{alignSelf: {xs: "center", sm: "flex-end"}}} sep/>
            <Box sx={{display: "flex",gap: 2,flexDirection: {xs: "column", sm: "row"}}}>
                <Typography sx={{flexBasis:"50%"}} variant="h4">Our platform is trusted by millions & features best updated movies all around the world.</Typography>
                <Stack sx={{flexBasis:"100%",justifyContent: {xs: "center", sm: "flex-end"}, alignSelf:   {xs: "center",sm:"flex-end"}}} direction={"row"} spacing={1}>
                    {socialMedia.map(({name,Icon,link}) => {
                        return <Link target="_blank" color={"#FFFFFF"} sx={{transition: "all .5s ease" ,"&:hover": {opacity: ".7", cursor: "pointer", fill: "green"}}}  key={"footer-link"+name} href={link}>
                            <Icon  size={30}/>
                        </Link>
                    })}
                </Stack>
            </Box>
        </Box>
        <Box sx={{display: "flex",gap: 2,flexDirection: {xs: "column", sm: "row"}, justifyContent: "space-between", paddingBlock:"5rem 1rem"}}>
            <Stack sx={{mx: {xs:"auto", sm: "initial"}}}   direction={"row"} spacing={1}>
                {bottomLinks.map(({name}) => {
                    return <Link target="_blank" fontSize={12} sx={{opacity: ".7", "&:hover": {opacity: "1", cursor: "pointer"}}} underline="none" color={"#FFFFFF"} variant="subtitle1">{name}</Link>
                })}
            </Stack> 
            <Typography fontSize={12} sx={{opacity: ".7",mx: {xs:"auto", sm: "initial"}}} variant="subtitle1">©2023</Typography>
        </Box>
       
    </Container>
    </Box>)
}

export default Footer