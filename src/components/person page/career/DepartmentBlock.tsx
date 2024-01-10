import { Stack, Typography } from "@mui/material"
import { DepartmentResult } from "../../../types/type"
import YearItem from "./YearItem"




const DepartmentBlock = ({department, results}: DepartmentResult) => {

    return(<Stack my="1rem">
        <Typography my="1rem" variant="h5">{department}</Typography>
        <Stack borderRadius={".5rem"} overflow={"hidden"} border={"1px solid gray"} >{results.map((res) => <YearItem {...res}/>)}</Stack>
    </Stack>)
}

export default DepartmentBlock