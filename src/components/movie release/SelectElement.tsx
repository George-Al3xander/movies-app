import { Autocomplete, Box, FormControl, InputLabel, MenuItem, Select, SelectProps, TextField } from "@mui/material"
import { FC, useState } from "react"
import iso from "iso-3166-1"


interface Props  extends SelectProps{

}




const SelectElement : FC<SelectProps> = ({onChange}) => {
    const [age, setAge] = useState("")
    
   
    const countries = [
      "UKRAINE",
      "FRANCE",
      "SPAIN",
      "UNITED STATES OF AMERICA",
      "ITALY",      
      "JAPAN",
      "POLAND",
      "NETHERLANDS",
      "GREECE",
    ].sort()

    const dates = [0,1,2].map((num) => new Date().getFullYear() + num)
    console.log(dates)

    return(<FormControl sx={{ m: 1, minWidth: 120 , input: {
        color: "white"
    }}} className="custom-select" fullWidth>        
        <Select
          displayEmpty
         
          id="demo-simple-select"
          value={age}          
          color="info"
          sx={{borderColor: "white", color: "white"}}
          onChange={(e) => {
            setAge(e.target.value)
            console.log(e.name)
          }}
        >
        <MenuItem value="">
            <em>Worldwide</em>
          </MenuItem>
          {countries.map((name) => {
           const country = iso.whereCountry(name)
           if(!country) return null
       
           return <MenuItem value={country.alpha2}>{country.country}</MenuItem>
          })}
        </Select>
      </FormControl>)
}

export default SelectElement