import { Box, Typography} from "@mui/material"
import usePersonCareer from "../../../hooks/usePersonCareer"
import DepartmentBlock from "./DepartmentBlock"

import CareerSelectMenu from "./CareerSelectMenu"




const CareerBlock = () => {
    const career = usePersonCareer()
    const {displayed, isLoading} = career
    return(<Box className="career-block">
        {isLoading ? "Loading" 
        : 
        <Box>
            <Box sx={{flexDirection:{xs:"column", sm:"row"},display: "flex", alignContent: {sm:"center"}, justifyContent: "space-between", flexWrap: "wrap", gap: "1rem"}}>
                <Typography  variant="h4">Career</Typography>
                <CareerSelectMenu {...career}/>  
            </Box>
            {displayed.map((res) => <DepartmentBlock {...res}/>)}
        </Box>}
    </Box>)
}

export default CareerBlock