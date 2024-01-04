import placeholderMale from "../../assets/default_avatars/avatar_male.jpg"
import placeholderFemale from "../../assets/default_avatars/avatar_female.jpg"


import { FC } from "react"

import { Cast, Crew } from "../../types/tmdb"

import { Avatar, Box, Stack, Typography } from "@mui/material"
import SliderTemp from "../SliderTemp"
import { StyledSkeleton } from "../styled/styled"

interface Props {
    apiLink: string,
    title?: string,
    crew?: boolean
}


const Person = ({name,profile_path, character,known_for_department,gender,id}: Cast & Crew) => (<Stack key={`person-display-${id}-${name}`}  alignItems={"center"} spacing={2} direction={"row"}>
    {profile_path ?
    <Avatar sx={{ width: 60, height: 60}} alt={name + "'s profile picture"} src={`http://image.tmdb.org/t/p/original${profile_path}`} />
    :
    gender == 2 ?
    <Avatar sx={{ width: 60, height: 60}} alt={name + "'s profile picture"} src={placeholderMale} />
    :
    <Avatar sx={{ width: 60, height: 60}} alt={name + "'s profile picture"} src={placeholderFemale} />

    }
    <Stack direction={"column"} >
       <Typography>{name}</Typography>            
       <Typography sx={{opacity: ".7"}} variant="caption">{character ? character : known_for_department}</Typography> 
    </Stack>
</Stack>)

const SkeletonItem = () => (<Stack alignItems={"center"} spacing={2} direction={"row"}>
    <StyledSkeleton variant="circular" width={60} height={60}/>
    <Stack direction={"column"} >
       <StyledSkeleton variant="text" width={"6rem"}/>
       <StyledSkeleton variant="text" width={"5rem"}/>
    </Stack>
</Stack>)


const PeopleDisplay : FC<Props> = ({apiLink, title, crew}) => (<span className="person-display"><SliderTemp customKey={crew ? "crew" : undefined} spaceBetween={30} apiUrl={apiLink} title={title} LoadingItemCoomp={SkeletonItem} ItemCoomp={Person} /></span>)


export default PeopleDisplay