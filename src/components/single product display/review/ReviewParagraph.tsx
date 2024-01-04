import { Box, Button, Stack, Typography, TypographyClassKey, TypographyClasses } from "@mui/material"
import { useEffect, useRef, useState } from "react"
import { defaultShadow, strongShadow } from "../../styled/styled";
import { FaAngleDown } from "react-icons/fa6";



const ReviewParagraph = ({content}:{content: string}) => {

    const paraRef = useRef<any>(null);


    const [isOpen,setIsOpen] = useState(false)
    const styles = {
        WebkitLineClamp: "3",
        WebkitBoxOrient: "vertical",
        overflow: "hidden",
        position: "relative",
        display: "-webkit-box",
        '&::before': {
            content: '""',
            position: "absolute",
            inset: '0',                   
            zIndex:"2",            
            top: 0,
            bottom: 0,
            background: defaultShadow
        }
        
    }
    useEffect(() => {
        if(paraRef.current) {        
            setIsOpen(paraRef.current.scrollHeight === paraRef.current.clientHeight)            
        }
    },[])

    return(<Box>
        <Typography sx={isOpen ? {} : styles} ref={paraRef} fontSize={18} variant="subtitle1">{content}</Typography>
        {!isOpen && <Stack py={1} alignItems={{sm:"flex-end"}}><Button onClick={() => setIsOpen(true)}><FaAngleDown size={30}/></Button></Stack>}
    </Box>)
}

export default ReviewParagraph