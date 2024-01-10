import { Box, Button, MenuItem, SelectChangeEvent } from "@mui/material"
import usePersonCareer from "../../../hooks/usePersonCareer"
import YearItem from "./YearItem"
import DepartmentBlock from "./DepartmentBlock"
import { SelectProps } from "../../movie release/MRMenu"
import SelectElement from "../../movie release/SelectElement"


interface PlatformProps extends SelectProps {
    isTv: boolean,
    isMovie: boolean,
}

interface DepartmentsProps extends SelectProps {
    departments: string[]
}


const PlatformsSelect = ({onChange,isTv, isMovie}:PlatformProps) => (<SelectElement onChangeFunc={onChange} name="platform">
          <MenuItem value="">All</MenuItem>
        <MenuItem disabled={!isMovie}  value={"movie"}>Movie</MenuItem>
        <MenuItem disabled={!isTv} value={"tv"}>Tv shows</MenuItem>
      </SelectElement>)


const DepartmentSelect = ({onChange,  departments}: DepartmentsProps) => (<SelectElement onChangeFunc={onChange} name="department">
        <MenuItem value="">All</MenuItem>
        {departments.map((dep) => {
            return <MenuItem value={dep}>{dep}</MenuItem>
        })}
</SelectElement>)


const CareerBlock = () => {
    const {displayed ,handlePlatformChange, isLoading,isTv,isMovie,handleDepartmentChange, allDepartments} = usePersonCareer()

    return(<Box>
        {isLoading ? "Loading" 
        : 
        <Box>
            <PlatformsSelect isTv={isTv} isMovie={isMovie} onChange={handlePlatformChange} />
            <DepartmentSelect departments={allDepartments} onChange={handleDepartmentChange}/>
           
            {displayed.map((res) => <DepartmentBlock {...res}/>)}
        </Box>}
    </Box>)
}

export default CareerBlock