import { addDoc, doc, getDocs, query, setDoc, where } from "firebase/firestore";
import { auth, db, usersCollectionRef } from "../firebase-config";
import { CustomUser, IFormData } from "../types/type"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { useCookies } from "react-cookie";



const useAuthUser = (formData : IFormData) => {
    const {email,username,password} = formData
    const [cookies, setCookie] = useCookies(['user']);

    const userSignUp = async () => {        
        const emailUsers = await getDocs(query(usersCollectionRef, where("email", "==", email)));      
        const usernameUsers = await getDocs(query(usersCollectionRef, where("username", "==", username)));      
        if(emailUsers.docs.length > 0 || usernameUsers.docs.length > 0) {
            throw new Error(`${emailUsers.docs.length > 0 ? "Email" : "Username"} is already in use`)
        } else {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password)
            const user = userCredential.user;
            const newUser : CustomUser = {email,username,auth_id: user.uid}
            await addDoc(usersCollectionRef,  newUser)            
        }
        //const users = snapshots.docs.map((doc) => ({...doc.data(), id: doc.id})); 
    }

    const userLogin =  () => {
        signInWithEmailAndPassword(auth,email,password).then(async (user) => {
            const dbUser =  await getDocs(query(usersCollectionRef, where("email", "==", email)));
        })
    }

    

    return
}