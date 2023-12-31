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


const handleYear = (year: number) => {
    const today = new Date();
    let start: string = "";
    let end: string = "";
    if(today.getFullYear() != year) {
        start = moment().startOf("year").set("year", year).format("YYYY-MM-DD")
        end = moment().endOf("year").set("year", year).format("YYYY-MM-DD")
    } else {
        start = moment(today).format("YYYY-MM-DD")
        end = moment().endOf("year").format("YYYY-MM-DD")
    }
    return `&primary_release_date.gte=${start}&primary_release_date.lte=${end}`
}




const useGetUpcoming = () => {
    const [region, setRegion] = useState("")
    const [year, setYear] = useState(new Date().getFullYear())
    const [result,setResult] = useState<UpcomingElemnt[]>([])
    const apiLink = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc${handleBlank(region, "&watch_region=")}${handleYear(year)}`
    const fetch = async () => await fetchFromTmdb(apiLink) as MovieDiscoverResult
    const [isEmpty, setIsEmpty] = useState(true)
    const handleRegionChange = (e: SelectChangeEvent<string>) => {
        setRegion(e.target.value)
    }

    const handleYearChange = (e: SelectChangeEvent<number>) => {
        setYear(e.target.value as number)
    }
    const {data,isLoading,isRefetching, isError, refetch} = useQuery({queryKey: ["upcoming", "upcoming-hook"], queryFn: fetch})
    
    useEffect(() => {
        if(!isLoading) {
            refetch()
        }
    }, [region, year])



    useEffect(() => {
        if(data && !isError) {
            const momentMonths = moment.months()
            const months = [...new Set(data.results.map((el) => moment(el.release_date).format("MMMM")))]
            const res = months.map((el) => {
                const results = data.results.filter((mov) =>moment(mov.release_date).format("MMMM") == el && mov.original_language != "ru").sort((a,b)=>new Date(a.release_date).getTime() - new Date(b.release_date).getTime() ) ;
                
                if(results.length == 0) return

                return {month: el,results}
            }).filter(el => el).sort(function(a, b){
                return momentMonths.indexOf(a?.month!)
                     - momentMonths.indexOf(b?.month!);
            }) as UpcomingElemnt[]
            
            setResult(res)            
        }
    }, [data])

    useEffect(() => {
        if(!isLoading) {
            if(result.length == 0) {
                setIsEmpty(true)
            } else {
                setIsEmpty(false)
            }
        }
    }, [result])

    

    return {handleRegionChange, handleYearChange, isLoading: [isLoading, isRefetching].includes(true), isEmpty, result, isError}
}

export default useGetUpcoming