import { FormControl, InputLabel, MenuItem, Select, SelectProps } from "@mui/material"
import { FC, useState } from "react"



interface Props  extends SelectProps{

}


const SelectElement : FC<SelectProps> = ({onChange}) => {
    const [age, setAge] = useState("Worldwide")


    return(<FormControl sx={{ m: 1, minWidth: 120 , input: {
        color: "white"
    }}} className="custom-select" fullWidth>        
        <Select
       displayEmpty
          id="demo-simple-select"
          value={age}          
          color="info"
          sx={{borderColor: "white", color: "white"}}
          onChange={(e) => setAge(e.target.value)}
        >
        <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem key={1} value={10}>Ten</MenuItem>
          <MenuItem key={2} value={20}>Twenty</MenuItem>
          <MenuItem key={3} value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>)
}

export default SelectElement