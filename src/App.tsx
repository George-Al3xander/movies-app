import {Box, Stack} from "@mui/material"
import { Route, Routes, useParams, useSearchParams } from "react-router-dom"
import Home from "./components/home/Home"
import TrailerWindow from "./components/TrailerWindow";
import "./styles/scss/index.scss"
import Footer from "./components/Footer";
import TopBar from "./components/topbar/TopBar";
import MovieRelease from "./components/movie release/MovieRelease";
import SingleProductDisplay from "./components/single product display/SingleProductDisplay";
import Err404 from "./components/Err404";
import useFetchGenre from "./hooks/useFetchGenres";
import { PropagateLoader } from "react-spinners";
import SeasonPage from "./components/season page/SeasonPage";
import ReviewsPage from "./components/reviews page/ReviewsPage";
import PersonPage from "./components/person page/PersonPage";
import RegisterModal from "./components/auth/RegisterModal";





function App() {


    const {isLoading} = useFetchGenre()
    if(isLoading) return <Stack justifyContent={"center"} alignItems={"center"} width={"100vw"} height={"80vh"}>
        <PropagateLoader color="var(--clr-primary)"/>
    </Stack>


    return (<Box>      
      <TrailerWindow />
      <RegisterModal />
      <TopBar />        
          <Routes>
              <Route element={<Home />} path="/"/>
              <Route element={<MovieRelease />} path="/upcoming"/>
              <Route element={<SingleProductDisplay />} path="/movie/:id"/>
              <Route element={<SingleProductDisplay />}  path="/tv/:id" />
              <Route element={<ReviewsPage />} path="/movie/:id/reviews"/>
              <Route element={<ReviewsPage />}  path="/tv/:id/reviews" />
              <Route element={<SeasonPage />} path="/tv/:id/season/:seasonNumber" />
              <Route element={<PersonPage />} path="/person/:id"/>
              <Route element={<Err404 />} path="*"/>
          </Routes>   
      <Footer />   
    </Box>)
}

export default App


