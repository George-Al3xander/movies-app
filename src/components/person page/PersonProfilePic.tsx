import { Box } from "@mui/material";
import { PersonDetails } from "../../types/tmdb";
import { tmdbImage } from "../../utils";
import placeholderMale from "../../assets/default_avatars/avatar_male.jpg"
import placeholderFemale from "../../assets/default_avatars/avatar_female.jpg"


const PersonProfilePic = ({profile_path,gender, name}: PersonDetails) => (<Box mx={"auto"} borderRadius={"1rem"} overflow="hidden" 
maxHeight={{xs: "300px", sm: "600px"}} 
maxWidth={{xs: "300px", sm: "400px"
}}>
<img style={{objectFit: "cover"}}
 src={profile_path ?
    tmdbImage(profile_path)
    :
    gender == 2 ?
        placeholderMale
        :
        placeholderFemale
} alt={name + "'s picture"} />
</Box>)

export default PersonProfilePic