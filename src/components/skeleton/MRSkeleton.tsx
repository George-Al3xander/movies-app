import { Box, Stack} from "@mui/material"
import { StyledSkeleton } from "../styled/styled"




const MRSkeleton = () => {
    const arr = [
        {results: [0,1,2,3,4,5]},
        {results: [0,1,2,3,4,5]},
        {results: [0,1,2,3,4,5]},
    ]


    return(<Stack spacing={4}>
        {arr.map((item) => {
            return <Box  key={`mr-${item}`}>
            <Box sx={{py: 2, borderBottom: ".5px solid silver"}}>
                <StyledSkeleton variant="text" width={"15rem"} height={"3rem"}/>
            </Box>
            <Box sx={{py: 2,display: "grid", gridTemplateColumns: {xs: 'repeat(1, 1fr)',sm:'repeat(2, 1fr)'}, gap: 4}}>
                {item.results.map(() => {                
                    return <Stack direction={"row"} spacing={2}>
                        <StyledSkeleton variant="circular" width={50} height={50} />
                        <StyledSkeleton variant="rounded" width={"6rem"} height={"8rem"} />
                    </Stack>
                })}
            </Box>
            </Box>
        })}
    </Stack>)
}

export default MRSkeleton