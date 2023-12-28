import { useEffect, useState } from "react"
import { SwiperClass } from "swiper/react"



const useCalcVertBlockHeight = (mainRef: SwiperClass,height: number = 180) => {

    const [rowsNumber,setRowsNumber] = useState(1)

    useEffect(() => {
        Math.floor(mainRef.height / height)
    }, [window.innerWidth, window.innerHeight])

    return rowsNumber
}
export default  useCalcVertBlockHeight