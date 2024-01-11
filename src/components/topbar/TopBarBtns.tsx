import { Box, Button } from "@mui/material"
import { CiSearch } from "react-icons/ci";
import { HiMenuAlt3 } from "react-icons/hi";
import { useSetRecoilState } from "recoil";
import { loginModal$, registerModal$ } from "../../state/atoms/data";



const ButtonLogin = () => {
  const setLoginModal = useSetRecoilState(loginModal$)
  return(<Button onClick={() => setLoginModal(true)} sx={{display: {xs: "none", md: "block"}}}  variant="contained">Login</Button>)
}


const ButtonRegister = () => {
  const setRegisterModal = useSetRecoilState(registerModal$)
  return(<Button onClick={() => setRegisterModal(true)} sx={{display: {xs: "none", md: "block"}}}  variant="outlined">Sign up</Button>)
}

const TopBarBtns = () => (<Box sx={{display: "flex", gap: ".5rem", alignItems: "center"}}>
        <button><CiSearch size={25}/></button>
        <ButtonRegister />
        <ButtonLogin />
        <Box sx={{display: {xs: "block", md: "none"}}} ><HiMenuAlt3 size={30}/></Box>
  </Box>)


export default TopBarBtns