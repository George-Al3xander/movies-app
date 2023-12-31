import { HeaderContainer } from "../styled/styled"
import HeaderBg from "../../assets/bg/stock-bg-1.jpg"
import { Stack, Typography } from "@mui/material"



const MRHeader = () => (
    <HeaderContainer shadowStrong maxWidth="xl" sx={{
        backgroundSize: "cover",backgroundImage: `url(${HeaderBg})`,
    }}>
        <Stack maxWidth={{sm:"50%"}} marginBlock={"auto 5%"} zIndex={4} direction={"column"} spacing={2}>
            <Typography textTransform={"capitalize"} fontWeight={"600"} variant="h3">Schedule release all movie around the world</Typography>
            <Typography sx={{opacity: ".7"}} variant="subtitle2">Get up to date to movie schedule release all around the world</Typography>
        </Stack>
    </HeaderContainer>
)

export default MRHeader