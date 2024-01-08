import { Stack, Typography } from "@mui/material";
import { PersonDetails } from "../../types/tmdb";
import PersonalInfo from "./PersonalInfo";
import PersonProfilePic from "./PersonProfilePic";



const PersonSideBlock = (props: PersonDetails) => {
    const {id,name} = props

    return(<Stack  sx={{background: "black", p:2, borderRadius: "1rem"}} spacing={3} key={"person-side-block-"+id}>
        <PersonProfilePic {...props}/>
        <Typography textAlign={"center"} display={{sm: "none"}} variant="h4">{name}</Typography>
        <PersonalInfo {...props}/>
    </Stack>)
}

export default PersonSideBlock

//` (${Math.abs(moment(props.birthday).diff(moment(props.deathday && props.deathday), 'years'))} years old)`  
