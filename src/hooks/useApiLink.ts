import { useParams } from "react-router-dom";




const useApiLink = () =>  {
    const path = window.location.hash.replace("#", "")
    const {id} = useParams();
    const apiLink = `https://api.themoviedb.org/3${path}`

    return {apiLink,id}
}

export default useApiLink