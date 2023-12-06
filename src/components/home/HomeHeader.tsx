import TopBar from "../topbar/TopBar"
import { Box} from "@mui/material"
import HeaderMovie from "./header/HeaderMovie"



const HomeHeader = () => {
    

    


    
    
    

    return(<Box sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        px: 2,
        minHeight: "29rem",        
        position: "relative",
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat", 
        animationDelay: "5s",
        animationTimingFunction: "ease-in-out",
        //animation-timing-function: ease-in-out;
        //-webkit-animation-timing-function: ease-in-out;
        isolation: "isolate",
        '&::before': {
            content: '""',
            position: "absolute",
            inset: '0',
            //opacity: ".7",
            zIndex:"2",
            background: "linear-gradient(0deg, rgba(0,0,0, .7) 40%, rgba(0,0,0, .3)) 90%",
        }

        }}>        
       <TopBar />
       <HeaderMovie/>       
    </Box>)
}

export default HomeHeader