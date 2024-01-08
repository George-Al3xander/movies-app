import { Box, Stack, Typography } from "@mui/material"
import { DepartmentYearResult } from "../../../types/type"




const YearItem = ({year, results}:DepartmentYearResult) => {


    return(<Stack m="1rem" border="1px solid white" borderRadius={"1rem"}>
        <Typography>{year}</Typography>
        <Typography variant="caption">{results.map((res) =><><br />{res.character ? res.character : res.job}</>)}</Typography>
    </Stack>)
}

export default YearItem