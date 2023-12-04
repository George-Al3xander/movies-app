import { Stack } from "@mui/material"
import { GiPlainCircle } from "react-icons/gi"
import { useSetRecoilState } from "recoil";
import { sliderIndex } from "../state/atoms/data";
import { isButtonActive$ } from "../state/selectors/selectors";
import {useRecoilValue} from "recoil"


const Btn = ({num}:{num:number}) => {
    const isActive = useRecoilValue(isButtonActive$(num))
    const setSlideIndex = useSetRecoilState(sliderIndex)
    return <button onClick={() => setSlideIndex(num)}><GiPlainCircle  style={{fill: isActive ? "white" : "gray"}} size={8}/></button>
}

const SliderControls = () => {
    const arr = [0,1,2,3,4];
    return(<Stack direction={"row"} spacing={1}>
    {arr.map((num) => {
        return <Btn num={num}/>
    })}
   </Stack>)
}

export default SliderControls