import { Box, Button, MenuItem, SelectChangeEvent, Stack } from "@mui/material"



import { SelectProps } from "../../movie release/MRMenu"
import SelectElement from "../../movie release/SelectElement"
import { usePersonCareerResult } from "../../../hooks/usePersonCareer"


interface PlatformProps extends SelectProps {
    isTv: boolean,
    isMovie: boolean,
}

interface DepartmentsProps extends SelectProps {
    departments: string[]
}


const PlatformsSelect = ({onChange,isTv, isMovie}:PlatformProps) => 
    (<SelectElement label onChangeFunc={onChange} name="Media Type">
        <MenuItem selected value="">All</MenuItem>
        <MenuItem disabled={!isMovie}  value={"movie"}>Movies</MenuItem>
        <MenuItem disabled={!isTv} value={"tv"}>TV Shows</MenuItem>
    </SelectElement>)


const DepartmentSelect = ({onChange,  departments}: DepartmentsProps) => 
    (<SelectElement label onChangeFunc={onChange} name="department">
        <MenuItem  value="">All</MenuItem>
        {departments.map((dep) => {
            return <MenuItem value={dep}>{dep}</MenuItem>
        })}
    </SelectElement>)


const CareerSelectMenu = ({isMovie,isTv,handleDepartmentChange,handlePlatformChange,allDepartments}:usePersonCareerResult) => 
    (<Stack direction={{xs: "column",sm:"row"}} spacing={2}>
        <PlatformsSelect isTv={isTv} isMovie={isMovie} onChange={handlePlatformChange} />
        <DepartmentSelect departments={allDepartments} onChange={handleDepartmentChange}/>
    </Stack>)


export default CareerSelectMenu