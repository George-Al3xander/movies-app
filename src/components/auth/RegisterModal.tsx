import { useRecoilValue } from "recoil"
import { registerModal$ } from "../../state/atoms/data"
import { Box, Modal, TextField } from "@mui/material"




const RegisterModal = () => {
    const open = useRecoilValue(registerModal$)



    return(<Modal open={open}>
        <Box 
            height={"100%"} 
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column"
            }}>
        <TextField id="outlined-email" label="email" variant="outlined" />
        <TextField id="outlined-username" label="username" variant="outlined" />
        
        </Box>
    </Modal>)

}

export default RegisterModal