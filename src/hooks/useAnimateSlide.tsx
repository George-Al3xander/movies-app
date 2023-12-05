import { useRecoilState, useRecoilValue } from "recoil";
import { sliderIndex } from "../components/state/atoms/data";
import { useEffect, useState } from "react";
import { Movie } from "../types/tmdb";




const useAnimateSlide = (ref: React.RefObject<HTMLImageElement | HTMLDivElement>, movies: Movie[]) => {
    const [currIndex,setCurrentIndex]= useRecoilState(sliderIndex);
    const {title, overview, backdrop_path} = movies[currIndex]
    const [url,setUrl] = useState(`http://image.tmdb.org/t/p/original${backdrop_path}`);
    const [mountStatus,setMountStatus] = useState(false)


    

    useEffect(() => {        
        if(ref.current && mountStatus) {            
            if( ref.current.style.animationName == "fadeOut2" ){
                ref.current.style.animation = "fadeOut1 1.3s";
            } else {
                ref.current.style.animation = "fadeOut2 1.3s";
            }

            setTimeout(() => {
                if( ref.current!.style.animationName == "fadeIn2" ){
                    ref.current!.style.animation = "fadeIn1 1.3s";
                } else {
                    ref.current!.style.animation = "fadeIn2 1.3s";
                }              
                setUrl(`http://image.tmdb.org/t/p/original${backdrop_path}`)
            }, 1200)

        }
    }, [currIndex])

    useEffect(() => {
        setMountStatus(true);
        // if(mountStatus) {
        //     setInterval(() => {
        //         setCurrentIndex((prev) => {
        //             if(prev + 1 == 5) return 0
        //             return prev + 1
        //         })        
        //     },8000)
        // }
    }, [])



    return {url}

}

export default useAnimateSlide