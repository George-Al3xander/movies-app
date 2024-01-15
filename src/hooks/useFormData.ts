import { useEffect, useState } from "react"
import { IFormData } from "../types/type"
import { RVTool } from "regex-validation-tool";





//Check if firebase has email in use
// QuerySnapshot query = await FirebaseFirestore.instance.collection('users').where('email',isEqualTo:email).get();
// if (query.docs.length==0){
//    //Go to the sign up screen
// }
// else {
//    //Go to the login screen
// }

const useFormData = () => {
    const [formData,setFormData] = useState<IFormData>({
        username: "",
        email: "",
        password: "",
        confirm_password: "",
    });
    

    const rvt = new RVTool()
    const testUsername = rvt.customRegex(/^(?=(?:[0-9_]*[a-z]){3})[a-z0-9_]{5,}$/);
    const notBlank = rvt.customRegex(/\S/)
    const [usernameValid,setUsernameValid] = useState(true)
    const [emailValid,setEmailValid] = useState(true)
    const [passwordValid,setPasswordValid] = useState(true)
    const [confirmPasswordValid,setConfirmPasswordValid] = useState(true)

    const [username,setUsername] = useState("")
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [confirmPassword,setConfirmPassword] = useState("")
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {value, id} = e.target
        setFormData((prev) => ({...prev,[id]:value}))
    }

   
    
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
    
    

    return {handleChange, usernameValid,emailValid,passwordValid,confirmPasswordValid,formData}
}

export default useFormData