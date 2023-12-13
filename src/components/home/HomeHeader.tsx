import TopBar from "../topbar/TopBar"
import HeaderMovie from "./header/HeaderMovie"
import { HomeHeaderBox } from "../styled/styled"



const HomeHeader = () => {
    

    return(<HomeHeaderBox>
        <TopBar />
       <HeaderMovie/>  
    </HomeHeaderBox>)
}

export default HomeHeader