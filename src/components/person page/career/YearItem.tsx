import { Box, Stack, Typography } from "@mui/material"
import { DepartmentYearResult } from "../../../types/type"
import JobItem from "./JobItem"




const YearItem = ({year, results}:DepartmentYearResult) => {


    return(<Stack px="1rem" borderBottom="1px solid gray" >        
        {results.map((res) => <JobItem year={year} {...res}/>)}
    </Stack>)
}

export default YearItem