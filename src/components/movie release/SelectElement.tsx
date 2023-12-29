import { FormControl, InputLabel, MenuItem, Select, SelectProps } from "@mui/material"
import { FC } from "react"




const SelectElement : FC<SelectProps> = ({onChange}) => {



    return(<FormControl className="custom-select" fullWidth>
        {/* <InputLabel sx={{fontSize: "18", color: "white"}} id="demo-simple-select-label">Age</InputLabel> */}
        <Select
       
          id="demo-simple-select"
          value={"Twenty"}
          label="Age"
            color="info"
          sx={{borderColor: "white"}}
          onChange={onChange}
        >
          <MenuItem selected value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>)
}

export default SelectElement