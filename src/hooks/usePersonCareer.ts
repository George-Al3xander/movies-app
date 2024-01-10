import { useQuery } from "@tanstack/react-query";
import { fetchFromTmdb } from "../utils";
import useApiLink from "./useApiLink"
import { PersonCombinedCredits, PersonMovieCast, PersonMovieCredit, PersonMovieCrew, PersonTvShowCast, PersonTvShowCredit, PersonTvShowCrew } from "../types/tmdb";
import { useEffect, useState } from "react";
import { DepartmentResult } from "../types/type";
import { RVTool } from "regex-validation-tool";
import { SelectChangeEvent } from "@mui/material";

//81532 - no tv show person


const usePersonCareer = () => {
    const {id,apiLink} = useApiLink();
    const [currentPlatform, setCurrentPlatform] = useState("")
    const [currentDepartment, setCurrentDepartment] = useState("")
    const [allDepartments,setAllDepartments] = useState<string[]>([])
    const [isMovie, setIsMovie] = useState(false);
    const [isTv, setIsTv] = useState(false);
    const rvt = new RVTool()
    const notBlank = rvt.customRegex(/\S/)
    const [result,setResult] = useState<DepartmentResult[]>([]);
    const [displayed,setDisplayed] = useState<DepartmentResult[]>([]);
    const [resultTv,setTvResult] = useState<PersonTvShowCredit>({cast: [], crew: [],id:0}) 
    const [resultMovie,setMovieResult] = useState<PersonMovieCredit>({cast: [], crew: [],id:0})
    const fetch = async () => {
        const tvCredits = await fetchFromTmdb(apiLink+"/tv_credits") as PersonTvShowCredit
        const movieCredits = await fetchFromTmdb(apiLink+"/movie_credits") as PersonMovieCredit
        
        return {tv: tvCredits, movie:movieCredits}
    }
    const {data,isLoading,isError} = useQuery({queryKey: ["person-career",  apiLink,id], queryFn: fetch})


    const sortByDepartment = () => {       
        if(notBlank(currentDepartment) && result.length > 0) {
            const filtered = sortByCurrentDepartment(result)
           setDisplayed(filtered)
        } else {
            setDisplayed(result)
        }
    }

    const sortByCurrentDepartment = (arr: DepartmentResult[]) => {
        return arr.filter(({department}) => department ? department.toLowerCase() == currentDepartment.toLowerCase() : false)
    }

    const handleDepartmentChange = (e: SelectChangeEvent<string>) => setCurrentDepartment(e.target.value)
    const handlePlatformChange = (e: SelectChangeEvent<string>) => setCurrentPlatform(e.target.value)

    const sortByCurrentPlatform = (arr: DepartmentResult[]) => {
        return arr.map(({department,results}) => {
            const filtered = results.map((res) => {
                const resFiltered = res.results.filter((job) => currentPlatform == "tv" ? job.episode_count : job.release_date)
                return {...res, results: resFiltered}
            }).filter((res) => res.results.length > 0)
            return {department,results: filtered}
        }).filter((res) => res.results.length > 0);
    }

    
    useEffect(() =>{
        if(!isLoading && !isError && data != undefined) {
            setMovieResult(data.movie)
            setTvResult(data.tv)
        }
    },[data])
    //crew.job 
    useEffect(() => {
        setIsTv(resultTv.cast.length > 0 || resultTv.crew.length > 0)
        setIsMovie(resultMovie.cast.length > 0 || resultMovie.crew.length > 0)
        let allDepartmentsTemp : string[] = [];
        let tempResult : DepartmentResult[] = []
        if(resultMovie.crew.length > 0 || resultTv.crew.length > 0 ) {
            const crewMovieDepartments = [...new Set(resultMovie.crew.map(({department}) => department))]
            const crewTvDepartments = [...new Set(resultTv.crew.map(({department}) => department))]
            const allCrewDepartments = [...new Set(crewMovieDepartments.concat(crewTvDepartments))]
            allDepartmentsTemp = [...allDepartmentsTemp,...allCrewDepartments]
            const departmentResults = allCrewDepartments.map((dep) => {
                const fromTv = resultTv.crew.filter(({department}) => department == dep);
                const fromMovie = resultMovie.crew.filter(({department}) => department == dep)
    
                const yearsTv = [... new Set(fromTv.map(({first_air_date}) => new Date(first_air_date).getFullYear()))];
                const yearsMovie = [... new Set(fromMovie.map(({release_date}) => new Date(release_date).getFullYear()))];
                const allYears = [...new Set(yearsMovie.concat(yearsTv))]
    
    
                const results = allYears.map((year) =>({year, results: [...resultMovie.crew.filter((mov) => new Date(mov.release_date).getFullYear() == year), ...resultTv.crew.filter((mov) => new Date(mov.first_air_date).getFullYear() == year)]})) 
                return {department: dep, results} 
            }) as any
            tempResult = [...tempResult,...departmentResults]
        }
        
        if(resultMovie.cast.length > 0 || resultTv.cast.length > 0 ) {
            const yearsTv = [... new Set(resultTv.cast.map(({first_air_date}) => new Date(first_air_date).getFullYear()))];
            const yearsMovie = [... new Set(resultMovie.cast.map(({release_date}) => new Date(release_date).getFullYear()))];
            const allYears = [...new Set(yearsMovie.concat(yearsTv))].sort((a,b) => a-b)
            const actingResults = allYears.map((year) =>({year, results: [...resultMovie.cast.filter((mov) => new Date(mov.release_date).getFullYear() == year), ...resultTv.cast.filter((mov) => new Date(mov.first_air_date).getFullYear() == year)]})) as any
            allDepartmentsTemp = ["Acting",...allDepartmentsTemp]
            tempResult = [{department: "Acting", results: actingResults},...tempResult]    

        } 
        setResult(tempResult);
        setAllDepartments(allDepartmentsTemp)
    }, [resultTv, resultMovie]);



    useEffect(() => {
        if(notBlank(currentPlatform)) {
            const newPlatform = sortByCurrentPlatform(result)
            if(notBlank(currentDepartment)) {
                setDisplayed(sortByCurrentDepartment(newPlatform)) 
            } else {
                setDisplayed(newPlatform) 
            }
        } else {
            sortByDepartment()
        }        
    }, [currentPlatform])


    useEffect(() => {
        if(notBlank(currentDepartment) && result.length > 0) {
            const filtered = sortByCurrentDepartment(result)
            if(notBlank(currentPlatform)) {
                setDisplayed(sortByCurrentPlatform(filtered))
            } else {
                setDisplayed(filtered)
            }
        } else {
            if(notBlank(currentPlatform)) {
                setDisplayed(sortByCurrentPlatform(result))
            } else {
                setDisplayed(result)
            }           
        }
    }, [currentDepartment,result])

    return {isLoading, displayed, allDepartments, handleDepartmentChange, handlePlatformChange,isTv,isMovie}

}

export default usePersonCareer