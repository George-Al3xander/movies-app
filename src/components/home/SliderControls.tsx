import { Box, Button, Stack } from "@mui/material"
import { GiPlainCircle } from "react-icons/gi"
import { useSetRecoilState } from "recoil";
import { sliderIndex } from "../state/atoms/data";
import { isButtonActive$ } from "../state/selectors/selectors";
import {useRecoilValue} from "recoil"


const Btn = ({num,disabled}:{num:number, disabled?: boolean}) => {
    const isActive = useRecoilValue(isButtonActive$(num))
    const setSlideIndex = useSetRecoilState(sliderIndex)

    const changeIndex = () => {
        if(!isActive && !disabled) {            
            setSlideIndex(num)
        }
    }

    return <Box sx={{
        transition: "all .3s ease",
        "&:hover": isActive || disabled ? {cursor: "not-allowed"} :{
            transition: "all .3s ease",
            scale: "1.3",
            cursor: "pointer"
        }
    }} onClick={changeIndex}><GiPlainCircle  style={isActive ?{fill:  "white" , scale: "1.3"} : {fill:  "gray"}} size={8}/></Box>
}

const SliderControls = ({disabled}:{disabled?: boolean}) => {
    const arr = [0,1,2,3,4];
    return(<Stack sx={{        
        alignSelf: {xs: "center",sm:"flex-end"},
        my: 2,
        zIndex: 4
    }} direction={"row"} spacing={1}>
    {arr.map((num) => {
        return <Btn disabled={disabled} num={num}/>
    })}
   </Stack>)
}

export default SliderControls