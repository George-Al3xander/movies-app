import { HeaderContainer } from "../styled/styled"
import HeaderBg from "../../assets/bg/stock-bg-2.jpg"
import { Stack, Typography } from "@mui/material"



const PersonHeader = () => (
    <HeaderContainer shadowStrong maxWidth="xl" sx={{
        backgroundSize: "cover",backgroundPosition: "center",backgroundImage: `url(${HeaderBg})`,
    }}>
        <Stack maxWidth={{sm:"50%"}} marginBlock={"auto 5%"} zIndex={4} direction={"column"} spacing={2}>
            {/* <Typography textTransform={"capitalize"} fontWeight={"600"} variant="h4">Get to know people behind characters and scenes</Typography> */}
            {/* <Typography sx={{opacity: ".7"}} variant="subtitle2">Get to know people behind characters and scenes</Typography> */}
        </Stack>
    </HeaderContainer>
)

export default PersonHeader