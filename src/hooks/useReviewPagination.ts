import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { fetchFromTmdb } from "../utils";
import { Reviews } from "../types/tmdb";




const useReviewPagination = () => {
    const {id} = useParams()       
    const [searchParams] = useSearchParams();
    const currentPage : string | null = searchParams.get("page");
    const path = window.location.hash.replace("#", "")
    const pathClean = window.location.hash.replace("#", "").split("?")[0];
    const apiLink = `https://api.themoviedb.org/3${path}`  
    const navigate = useNavigate();

    const fetch = async () => await fetchFromTmdb(apiLink)  as Reviews
    const {data,isLoading,isError} = useQuery({queryKey: ["reviews-page", id,apiLink, path], queryFn: fetch, refetchOnWindowFocus:false});

    const handleChnage = (__e: React.ChangeEvent<unknown>, newValue:number) => {
        navigate(pathClean+`?page=${newValue}`)
    }

    return {currentPage: currentPage ? +currentPage : 1, data, isLoading, isError, handleChnage}

}

export default useReviewPagination