import { Stack, Typography } from "@mui/material"
import { DepartmentResult } from "../../../types/type"
import YearItem from "./YearItem"




const DepartmentBlock = ({department, results}: DepartmentResult) => {

    return(<Stack>
        <Typography  borderBottom={"1px solid white"} variant="subtitle1">{department}</Typography>
        <Stack>{results.map((res) => <YearItem {...res}/>)}</Stack>
    </Stack>)
}

export default DepartmentBlock