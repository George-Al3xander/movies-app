import { selector, selectorFamily } from "recoil";
import { RVTool } from "regex-validation-tool";
import { email$, password$, username$ } from "../atoms/formData";
const rvt = new RVTool()
const checkUsername = rvt.customRegex(/^(?=(?:[0-9_]*[a-z]){3})[a-z0-9_]{5,}$/);



export const emailValid$ = selector({
    key: "IsEmailValid",
    get: ({get}) => {
        const email = get(email$)        
        return rvt.isEmail(email)
    }
}) 

export const usernameValid$ = selector({
    key: "IsUsernameValid",
    get: ({get}) => {
        const username = get(username$)
        return checkUsername(username)
    }
}) 

export const passwordValid$ = selector({
    key: "IsPasswordValid",
    get: ({get}) => {
        const password = get(password$)
        return rvt.isPasswordMedium(password)
    }
}) 


export const confirmPasswordValid$ = selectorFamily({
    key: "ConfirmPasswordCheck",
    get: ((confirmPassword:string) => ({get}) => {
        const password = get(password$)

        return confirmPassword === password
    })
})