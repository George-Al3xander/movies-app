import { PersonDetails } from "../../types/tmdb";
import {  Stack, Typography } from "@mui/material";
import moment, { MomentInput } from "moment";
import ReviewParagraph from "../single product display/review/ReviewParagraph";



const PersonalInfo = (props: PersonDetails) => {
    const personalInfoKeys = ["known_for_department", "gender", "birthday","deathday","place_of_birth","biography"]


    return(<Stack spacing={2}>
        <Typography variant="h3">Personal info</Typography>
        {personalInfoKeys.map((key) => {                 
            if(key == "deathday" && !props.deathday) return null
            return <Stack  display={key == "biography" ? {sm:"none"}: {}} spacing={"3px"}>
                <Typography textTransform={"capitalize"} variant="h5">{key.split('_').join(' ')}</Typography>
                {key == "biography" ?
                <ReviewParagraph content={props.biography}/>
                :
                <Typography sx={{opacity: ".7"}} fontSize={18} variant="subtitle1">                        
                    {key.includes("day") ? 
                        (`${moment(props[key as keyof PersonDetails] as MomentInput).format("LL")} ${key == "deathday" && props.deathday ?
                            " ("+(Math.abs(moment(props.birthday).diff(moment(props.deathday), 'years')) + "years old)")
                            :
                            key == "birthday" && !props.deathday ?
                            " ("+(Math.abs(moment(props.birthday).diff(moment(), 'years')) + "years old)")
                            :
                            ""
                        }`)
                    :
                    key == "gender" ?
                        props[key as keyof PersonDetails] == 2 ?
                        "Male"
                        :
                        "Female"
                    :
                    props[key as keyof PersonDetails]
                    }                        
                </Typography>
                }
            </Stack>
        })}
    </Stack>)
}

export default PersonalInfo