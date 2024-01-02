
import { FC } from "react"

import { Cast } from "../../types/tmdb"

import { Avatar, Box, Stack, Typography } from "@mui/material"
import SliderTemp from "../SliderTemp"

interface Props {
    apiLink: string
}


const Person = ({name,profile_path, character}: Cast) => (<Stack  alignItems={"center"} spacing={2} direction={"row"}>
    <Avatar sx={{ width: 60, height: 60}} alt={name + "'s profile picture"} src={`http://image.tmdb.org/t/p/original${profile_path}`} />
    <Stack direction={"column"} >
       <Typography>{name}</Typography> 
       <Typography sx={{opacity: ".7"}} variant="caption">{character}</Typography> 
    </Stack>
</Stack>)

const SkeletonItem = () => (<Box>Loading...</Box>)


const CastDisplay : FC<Props> = ({apiLink}) => (<span className="cast-display"><SliderTemp spaceBetween={30} apiUrl={`${apiLink}/credits`} title={"Top cast"} LoadingItemCoomp={SkeletonItem} ItemCoomp={Person} /></span>)


export default CastDisplay