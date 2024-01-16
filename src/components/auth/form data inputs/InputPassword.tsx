import { useRecoilValue, useResetRecoilState, useSetRecoilState } from "recoil"
import { StyledInput } from "../../styled/styled"
import { password$ } from "../../../state/atoms/formData"
import { passwordValid$ } from "../../../state/selectors/formDataSelectors";
import { useEffect } from "react";




const InputPassword = () => {
    const setPassword= useSetRecoilState(password$);
    const isValid = useRecoilValue(passwordValid$)
    const reset = useResetRecoilState(password$)
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>{
        setPassword(e.target.value)
    }  
    useEffect(() => {
        reset()
    },[])
    return(<StyledInput       
        required  
        //disabled={isLoading}
        label={"password"} 
        id={"password-input"}
        helperText={"Invalid password"}
        onChange={handleChange}
        error={!isValid}              
        variant="outlined"        
    /> )      
}

export default InputPassword