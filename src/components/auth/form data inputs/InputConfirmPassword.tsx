import { useRecoilValue} from "recoil"
import { StyledInput } from "../../styled/styled"
import { useState } from "react";
import { confirmPasswordValid$ } from "../../../state/selectors/formDataSelectors";




const InputConfirmPassword = () => {    
    const [confirmPassword, setConfirmPassword] = useState("")
    const isValid = useRecoilValue(confirmPasswordValid$(confirmPassword))
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>{
        setConfirmPassword(e.target.value)
    }  
    
    return(<StyledInput       
        required  
        //disabled={isLoading}
        label={"confirm password"} 
        id={"password-input"}
        helperText={"Passwords do not match"}
        onChange={handleChange}
        error={!isValid}              
        variant="outlined"        
    /> )      
}

export default InputConfirmPassword