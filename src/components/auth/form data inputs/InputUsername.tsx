import { useRecoilValue, useResetRecoilState, useSetRecoilState } from "recoil"
import { StyledInput } from "../../styled/styled"
import { username$ } from "../../../state/atoms/formData"
import { usernameValid$ } from "../../../state/selectors/formDataSelectors";
import { useEffect } from "react";




const InputUsername = () => {
    const setUsername= useSetRecoilState(username$);
    const isValid = useRecoilValue(usernameValid$)
    const reset = useResetRecoilState(username$)
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>{
        setUsername(e.target.value)
    }  
    useEffect(() => {
        reset()
    },[])
    return(<StyledInput       
        required  
        //disabled={isLoading}
        label={"username"} 
        id={"username-input"}
        helperText={<>Username must be at least 5-characters long (no less than 3 characters of that length must be letters), <br></br> no spaces, and may consist only of a-z, 0–9, and underscores.</>}
        onChange={handleChange}
        error={!isValid}              
        variant="outlined"        
    /> )      
}

export default InputUsername