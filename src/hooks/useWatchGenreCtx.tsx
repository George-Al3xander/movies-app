import { FC, ReactNode, createContext, useCallback, useContext, useEffect, useState } from "react"
import { Genre, Movie, TV } from "../types/tmdb"



type ContextType = ReturnType<typeof useWatchGenreCtxManager>

const GenreContext = createContext<ContextType>({
    currentGenre: {name: "",id:0, results: []}, 
    handleClick: () => {},
    checkMatch: () => false,
    thumbsSwiper: null,
    setThumbsSwiper: () => {}
})



interface CurrGenre extends Genre {
    results: (Movie & TV)[]
}





export const useWatchGenreCtxManager = () => {
    const [currentGenre, setCurrentGenre] = useState<CurrGenre>({name: "",id:0, results: []})
    const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
    const [genresResult,setGenresResult] = useState<CurrGenre[]>([])
    
    const handleClick = (el : CurrGenre) => {
        setCurrentGenre(el)
    }   
    const checkMatch = (id:number) => {
        return currentGenre.id == id
    }

    return {currentGenre,handleClick,checkMatch, thumbsSwiper, setThumbsSwiper}    
}


const useThumbsCtx = () => {
    const {thumbsSwiper,setThumbsSwiper} = useContext(GenreContext)
    return {thumbsSwiper,setThumbsSwiper}
}


export const useWatchGenreCtx = () => {
    return useContext(GenreContext);
};

export const useCheckGenreMatch = (id:number) => {
    const {checkMatch} = useContext(GenreContext)
    return checkMatch(id)
};

export const useHandleClick = (el: CurrGenre) => {
    const {handleClick} = useContext(GenreContext)

    return () => {handleClick(el)}
}

export const useCurrGenreMovies = () => {
    const {currentGenre} = useContext(GenreContext)

    return currentGenre.results
}


export const GenreCtxWrapper: FC<{children: ReactNode}> = ({children}) => (<GenreContext.Provider value={useWatchGenreCtxManager()}>
    {children}
</GenreContext.Provider>)



