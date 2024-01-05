import { FC } from "react"
import { Episode } from "../../types/tmdb"
import { TabProp } from "../../types/type"
import PeopleDisplay from "../single product display/PeopleDisplay"
import SDPTabs from "../single product display/SDPTabs"
import EpisodesDisplay from "./EpisodesDIsplay"

interface Prop  {
    apiLink: string,
    episodes: Episode[]
}


const SeasonTabs : FC<Prop> = ({apiLink, episodes}) => {
    const tabs :TabProp[] = [
        {
            title: "Episodes",
            Element: EpisodesDisplay,
            props: {
                episodes: episodes       
            }        
        },
        {   
            title: "Crew",
            Element: PeopleDisplay,
            props: {
                apiLink: `${apiLink}/credits`,
                crew: true
            }
        },
    ] 

    return(<SDPTabs tabs={tabs}/>)
}

export default SeasonTabs