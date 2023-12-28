import { useCallback, useState } from "react";
import { SwiperClass } from "swiper/react";




const useOuterBtns = () => {
    const [swiperRef, setSwiperRef] = useState<SwiperClass>();
    const [isEnd,setIsEnd] = useState(false);
    const [isBeginning,setIsBeginning] = useState(true);
    

    const handleSlideChange = () => {
        if(swiperRef) {
            setIsBeginning(swiperRef.isBeginning)
            setIsEnd(swiperRef.isEnd)            
        }

    }

    const handlePrevious = useCallback(() => {
        swiperRef?.slidePrev();
        
    }, [swiperRef]);

    const handleNext = useCallback(() => {
        swiperRef?.slideNext();

    }, [swiperRef]);


    return {isBeginning,isEnd, handleNext, handlePrevious, handleSlideChange, setSwiperRef}
}

export default useOuterBtns