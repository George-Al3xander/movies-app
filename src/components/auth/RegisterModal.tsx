import { useRecoilValue, useSetRecoilState } from "recoil"
import { loginModal$, registerModal$ } from "../../state/atoms/data"
import { Alert, Box, Button, InputLabelTypeMap, Modal, Stack, TextField, TextFieldClasses, Typography } from "@mui/material"
import ModalWrapper from "../ModalWrapper"
import { StyledInput } from "../styled/styled"
import useFormData from "../../hooks/useFormData"
import { ReactElement, ReactFragment } from "react"
import useAuthUser from "../../hooks/useAuthUser"
import InputEmail from "./form data inputs/InputEmail"
import InputUsername from "./form data inputs/InputUsername"
import InputPassword from "./form data inputs/InputPassword"
import InputConfirmPassword from "./form data inputs/InputConfirmPassword"
import { emailValid$, passwordValid$, usernameValid$ } from "../../state/selectors/formDataSelectors"





const registerCheckDisable = (additional: boolean) => {
    const isEmailValid = useRecoilValue(emailValid$)
    const isUsernameValid = useRecoilValue(usernameValid$)
    const isPasswordValid = useRecoilValue(passwordValid$)

    return [additional, [isEmailValid, isUsernameValid, isPasswordValid].includes(false)].includes(true)
}


const RegisterControls = () => {
    const {registerUser, isLoading, errorInfo} = useAuthUser()


    return(<>
        {errorInfo.status && <Alert  severity="error">{errorInfo.message}</Alert>}
        <Button onClick={() => registerUser()} sx={{"&.Mui-disabled": {background: "gray"}}} 
        disabled={registerCheckDisable(isLoading)} 
        variant="contained" size="large">Sign{isLoading && "ing"} up{isLoading && "..."}</Button> 
    </>)

}



const Form = () => {    
    


    

    return(<Stack  spacing={1}>  
        <InputUsername />  
        <InputEmail />     
        <InputPassword />
        <InputConfirmPassword />
        <RegisterControls />
    </Stack>)
}


const RegisterModal = () => {
    const open = useRecoilValue(registerModal$) 
   
    const setModal = useSetRecoilState(registerModal$)
    const setLogin = useSetRecoilState(loginModal$)
    const close = () => setModal(false);
    const switchToLogin = () => {
        close()
        setLogin(true)
    }
    
    return(<ModalWrapper minWidth={"40vw"} overview="Register to enjoy the features" handleClose={close} open={open}>
        <Form />
        <Typography  pt={"1rem"} textAlign={"center"} color={"gray"} variant="subtitle2">Already have an account? <span onClick={() => switchToLogin()}  className="span-form">Login</span></Typography>    

    </ModalWrapper>)

}

export default RegisterModal