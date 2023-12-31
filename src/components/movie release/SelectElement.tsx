import { Autocomplete, Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, SelectProps, TextField } from "@mui/material"
import { FC, useEffect, useState } from "react"
import iso from "iso-3166-1"


interface Props  extends SelectProps{
    onChangeFunc:Function,
    name: string,
    defaultValue?: string | number
}




const SelectElement : FC<Props> = ({onChangeFunc,name,defaultValue,children}) => {
    const [value, setValue] = useState<string | number>(defaultValue ? defaultValue : "")
    
    const handleChange = (e: SelectChangeEvent<number | string>) => {
      setValue(e.target.value);     
      onChangeFunc(e)  
    }

    

    return(<FormControl size="small" sx={{minWidth: "20ch", input: {
        color: "white"
    }}} className="custom-select" fullWidth>        
        <Select
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