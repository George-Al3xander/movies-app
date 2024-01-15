import { useRecoilValue, useSetRecoilState } from "recoil"
import { loginModal$, registerModal$ } from "../../state/atoms/data"
import { Box, Button, InputLabelTypeMap, Modal, Stack, TextField, TextFieldClasses, Typography } from "@mui/material"
import ModalWrapper from "../ModalWrapper"
import { StyledInput } from "../styled/styled"
import useFormData from "../../hooks/useFormData"
import { ReactElement, ReactFragment } from "react"


interface InputObj  {
    name: string,
    helperText?: string | ReactElement<any, any>,
    type?: React.InputHTMLAttributes<unknown>['type'];
}



const Form = () => {
    const {handleChange, usernameValid,passwordValid,emailValid,confirmPasswordValid} = useFormData()

    const valid = {
        username: usernameValid,
        email: emailValid,
        password: passwordValid,
        confirm_password: confirmPasswordValid
    }

    

    const inputs: InputObj[] = [        
        {
            name: "email",            
        },
        {
            name: "password",
            helperText: "Need some password regex",
            type: "password"            
        },        
    ]

    return(<Stack  spacing={1}>           
        {inputs.map(({name,helperText, ...props}) => {     
            const isError = !valid[name.replace(" ", "_") as "password"]       
            return <StyledInput       
                required  
                label={name} 
                id={name.replace(" ", "_")}
                helperText={isError ? helperText ? helperText : `Ivalid ${name}` : " "}
                onChange={handleChange}
                error={isError}              
                variant="outlined" 
                {...props}
            />   
        })}
        <Button onClick={() => console.log(12)} sx={{"&.Mui-disabled": {background: "gray"}}} disabled={[emailValid,passwordValid].includes(false)} variant="contained" size="large">Login</Button>     
    </Stack>)
}


const LoginModal = () => {
    const open = useRecoilValue(loginModal$)
    const setModal = useSetRecoilState(loginModal$)
    const setRegisterModal = useSetRecoilState(registerModal$)
    const close = () => setModal(false);
    const switchToRegister = () => {
        close();
        setRegisterModal(true)

    }
    return(<ModalWrapper minWidth={"40vw"} minHeight={"50vh"} overview="Login to your account" handleClose={close} open={open}>
        <Form />
        <Typography  pt={"1rem"} textAlign={"center"} color={"gray"} variant="subtitle2">Dont't  have an account? <span onClick={() => switchToRegister()}  className="span-form">Sign up</span></Typography>    

    </ModalWrapper>)

}

export default LoginModal