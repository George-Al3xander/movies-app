import { useEffect, useState } from "react"
import { IFormData } from "../types/type"
import { RVTool } from "regex-validation-tool";




const useFormData = () => {
    const [formData,setFormData] = useState<IFormData>({
        username: "",
        email: "",
        password: "",
        confirm_password: "",
    });
    const [initRender,setInitRender] = useState(false);

    const rvt = new RVTool()
    const testUsername = rvt.customRegex(/^(?=(?:[0-9_]*[a-z]){3})[a-z0-9_]{5,}$/);
    const notBlank = rvt.customRegex(/\S/)
    const [usernameValid,setUsernameValid] = useState(true)
    const [emailValid,setEmailValid] = useState(true)
    const [passwordValid,setPasswordValid] = useState(true)
    const [confirmPasswordValid,setConfirmPasswordValid] = useState(true)
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {value, id} = e.target
        setFormData((prev) => ({...prev,[id]:value}))
    }

    useEffect(() => {
        setInitRender(true)
    },[])
    
    useEffect(() => {   
            const {username,email,password,confirm_password} = formData
            setUsernameValid(testUsername(username))
            setEmailValid(rvt.isEmail(email))
            setPasswordValid(rvt.isPasswordMedium(password))
            setConfirmPasswordValid((confirm_password == password && notBlank(confirm_password)))        
    }, [formData])

    // useEffect(() => {
    //     console.log(emailValid)
    // },[emailValid])
    
    

    return {handleChange, usernameValid,emailValid,passwordValid,confirmPasswordValid}
}

export default useFormData