import { useRecoilValue, useResetRecoilState, useSetRecoilState } from "recoil"
import { StyledInput } from "../../styled/styled"
import { email$ } from "../../../state/atoms/formData"
import { emailValid$ } from "../../../state/selectors/formDataSelectors";
import { useEffect } from "react";




const InputEmail = () => {
    const setEmail= useSetRecoilState(email$);
    const isValid = useRecoilValue(emailValid$)
    const reset = useResetRecoilState(email$)
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>{
        setEmail(e.target.value)
    }  
    useEffect(() => {
        reset()
    },[])
    return(<StyledInput       
        required  
        //disabled={isLoading}
        label={"email"} 
        id={"email-input"}
        helperText={"Invalid email"}
        onChange={handleChange}
        error={!isValid}              
        variant="outlined"        
    /> )      
}

export default InputEmail