import { useRecoilValue, useSetRecoilState } from "recoil"
import { registerModal$ } from "../../state/atoms/data"
import { Box, Button, InputLabelTypeMap, Modal, Stack, TextField, TextFieldClasses } from "@mui/material"
import ModalWrapper from "../ModalWrapper"
import { StyledInput } from "../styled/styled"
import useFormData from "../../hooks/useFormData"
import { ReactElement, ReactFragment } from "react"


interface InputObj  {
    name: string,
    helperText?: string | ReactElement<any, any>,
    type?: React.InputHTMLAttributes<unknown>['type'];
}


const RegisterModal = () => {
    const open = useRecoilValue(registerModal$)
    const setModal = useSetRecoilState(registerModal$)
    const close = () => setModal(false);
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


    return(<ModalWrapper minWidth={"40vw"} overview="Register to enjoy the features" handleClose={close} open>
        <Stack  spacing={1}>           
            {inputs.map(({name,helperText, ...props}) => {            
                return <StyledInput       
                    onChange={handleChange}
                    required       
                    error={!valid[name.replace(" ", "_") as "password"]}              
                    id={name.replace(" ", "_")}
                    label={name} 
                    helperText={helperText ? helperText : `Ivalid ${name}`}
                    variant="outlined" 
                    {...props}
                />   
            })}
            <Button sx={{"&.Mui-disabled": {background: "gray"}}} disabled={[usernameValid,emailValid,passwordValid,confirmPasswordValid].includes(false)} variant="contained" size="large">Sign up</Button>     
        </Stack>
    </ModalWrapper>)

}

export default RegisterModal