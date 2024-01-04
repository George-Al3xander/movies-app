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



const Test = () => {
    const {id,seasonNumber} = useParams()    
    //Works for the review page pagination
    // const [searchParams, setSearchParams] = useSearchParams();
    // console.log(searchParams.get("page"))
 return <div>
    {seasonNumber!}
 </div>
}


function App() {


    const {isLoading} = useFetchGenre()
    if(isLoading) return <Stack justifyContent={"center"} alignItems={"center"} width={"100vw"} height={"80vh"}>
        <PropagateLoader color="var(--clr-primary)"/>
    </Stack>

    
    return (<Box>      
      <TrailerWindow />
      <TopBar />        
          <Routes>
              <Route element={<Home />} path="/"/>
              <Route element={<MovieRelease />} path="/upcoming"/>
              <Route element={<SingleProductDisplay />} path="/movie/:id"/>
              <Route element={<SingleProductDisplay />}  path="/tv/:id" />
              <Route element={<SingleProductDisplay />} path="/movie/:id/reviews"/>
              <Route element={<SingleProductDisplay />}  path="/tv/:id/reviews" />
              <Route element={<Test />} path="/tv/:id/seasons/:seasonNumber" />
              <Route element={<Err404 />} path="*"/>
          </Routes>   
      <Footer />   
    </Box>)
}

export default App


