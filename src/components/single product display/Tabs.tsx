import { FC } from "react";
import { Credits, MovieDetails, TvShowDetails } from "../../types/tmdb";
import SeasonsDisplay from "./SeasonsDisplay"
import ReviewsDisplay from "./review/ReviewsDisplay"
import { TabProp } from "../../types/type"
import SDPTabs from "./SDPTabs"
import PeopleDisplay from "./PeopleDisplay";
import BackdropSlider from "../horizontal/backdrop/BackdropSlider";

interface Props {
    apiLink: string,
    data: MovieDetails &  TvShowDetails & {credits:Credits},
}

const Tabs: FC<Props> = ({apiLink,data}) => {

    const tabs : TabProp[] = [
       ( data!.name && data!.seasons!.length > 0 ?
        {   
            title: "Seasons",
            Element: SeasonsDisplay,
            props: {
                seasons: data.seasons
            }
        }
        :
        {   
            title: "if you loved the cast",
            Element: BackdropSlider,
            props: {
                apiUrl: `https://api.themoviedb.org/3/discover/${data?.title ? "movie" : "tv"}?with_cast=${data!.credits.cast.slice(0,8).map((person) => person.id).toString().split(',').join('|')}`
            }
        }),
        {   
            title: "Crew",
            Element: PeopleDisplay,
            props: {
                apiLink: `${apiLink}/credits`,
                crew: true
            }
        },
        {   
            title: "Reviews",
            Element: ReviewsDisplay,
            props: {
                apiLink: apiLink              
            }
        },
        
    ]
    
    return(<SDPTabs tabs={tabs} />)
}

export default Tabs