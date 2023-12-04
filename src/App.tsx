import { Box, Button, Container, Typography } from "@mui/material"
import { Route, Routes } from "react-router-dom"
import Home from "./components/home/Home"



export const fetchOptions = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`
  }
};


function App() {

  console.log(fetchOptions)

    return (<Box>
      <Routes>
        <Route element={<Home />} path="/"/>
      </Routes>
    </Box>)
}

export default App


