import { useQuery } from "@tanstack/react-query"
import { fetchFromTmdb } from "../utils"
import { useEffect, useState } from "react"
import { RVTool } from "regex-validation-tool"
import { SelectChangeEvent } from "@mui/material"
import { MovieDiscoverResult } from "../types/tmdb"
import { UpcomingElemnt } from "../types/type"
import moment from "moment"


const handleBlank = (str: string, placeholder: string) => {
    const rvt = new RVTool()
    const notBlank = rvt.customRegex(/\S/)
    if(notBlank(str)) {        
        return placeholder + str
    }

    return ""
}




const useGetUpcoming = () => {
    const [region, setRegion] = useState("")
    const [year, setYear] = useState(new Date().getFullYear().toString())
    const [result,setResult] = useState<UpcomingElemnt[]>([])
    const apiLink = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc${handleBlank(region, "&watch_region=")}${handleBlank(year, "&year=")}`
    const fetch = async () => await fetchFromTmdb(apiLink) as MovieDiscoverResult

    const handleRegionChange = (e: SelectChangeEvent<string>) => {
        setRegion(e.target.value)
    }

    const handleYearChange = (e: SelectChangeEvent<string>) => {
        setYear(e.target.value)
    }
    const {data,isLoading, isError, refetch} = useQuery({queryKey: ["upcoming", "upcoming-hook"], queryFn: fetch})
    useEffect(() => {
        if(!isLoading) {
            refetch()
        }
    }, [region, year])



    useEffect(() => {
        if(data && !isError) {
            const months = [...new Set(data.results.map((el) => moment(el.release_date).format("MMMM")))]
            const res = months.map((el) => {

                const results = data.results.filter((mov) =>moment(mov.release_date).format("MMMM") == el)
                return {month: el,results}
            })

            console.log(res)
        }
    }, [data])

    return {handleRegionChange, handleYearChange, isLoading}
}

export default useGetUpcoming