import { Box, Button, Container, Typography } from "@mui/material"
import { Route, Routes } from "react-router-dom"
import Home from "./components/home/Home"
import TrailerWindow from "./components/TrailerWindow";
import { modalStatus$ } from "./components/state/selectors/selectors";
import { useRecoilValue } from "recoil";
import "./styles/scss/index.scss"


export const fetchOptions = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`
  }
};




function App() {


    return (<Box>
      
       <TrailerWindow />
      
      
      <Routes>
        <Route element={<Home />} path="/"/>
      </Routes>      
    </Box>)
}

export default App


