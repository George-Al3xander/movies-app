import { atom } from "recoil";



export const email$ = atom({
    key: "email_input",
    default: ""
})

export const username$ = atom({
    key: "username_input",
    default: ""
})

export const password$ = atom({
    key: "password_input",
    default: ""
})

