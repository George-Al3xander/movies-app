import {Box} from "@mui/material"
import { Route, Routes } from "react-router-dom"
import Home from "./components/home/Home"
import TrailerWindow from "./components/TrailerWindow";
import "./styles/scss/index.scss"
import Footer from "./components/Footer";
import TopBar from "./components/topbar/TopBar";
import MovieRelease from "./components/movie release/MovieRelease";
import SingleProductDisplay from "./components/single product display/SingleProductDisplay";






function App() {


    return (<Box>      
      <TrailerWindow />
      <TopBar />        
          <Routes>
              <Route element={<Home />} path="/"/>
              {/* <Route element={<MovieRelease />} path="/upcoming"/> */}
              <Route element={<SingleProductDisplay />} path="/movie/:id"/>
              <Route element={<SingleProductDisplay />} path="/tv/:id"/>
          </Routes>   
      <Footer />   
    </Box>)
}

export default App


