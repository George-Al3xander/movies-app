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
            name: "username", 
            helperText: <>Username must be at least 5-characters long (no less than 3 characters of that length must be letters), <br></br> no spaces, and may consist only of a-z, 0–9, and underscores.</>          
        },
        {
            name: "email",            
        },
        {
            name: "password",
            helperText: "Need some password regex",
            type: "password"            
        },
        {
            name: "confirm password",
            helperText: "Passwords do not match",
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
                error={!valid[name.replace(" ", "_") as "password"]}              
                variant="outlined" 
                {...props}
            />   
        })}
        <Button onClick={() => console.log(12)} sx={{"&.Mui-disabled": {background: "gray"}}} disabled={[usernameValid,emailValid,passwordValid,confirmPasswordValid].includes(false)} variant="contained" size="large">Sign up</Button> 
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