import { addDoc, doc, getDocs, query, setDoc, where } from "firebase/firestore";
import { auth, db, usersCollectionRef } from "../firebase-config";
import { CustomUser, IFormData } from "../types/type"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { useCookies } from "react-cookie";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import { email$, password$, username$ } from "../state/atoms/formData";



const useAuthUser = () => {    
    const [cookies, setCookie] = useCookies(['user']);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [errMsg, setErrMsg] = useState("")
    const registerUser = async () => {     
        const email = useRecoilValue(email$)
        const username = useRecoilValue(username$)
        const password = useRecoilValue(password$)  
        setIsLoading(true)  
        setIsSuccess(false)
        try {
            const emailUsers = await getDocs(query(usersCollectionRef, where("email", "==", email)));      
            const usernameUsers = await getDocs(query(usersCollectionRef, where("username", "==", username)));      
            if(emailUsers.docs.length > 0 || usernameUsers.docs.length > 0) {    
                throw new Error(`${emailUsers.docs.length > 0 ? "Email" : "Username"} is already in use`)
            } else {                
               // const userCredential = await createUserWithEmailAndPassword(auth, email, password)
                //const user = userCredential.user;
                //const newUser : CustomUser = {email,username,auth_id: user.uid}
                //await addDoc(usersCollectionRef,  newUser)            
            }
            setIsError(false)
            setIsSuccess(true)
        } catch (err) {
            const error = err as string | {message: string}
            setIsError(true)   
            setErrMsg(typeof error == "string" ? error : error.message ? error.message : "Error")         
        }       
        setIsLoading(false)
    }

    const userLogin =  () => {
        const email = useRecoilValue(email$)       
        const password = useRecoilValue(password$)
        
        signInWithEmailAndPassword(auth,email,password).then(async (user) => {
            const dbUser =  await getDocs(query(usersCollectionRef, where("email", "==", email)));
        })
    }


    return {registerUser, isLoading,isError, errorInfo: {
        status: isError,
        message: errMsg
    }}
}

export default useAuthUser