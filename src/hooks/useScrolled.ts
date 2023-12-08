import { useEffect, useState } from "react"




const useScrolled = () => {
    const [isScrolled, setIsScrolled] = useState(false)
    window.onscroll = () => {
        setIsScrolled(window.pageYOffset === 0 ? false : true)
        return () => (window.onscroll = null)
    }
  


    return isScrolled
}

export default useScrolled