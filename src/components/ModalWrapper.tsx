import { Box, Button, Modal, Stack, Typography } from "@mui/material"
import { ReactNode } from "react"
import { Logo } from "./topbar/TopBar"


interface Props {
    open: boolean,
    children: ReactNode,
    overview?: string,
    handleClose: () => void,
    minWidth?: string | number,
    minHeight?: string | number,
}

const ModalWrapper = ({open,overview,handleClose,children,minHeight,minWidth}: Props) => (<Modal open={open}>
    <Box 
        height={"100%"} 
        sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column"
        }}>
        <Box minHeight={minHeight ? minHeight :{}} minWidth={minWidth ? minWidth :{}} className="modal-wrapper-body">
            <Box  mb={{xs: "4rem",sm:"2rem"}} display={"flex"} alignItems={"center"} justifyContent={"space-between"}>
                <Stack >
                    <Logo variant="h5"/>
                    {overview && <Typography sx={{opacity: ".6"}} fontSize={14} variant="caption">{overview}</Typography>}
                </Stack>
                <Button size="large" color="info" onClick={handleClose} variant="outlined">Close</Button>
            </Box>
            {children}
        </Box>    
    </Box>
</Modal>)


export default ModalWrapper