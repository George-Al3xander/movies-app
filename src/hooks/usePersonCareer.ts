import { useQuery } from "@tanstack/react-query";
import { fetchFromTmdb } from "../utils";
import useApiLink from "./useApiLink"
import { PersonCombinedCredits, PersonMovieCredit, PersonMovieCrew, PersonTvShowCredit, PersonTvShowCrew } from "../types/tmdb";
import { useEffect, useState } from "react";
import { DepartmentResult } from "../types/type";

//81532 - no tv show person


const usePersonCareer = () => {
    const {id,apiLink} = useApiLink();
    const [result,setResult] = useState<DepartmentResult[]>([]) 
    const [resultTv,setTvResult] = useState<PersonTvShowCredit>({cast: [], crew: [],id:0}) 
    const [resultMovie,setMovieResult] = useState<PersonMovieCredit>({cast: [], crew: [],id:0})
    const fetch = async () => {
        const tvCredits = await fetchFromTmdb(apiLink+"/tv_credits") as PersonTvShowCredit
        const movieCredits = await fetchFromTmdb(apiLink+"/movie_credits") as PersonMovieCredit
        
        return {tv: tvCredits, movie:movieCredits}
    }
    const {data,isLoading,isError} = useQuery({queryKey: ["person-career",  apiLink,id], queryFn: fetch})


    useEffect(() =>{
        if(!isLoading && !isError && data != undefined) {
            setMovieResult(data.movie)
            setTvResult(data.tv)
        }
    },[data])
    //crew.job 
    useEffect(() => {
    
        const crewMovieDepartments = [...new Set(resultMovie.crew.map(({department}) => department))]
        const crewTvDepartments = [...new Set(resultTv.crew.map(({department}) => department))]
        const allDepartments = [...new Set(crewMovieDepartments.concat(crewTvDepartments))]
        
        // const crewMovieYears = [...new Set(resultMovie.crew.map(({release_date}) => release_date))]
        // const crewTvYears = [...new Set(resultTv.crew.map(({first_air_date}) => first_air_date))]

        const departmentResults = allDepartments.map((dep) => {
            const fromTv = resultTv.crew.filter(({department}) => department == dep);
            const fromMovie = resultMovie.crew.filter(({department}) => department == dep)

            const yearsTv = [... new Set(fromTv.map(({first_air_date}) => new Date(first_air_date).getFullYear()))];
            const yearsMovie = [... new Set(fromMovie.map(({release_date}) => new Date(release_date).getFullYear()))];
            const allYears = [...new Set(yearsMovie.concat(yearsTv))]


            const results = allYears.map((year) =>({year, results: [...resultMovie.crew.filter((mov) => new Date(mov.release_date).getFullYear() == year), ...resultTv.crew.filter((mov) => new Date(mov.first_air_date).getFullYear() == year)]}))
            return {department: dep, results}
        })

        const yearsTv = [... new Set(resultTv.cast.map(({first_air_date}) => new Date(first_air_date).getFullYear()))];
        const yearsMovie = [... new Set(resultMovie.cast.map(({release_date}) => new Date(release_date).getFullYear()))];
        const allYears = [...new Set(yearsMovie.concat(yearsTv))].sort((a,b) => a-b)
        
        const actingResults = allYears.map((year) =>({year, results: [...resultMovie.cast.filter((mov) => new Date(mov.release_date).getFullYear() == year), ...resultTv.cast.filter((mov) => new Date(mov.first_air_date).getFullYear() == year)]}))
        const results = [{department: "Acting", results: actingResults},...departmentResults]
        setResult(results as DepartmentResult[])
    }, [resultTv, resultMovie])

    return {isLoading, result}

}

export default usePersonCareer