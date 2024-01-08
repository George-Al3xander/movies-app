import { Box } from "@mui/material"
import usePersonCareer from "../../../hooks/usePersonCareer"
import YearItem from "./YearItem"
import DepartmentBlock from "./DepartmentBlock"




const CareerBlock = () => {
    const {result, isLoading} = usePersonCareer()

    return(<Box>
        {isLoading ? "Loading" : result.map((res) => <DepartmentBlock {...res}/>)}
    </Box>)
}

export default CareerBlock