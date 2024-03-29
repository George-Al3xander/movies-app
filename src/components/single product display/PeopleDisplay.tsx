import placeholderMale from "../../assets/default_avatars/avatar_male.jpg"
import placeholderFemale from "../../assets/default_avatars/avatar_female.jpg"


import { FC } from "react"

import { Cast, Crew } from "../../types/tmdb"

import { Avatar,  Stack, Typography } from "@mui/material"
import SliderTemp from "../SliderTemp"
import { StyledSkeleton } from "../styled/styled"
import { tmdbImage } from "../../utils"
import { NavLink } from "react-router-dom"

interface Props {
    apiLink: string,
    title?: string,
    crew?: boolean
}


const Person = ({name,profile_path, character,known_for_department,gender,id}: Cast & Crew) => (<Stack className={"people-display"} key={`person-display-${id}-${name}`}  alignItems={"center"} spacing={2} direction={"row"}>
    {profile_path ?
    <Avatar sx={{ width: 60, height: 60}} alt={name + "'s profile picture"} src={tmdbImage(profile_path,500)} />
    :
    gender == 2 ?
    <Avatar sx={{ width: 60, height: 60}} alt={name + "'s profile picture"} src={placeholderMale} />
    :
    <Avatar sx={{ width: 60, height: 60}} alt={name + "'s profile picture"} src={placeholderFemale} />

    }
    <Stack direction={"column"} >
       <NavLink className={"link-primary"} to={`/person/${id}`}><Typography>{name}</Typography></NavLink>            
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