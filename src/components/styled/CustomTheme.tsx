import { FC, ReactNode } from "react"
import { ThemeProvider } from "@emotion/react"
import {createTheme } from "@mui/material"

const theme = createTheme({
    palette: {
        primary: {
            main: "#00925D"
        },
        info: {
            main: "#FFFFFF"
        }
    },
    shape: {
        borderRadius: 10
    },
    typography: {
        fontFamily: "'Kanit', sans-serif"
    }
})

const CustomTheme  = ({children}: {children: ReactNode}) => {


    return(<ThemeProvider theme={theme}>{children}</ThemeProvider>)
}


export default CustomTheme