import {FormControl, InputLabel, Select, SelectChangeEvent, SelectProps} from "@mui/material"
import { FC,  useState } from "react"



interface Props  extends SelectProps{
    onChangeFunc:Function,
    name: string,
    defaultValue?: string | number,
    label?: boolean
}




const SelectElement : FC<Props> = ({onChangeFunc,name,defaultValue,children,label}) => {
    const [value, setValue] = useState<string | number>(defaultValue ? defaultValue : "")
    
    const handleChange = (e: SelectChangeEvent<number | string>) => {
      setValue(e.target.value);     
      onChangeFunc(e)  
    }

    

    return(<FormControl size="small" sx={{minWidth: "20ch", input: {
        color: "white"
    }}} className="custom-select" fullWidth>  
    {label && <InputLabel shrink sx={{textTransform: "capitalize",color: "white", "&.Mui-focused": {color: "white"}}} 
        id={`demo-simple-select-label-${name}`}>{name}</InputLabel>}      
        <Select
          labelId={`demo-simple-select-label-${name}`}
          label="Test"
          displayEmpty
          id={`select-release-date-${name}`}
          value={value}          
          color="info"
          sx={{
            color: "white",
            '.MuiOutlinedInput-notchedOutline': {
              borderColor: 'rgba(228, 219, 233, 0.25)',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: 'rgba(228, 219, 233, 0.25)',
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: 'rgba(228, 219, 233, 0.25)',
            },
            '.MuiSvgIcon-root ': {
              fill: "white !important",
            }            
          }}
          onChange={handleChange}         
        >{children}</Select>
      </FormControl>)
}

export default SelectElement