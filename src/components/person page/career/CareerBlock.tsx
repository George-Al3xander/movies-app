import { Box, Button, MenuItem } from "@mui/material"
import usePersonCareer from "../../../hooks/usePersonCareer"
import YearItem from "./YearItem"
import DepartmentBlock from "./DepartmentBlock"
import { SelectProps } from "../../movie release/MRMenu"
import SelectElement from "../../movie release/SelectElement"


interface PlatformProps extends SelectProps {
    isTv: boolean,
    isMovie: boolean,
}


const PlatformsSelect = ({onChange,isTv, isMovie}:PlatformProps) => {
    return(<SelectElement onChangeFunc={onChange} name="platform">
          <MenuItem value="">
            <em>All</em>
        </MenuItem>
        <MenuItem disabled={!isMovie}  value={"movie"}>Movie</MenuItem>
        <MenuItem disabled={!isTv} value={"tv"}>Tv shows</MenuItem>
      </SelectElement>)
}


const CareerBlock = () => {
    const {displayed ,setCurrentPlatform, isLoading,isTv,isMovie,setCurrentDepartment, allDepartments} = usePersonCareer()

    return(<Box>
        {isLoading ? "Loading" 
        : 
        <Box>
            <PlatformsSelect isTv={isTv} isMovie={isMovie} onChange={setCurrentPlatform} />
            {/* <Button onClick={() => setCurrentDepartment(allDepartments[2])}>CLick</Button> */}
            {displayed.map((res) => <DepartmentBlock {...res}/>)}
        </Box>}
    </Box>)
}

export default CareerBlock